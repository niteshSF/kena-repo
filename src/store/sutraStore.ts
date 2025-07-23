// store/sutraStore.ts
import { create } from "zustand"

interface State {
  sutra_no: number
  khanda_no: number
  chapter: number
  section: number
}

interface Actions {
  setSutraNo: (sutraNo: number) => void
  setKhandaNo: (khandaNo: number) => void
  setChapter: (chapter: number) => void
  setSection: (section: number) => void
  incrementSutra: () => void
  decrementSutra: () => void
  resetSutra: () => void
  nextChapter: (maxChapters: number) => void
  prevChapter: (maxChapters: number) => void
}

const KHANDA_SUTRA_MAP: Record<number, number> = {
  1: 9,
  2: 5,
  3: 12,
  4: 9,
}

const useSutraStore = create<State & Actions>((set, get) => ({
  sutra_no: 0,
  khanda_no: 0,
  chapter: 0,
  section: 0,

  setSutraNo: (sutraNo) => set(() => ({ sutra_no: sutraNo })),
  setKhandaNo: (khandaNo) =>
    set(() => ({
      khanda_no: khandaNo,
      chapter: khandaNo,
    })),
  setChapter: (chapter) =>
    set(() => ({
      chapter,
      khanda_no: chapter,
    })),
  setSection: (section) => set(() => ({ section })),

  incrementSutra: () => {
    const { sutra_no, khanda_no } = get()
    const maxKhanda = Math.max(...Object.keys(KHANDA_SUTRA_MAP).map(Number))

    if (khanda_no === 0 && sutra_no === 0) {
      set({ khanda_no: 1, chapter: 1, sutra_no: 1 })
      return
    }

    const maxSutra = KHANDA_SUTRA_MAP[khanda_no] || 0

    if (sutra_no < maxSutra) {
      set({ sutra_no: sutra_no + 1 })
    } else if (sutra_no === maxSutra && khanda_no < maxKhanda) {
      set({ khanda_no: khanda_no + 1, chapter: khanda_no + 1, sutra_no: 1 })
    }
  },
  
  decrementSutra: () => {
    const { sutra_no, khanda_no } = get()
    const minKhanda = 1

    if (khanda_no === 1 && sutra_no === 1) {
      set({ khanda_no: 0, chapter: 0, sutra_no: 0 })
      return
    }

    if (sutra_no > 1) {
      set({ sutra_no: sutra_no - 1 })
    } else if (sutra_no === 1 && khanda_no > minKhanda) {
      const prevKhanda = khanda_no - 1
      const maxSutra = KHANDA_SUTRA_MAP[prevKhanda]
      set({ khanda_no: prevKhanda, chapter: prevKhanda, sutra_no: maxSutra })
    }
  },

  resetSutra: () => {
    const current = get().khanda_no
    set({ sutra_no: current === 0 ? 0 : 1 })
  },

  nextChapter: (maxChapters) => {
    const current = get().khanda_no
    let next = current + 1
    if (next > maxChapters) next = 1
    set({ khanda_no: next, chapter: next, sutra_no: 1 })
  },

  prevChapter: (maxChapters) => {
    const current = get().khanda_no
    let prev = current - 1
    if (prev < 1) prev = maxChapters
    set({ khanda_no: prev, chapter: prev, sutra_no: 1 })
  },
}))

export default useSutraStore
