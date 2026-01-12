import { create } from "zustand";
import useMapStore from "./map";
import { reset as resetPlayerScore } from "./player";

interface StoreState {
    status: "playing" | "gameover";
    score: number;
    updateScore: (rowIndex: number) => void;
    endGame: () => void;
    reset: () => void;
}

const useStore = create<StoreState>((set) => ({
    status: "playing",
    score: 0,
    updateScore: (rowIndex: number) => {
        set((state) => ({ score: Math.max(rowIndex, state.score) }));
    },
    endGame: () => {
        set({ status: "gameover" });
    },
    reset: () => {
        useMapStore.getState().reset();
        resetPlayerScore();
        set({ status: "playing", score: 0 });
    }
}));

export default useStore;