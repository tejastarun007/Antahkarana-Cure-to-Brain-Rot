import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
}

interface AppState extends UserState {
  addHabitDone: (id: string, mins: number, tradeoff: number) => void;
  removeHabitDone: (id: string, mins: number, tradeoff: number) => void;
  toggleFav: (id: string) => void;
  logTimerSession: (mins: number) => void;
  syncFromServer: (state: Partial<UserState>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
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

      addHabitDone: (id, mins, tradeoff) =>
        set((state) => {
          const newRestored = [...state.restored];
          newRestored[tradeoff] = Math.min(100, (newRestored[tradeoff] || 0) + 7); // Simplified logic
          
          const today = new Date().toDateString();
          const newHist = [...state.hist];
          let h = newHist.find((x) => x.date === today);
          if (!h) {
            h = { date: today, count: 0 };
            newHist.push(h);
          }
          h.count += 1;

          return {
            done: [...state.done, id],
            totalTasks: state.totalTasks + 1,
            totalMins: state.totalMins + mins,
            restored: newRestored,
            hist: newHist,
            readMins: id === 'read' ? state.readMins + 60 : state.readMins,
            medMins: id === 'meditation' ? state.medMins + 20 : state.medMins,
            pranaMins: id === 'pranayama' ? state.pranaMins + 15 : state.pranaMins,
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
            readMins: id === 'read' ? Math.max(0, state.readMins - 60) : state.readMins,
            medMins: id === 'meditation' ? Math.max(0, state.medMins - 20) : state.medMins,
            pranaMins: id === 'pranayama' ? Math.max(0, state.pranaMins - 15) : state.pranaMins,
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
          const newHist = [...state.hist];
          let h = newHist.find((x) => x.date === today);
          if (!h) {
            h = { date: today, count: 0 };
            newHist.push(h);
          }
          h.count += 3;

          return {
            totalMins: state.totalMins + mins,
            streak: state.streak + 1,
            hist: newHist,
          };
        }),
        
      syncFromServer: (serverState) => set((state) => ({ ...state, ...serverState })),
    }),
    {
      name: 'ank_f',
    }
  )
);
