import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface JournalEntry {
  id: string;
  text: string;
  mood: string;
  date: string;
  words: number;
}

export interface UserState {
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
  userName: string;
  hasSeenHabitHint: boolean;
  hasSeenScienceHint: boolean;
  journal: JournalEntry[];
}

interface AppState extends UserState {
  addHabitDone: (id: string, mins: number, tradeoff: number) => void;
  removeHabitDone: (id: string, mins: number, tradeoff: number) => void;
  toggleFav: (id: string) => void;
  logTimerSession: (mins: number) => void;
  checkAndUpdateStreak: () => void;
  resetDailyIfNeeded: () => void;
  updateUserName: (name: string) => void;
  markHabitHintSeen: () => void;
  markScienceHintSeen: () => void;
  addJournalEntry: (entry: JournalEntry) => void;
  syncFromServer: (state: Partial<UserState>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
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
      userName: 'Seeker',
      hasSeenHabitHint: false,
      hasSeenScienceHint: false,
      journal: [],

      addHabitDone: (id, mins, tradeoff) =>
        set((state) => {
          const newRestored = [...state.restored];
          newRestored[tradeoff] = Math.min(100, (newRestored[tradeoff] || 0) + 7);

          const today = new Date().toDateString();
          const existingIdx = state.hist.findIndex((x) => x.date === today);
          let newHist;
          if (existingIdx === -1) {
            newHist = [...state.hist, { date: today, count: 1 }];
          } else {
            newHist = state.hist.map((x, i) =>
              i === existingIdx ? { ...x, count: x.count + 1 } : x
            );
          }

          // Streak logic: if this is the first completion today, update streak
          let newStreak = state.streak;
          if (state.lastDay !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();

            if (state.lastDay === yesterdayStr) {
              // Consecutive day — increment streak
              newStreak = state.streak + 1;
            } else if (state.lastDay === null) {
              // First ever practice
              newStreak = 1;
            } else {
              // Streak broken — start fresh
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
            readMins: id === 'read' ? state.readMins + mins : state.readMins,
            medMins: id === 'meditation' ? state.medMins + mins : state.medMins,
            pranaMins: id === 'pranayama' ? state.pranaMins + mins : state.pranaMins,
          };
        }),

      removeHabitDone: (id, mins, tradeoff) =>
        set((state) => {
          const newRestored = [...state.restored];
          newRestored[tradeoff] = Math.max(0, (newRestored[tradeoff] || 0) - 6);
          return {
            done: state.done.filter((x) => x !== id),
            totalTasks: Math.max(0, state.totalTasks - 1),
            totalMins: Math.max(0, state.totalMins - mins),
            restored: newRestored,
            readMins: id === 'read' ? Math.max(0, state.readMins - mins) : state.readMins,
            medMins: id === 'meditation' ? Math.max(0, state.medMins - mins) : state.medMins,
            pranaMins: id === 'pranayama' ? Math.max(0, state.pranaMins - mins) : state.pranaMins,
          };
        }),

      toggleFav: (id) =>
        set((state) => {
          const isFav = state.favs.includes(id);
          return {
            favs: isFav ? state.favs.filter((x) => x !== id) : [...state.favs, id],
          };
        }),

      logTimerSession: (mins) =>
        set((state) => {
          const today = new Date().toDateString();
          const existingIdx = state.hist.findIndex((x) => x.date === today);
          let newHist;
          if (existingIdx === -1) {
            newHist = [...state.hist, { date: today, count: 1 }];
          } else {
            newHist = state.hist.map((x, i) =>
              i === existingIdx ? { ...x, count: x.count + 1 } : x
            );
          }

          // Streak logic for timer sessions too
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
              newStreak = 1;
            }
          }

          return {
            totalMins: state.totalMins + mins,
            medMins: state.medMins + mins,
            streak: newStreak,
            lastDay: today,
            hist: newHist,
          };
        }),

      checkAndUpdateStreak: () => {
        const state = get();
        const today = new Date().toDateString();
        if (state.lastDay && state.lastDay !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (state.lastDay !== yesterday.toDateString()) {
            // Streak broken
            set({ streak: 0 });
          }
        }
      },

      updateUserName: (name: string) => set({ userName: name }),

      markHabitHintSeen: () => set({ hasSeenHabitHint: true }),
      markScienceHintSeen: () => set({ hasSeenScienceHint: true }),

      addJournalEntry: (entry) =>
        set((state) => ({
          journal: [...state.journal, entry],
        })),

      resetDailyIfNeeded: () => {
        const state = get();
        const today = new Date().toDateString();
        if (state.lastDay && state.lastDay !== today) {
          // New day — reset today's completions
          set({ done: [] });
        }
      },
        
      syncFromServer: (serverState) => set((state) => ({ ...state, ...serverState })),
    }),
    {
      name: 'ank_f',
      onRehydrateStorage: () => {
        return (state) => {
          // After hydrating from localStorage, check if it's a new day
          if (state) {
            state.resetDailyIfNeeded();
            state.checkAndUpdateStreak();
          }
        };
      },
    }
  )
);
