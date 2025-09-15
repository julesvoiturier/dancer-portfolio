import { create } from "zustand";

interface AppState {
  activeSectionId: number;
  areFramesLoaded: boolean;
  framesLoadingPercentage: number;
  updateActiveSectionId: (value: number) => void;
  updateAreFramesLoaded: (value: boolean) => void;
  updateFramesLoadingPercentage: (value: number) => void;
}

const useAppStateStore = create<AppState>((set) => ({
  areFramesLoaded: false,
  activeSectionId: 0,
  framesLoadingPercentage: 0,
  updateActiveSectionId: (newId: number) => set({ activeSectionId: newId }),
  updateAreFramesLoaded: (value: boolean) => set({ areFramesLoaded: value }),
  updateFramesLoadingPercentage: (value: number) =>
    set({ framesLoadingPercentage: value }),
}));

export default useAppStateStore;
