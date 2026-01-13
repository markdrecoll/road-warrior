import { create } from 'zustand';
import { generateRows } from '../utils/generateRows';
import type { Row } from '../types';

interface StoreState {
    rows: Row[];
    addRows: () => void;
    reset: () => void;
}

const useStore = create<StoreState>((set, get) => ({
    rows: generateRows(20, 0), // Start from row index 0
    addRows: () => {
        const currentRowCount = get().rows.length;
        const newRows = generateRows(20, currentRowCount);
        set((state) => ({
            rows: [...state.rows, ...newRows],
        }));
    },
    reset: () => {
        set({ rows: generateRows(20, 0) }); // Reset from row index 0
    }
}));

export default useStore;