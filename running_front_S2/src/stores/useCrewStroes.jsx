import { create } from "zustand";

export const useCrewStore = create((set) => ({
  crewId: null,
  setCrewId: (id) => set({ crewId: id }),

  crew: null,
  setCrew: (crewData) => set({ crew: crewData }),

  resetCrew: () => set({ crewId: null, crew: null }),
}));