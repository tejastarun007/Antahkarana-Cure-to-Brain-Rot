/**
 * useStore — Antahkarana unified store (backward-compatible, slice-ready)
 *
 * ARCHITECTURE NOTE:
 * The state is split into domain slices for clarity and future independent
 * extraction (useHabitStore, useJournalStore, useSyncStore).
 * All selectors remain at the top-level for zero breaking changes.
 *
 * Slices:
 *   habit     — done[], streak, hist, totalTasks, totalMins, restored, readMins, medMins, pranaMins
 *   journal   — journal entries
 *   ui        — hints, userName
 *   sync      — syncStatus, lastSyncAt
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface JournalEntry {
  id: string;
  text: string;
  mood: string;
  date: string;
  words: number;
}

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

export type DietTag = 'sattvic' | 'rajasic' | 'tamasic';
export type AppMode = 'sadhana' | 'science';

export interface AttentionTest {
  date: string;       // ISO date
  attention: number;  // 0-100
  memory: number;     // 0-100
}

// ─── Slice: Habit ─────────────────────────────────────────────────────────────
export interface HabitSlice {
  done: string[];
  streak: number;
  totalTasks: number;
  totalMins: number;
  restored: number[];
  hist: { date: string; count: number }[];
  favs: string[];
  readMins: number;
  medMins: number;
  pranaMins: number;
  lastDay: string | null;
}

// ─── Slice: Journal ───────────────────────────────────────────────────────────
export interface JournalSlice {
  journal: JournalEntry[];
}

// ─── Slice: Lifestyle (Ahara diet · One Small Change · attention tests) ──────
export interface LifestyleSlice {
  dietLog: { date: string; tag: DietTag }[];
  adoptedChanges: string[];
  attentionTests: AttentionTest[];
  lastRepairMonth: string | null; // 'YYYY-M' when streak insurance was last used
  appMode: AppMode;
}

// ─── Slice: UI / Hints ────────────────────────────────────────────────────────
export interface UiSlice {
  userName: string;
  hasSeenHabitHint: boolean;
  hasSeenScienceHint: boolean;
}

// ─── Slice: Sync ──────────────────────────────────────────────────────────────
export interface SyncSlice {
  syncStatus: SyncStatus;
  lastSyncAt: string | null;
  syncError: string | null;
}

// ─── Full state (union of slices for backward compat) ─────────────────────────
export type UserState = HabitSlice & JournalSlice & UiSlice & SyncSlice & LifestyleSlice;

interface AppState extends UserState {
  // Habit actions
  addHabitDone: (id: string, mins: number, tradeoff: number) => void;
  removeHabitDone: (id: string, mins: number, tradeoff: number) => void;
  toggleFav: (id: string) => void;
  logTimerSession: (mins: number) => void;
  checkAndUpdateStreak: () => void;
  resetDailyIfNeeded: () => void;
  // UI actions
  updateUserName: (name: string) => void;
  markHabitHintSeen: () => void;
  markScienceHintSeen: () => void;
  // Journal actions
  addJournalEntry: (entry: JournalEntry) => void;
  // Lifestyle actions
  logDiet: (tag: DietTag) => void;
  adoptChange: (id: string) => void;
  addAttentionTest: (attention: number, memory: number) => void;
  repairStreak: () => boolean;
  setAppMode: (mode: AppMode) => void;
  // Sync actions
  syncFromServer: (state: Partial<UserState>) => void;
  setSyncStatus: (status: SyncStatus, error?: string) => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ── Habit slice defaults ──
      done: [],
      streak: 0,
      totalTasks: 0,
      totalMins: 0,
      restored: [0, 0, 0, 0, 0, 0, 0],
      hist: [],
      favs: [],
      readMins: 0,
      medMins: 0,
      pranaMins: 0,
      lastDay: null,

      // ── Journal slice defaults ──
      journal: [],

      // ── Lifestyle slice defaults ──
      dietLog: [],
      adoptedChanges: [],
      attentionTests: [],
      lastRepairMonth: null,
      appMode: 'sadhana' as AppMode,

      // ── UI slice defaults ──
      userName: 'Seeker',
      hasSeenHabitHint: false,
      hasSeenScienceHint: false,

      // ── Sync slice defaults ──
      syncStatus: 'idle' as SyncStatus,
      lastSyncAt: null,
      syncError: null,

      // ── Habit actions ──────────────────────────────────────────────────────

      addHabitDone: (id, mins, tradeoff) =>
        set((state) => {
          const newRestored = [...state.restored];
          newRestored[tradeoff] = Math.min(100, (newRestored[tradeoff] || 0) + 7);

          const today = new Date().toDateString();
          const existingIdx = state.hist.findIndex((x) => x.date === today);
          const newHist = existingIdx === -1
            ? [...state.hist, { date: today, count: 1 }]
            : state.hist.map((x, i) => i === existingIdx ? { ...x, count: x.count + 1 } : x);

          // Streak logic: only update on first completion of the day
          let newStreak = state.streak;
          if (state.lastDay !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();
            if (state.lastDay === yesterdayStr) {
              newStreak = state.streak + 1;
            } else if (state.lastDay === null) {
              newStreak = 1;
            } else {
              // Streak broken — restart
              newStreak = 1;
            }
          }

          return {
            done: [...state.done, id],
            totalTasks: state.totalTasks + 1,
            totalMins: state.totalMins + mins,
            restored: newRestored,
            hist: newHist,
            streak: newStreak,
            lastDay: today,
            readMins:  id === 'read'       ? state.readMins  + mins : state.readMins,
            medMins:   id === 'meditation' ? state.medMins   + mins : state.medMins,
            pranaMins: id === 'pranayama'  ? state.pranaMins + mins : state.pranaMins,
          };
        }),

      removeHabitDone: (id, mins, tradeoff) =>
        set((state) => {
          const newRestored = [...state.restored];
          newRestored[tradeoff] = Math.max(0, (newRestored[tradeoff] || 0) - 6);

          const newDone = state.done.filter((x) => x !== id);

          // If the user unchecks the last habit of the day, remove today's
          // entry from hist and clear lastDay so the streak is not inflated
          // if the user never completes a practice that day.
          const today = new Date().toDateString();
          const todayHistIdx = state.hist.findIndex((x) => x.date === today);
          let newHist = state.hist;
          let newLastDay = state.lastDay;
          if (todayHistIdx !== -1) {
            const todayCount = state.hist[todayHistIdx].count;
            if (todayCount <= 1) {
              // No more practices recorded today — remove the entry entirely
              newHist = state.hist.filter((_, i) => i !== todayHistIdx);
            } else {
              newHist = state.hist.map((x, i) =>
                i === todayHistIdx ? { ...x, count: x.count - 1 } : x
              );
            }
            // If no habits remain done for today, revert lastDay so the
            // streak check tomorrow doesn't count today as a practice day.
            if (newDone.length === 0) {
              newLastDay = null;
            }
          }

          return {
            done: newDone,
            totalTasks: Math.max(0, state.totalTasks - 1),
            totalMins:  Math.max(0, state.totalMins  - mins),
            restored: newRestored,
            hist: newHist,
            lastDay: newLastDay,
            readMins:  id === 'read'       ? Math.max(0, state.readMins  - mins) : state.readMins,
            medMins:   id === 'meditation' ? Math.max(0, state.medMins   - mins) : state.medMins,
            pranaMins: id === 'pranayama'  ? Math.max(0, state.pranaMins - mins) : state.pranaMins,
          };
        }),

      toggleFav: (id) =>
        set((state) => ({
          favs: state.favs.includes(id)
            ? state.favs.filter((x) => x !== id)
            : [...state.favs, id],
        })),

      logTimerSession: (mins) =>
        set((state) => {
          const today = new Date().toDateString();
          const existingIdx = state.hist.findIndex((x) => x.date === today);
          const newHist = existingIdx === -1
            ? [...state.hist, { date: today, count: 1 }]
            : state.hist.map((x, i) => i === existingIdx ? { ...x, count: x.count + 1 } : x);

          let newStreak = state.streak;
          if (state.lastDay !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();
            // Extend streak if yesterday was the last practice day,
            // otherwise start fresh at 1 (covers both null and broken-streak cases).
            newStreak = state.lastDay === yesterdayStr ? state.streak + 1 : 1;
          }

          return { totalMins: state.totalMins + mins, medMins: state.medMins + mins, streak: newStreak, lastDay: today, hist: newHist };
        }),

      checkAndUpdateStreak: () => {
        const state = get();
        const today = new Date().toDateString();
        if (state.lastDay && state.lastDay !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (state.lastDay !== yesterday.toDateString()) {
            set({ streak: 0 });
          }
        }
      },

      resetDailyIfNeeded: () => {
        const state = get();
        const today = new Date().toDateString();
        if (state.lastDay && state.lastDay !== today) {
          set({ done: [] });
        }
      },

      // ── UI actions ────────────────────────────────────────────────────────

      updateUserName: (name: string) => set({ userName: name }),
      markHabitHintSeen:   () => set({ hasSeenHabitHint: true }),
      markScienceHintSeen: () => set({ hasSeenScienceHint: true }),

      // ── Journal actions ───────────────────────────────────────────────────

      addJournalEntry: (entry) =>
        set((state) => ({ journal: [...state.journal, entry] })),

      // ── Lifestyle actions ─────────────────────────────────────────────────

      /** One diet check-in per day — re-logging replaces today's entry. */
      logDiet: (tag) =>
        set((state) => {
          const today = new Date().toDateString();
          const rest = state.dietLog.filter((d) => d.date !== today);
          return { dietLog: [...rest, { date: today, tag }] };
        }),

      adoptChange: (id) =>
        set((state) => ({
          adoptedChanges: state.adoptedChanges.includes(id)
            ? state.adoptedChanges
            : [...state.adoptedChanges, id],
        })),

      addAttentionTest: (attention, memory) =>
        set((state) => ({
          attentionTests: [
            ...state.attentionTests,
            { date: new Date().toISOString(), attention, memory },
          ],
        })),

      /**
       * Streak insurance — one repair per calendar month.
       * Marks yesterday as a practice day so today's practice continues the
       * streak instead of resetting it. Returns false if already used.
       */
      repairStreak: () => {
        const state = get();
        const now = new Date();
        const monthKey = `${now.getFullYear()}-${now.getMonth()}`;
        if (state.lastRepairMonth === monthKey) return false;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        set({
          lastDay: yesterday.toDateString(),
          streak: Math.max(1, state.streak),
          lastRepairMonth: monthKey,
        });
        return true;
      },

      setAppMode: (mode) => set({ appMode: mode }),

      // ── Sync actions ──────────────────────────────────────────────────────

      /**
       * Merge server state over local state.
       * Resets sync status to 'synced' with a timestamp.
       */
      syncFromServer: (serverState) =>
        set((state) => ({
          ...state,
          ...serverState,
          syncStatus: 'synced' as SyncStatus,
          lastSyncAt: new Date().toISOString(),
          syncError: null,
        })),

      /**
       * Explicitly set sync status — call this from the Supabase sync hook.
       * setSyncStatus('syncing')   → before fetch
       * setSyncStatus('synced')    → on success
       * setSyncStatus('error', msg) → on failure
       */
      setSyncStatus: (status: SyncStatus, error?: string) =>
        set({
          syncStatus: status,
          syncError: error ?? null,
          lastSyncAt: status === 'synced' ? new Date().toISOString() : get().lastSyncAt,
        }),
    }),
    {
      name: 'ank_f',
      // Only persist the domain slices — not transient sync state
      partialize: (state) => ({
        done: state.done, streak: state.streak, totalTasks: state.totalTasks,
        totalMins: state.totalMins, restored: state.restored, hist: state.hist,
        favs: state.favs, readMins: state.readMins, medMins: state.medMins,
        pranaMins: state.pranaMins, lastDay: state.lastDay,
        journal: state.journal, userName: state.userName,
        hasSeenHabitHint: state.hasSeenHabitHint,
        hasSeenScienceHint: state.hasSeenScienceHint,
        dietLog: state.dietLog, adoptedChanges: state.adoptedChanges,
        attentionTests: state.attentionTests, lastRepairMonth: state.lastRepairMonth,
        appMode: state.appMode,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.resetDailyIfNeeded();
          state.checkAndUpdateStreak();
        }
      },
    }
  )
);
