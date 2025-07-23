import { create } from "zustand";

interface State {
    section: number;
    khanda_no: number;
    bhashyam_no: number;
}

interface Actions {
    setKhandaNo: (bhashyamNo: number) => void;
    incrementKhanda: () => void;
    decrementKhanda: () => void;
    setBhashyamNo: (bhashyamNo: number) => void;
    incrementBhashyam: () => void;
    decrementBhashyam: () => void;
}

const MAX_KHANDA = 4;
const MAX_BHASHYAM = 18;

const useBhashyamStore = create<State & Actions>((set) => ({
    section: 0,
    khanda_no: 0,
    bhashyam_no: 0,
    setKhandaNo: (khandaNo) => set(() => ({ khanda_no: khandaNo })),
    setBhashyamNo: (bhashyamNo) => set(() => ({ bhashyam_no: bhashyamNo })),

    incrementKhanda: () =>
        set((state) => {
            let newKhandaNo = state.khanda_no + 1;
            if (newKhandaNo > MAX_KHANDA) newKhandaNo = MAX_KHANDA;
            return { khanda_no: newKhandaNo };
        }),
    
    decrementKhanda: () =>
        set((state) => {
            let newKhandaNo = state.khanda_no - 1;
            if (newKhandaNo < 0) newKhandaNo = 0;
            return { khanda_no: newKhandaNo };
        }),     

    incrementBhashyam: () =>
        set((state) => {
            let newBhashyamNo = state.bhashyam_no + 1;
            if (newBhashyamNo > MAX_BHASHYAM) newBhashyamNo = MAX_BHASHYAM;
            return { bhashyam_no: newBhashyamNo };
        }),

    decrementBhashyam: () =>
        set((state) => {
            let newBhashyamNo = state.bhashyam_no - 1;
            if (newBhashyamNo < 0) newBhashyamNo = 0; // Prevent going below 0
            return { bhashyam_no: newBhashyamNo };
        }),
}));

export default useBhashyamStore;
