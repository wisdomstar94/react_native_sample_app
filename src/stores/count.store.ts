import { create } from "zustand";

export interface CountState {
  count: number;

  incrementCount: () => void;
  clearCount: () => void;
}

export const useCountStore = create<CountState>((set) => ({
  // values
  count: 0,

  // reducers
  incrementCount: () => set((state) => ({ count: state.count + 1 })),
  clearCount: () => set({ count: 0 }),
}));
