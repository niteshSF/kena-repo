import { Language } from "@/types/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { GLOBAL_CONFIG } from "./config"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

type TResult = {
  [x: string]: number | undefined
  text: string
  khanda_no: number
  sutra_no: number
  mode: string
  lang: Language
  chapter: number
  section: number
}

const getResult = async (term: string) => {
  // console.log("term length:", term.length)
  if (term.length > 0) {
    // console.log(" term:", term)
    try {
      const response = await api.get(
        `search/${GLOBAL_CONFIG.upanishad}/${term}`
      )
      return response.data
    } catch (error) {
      console.log("term catch:", term);
      return ""
    }
  } else return ""
}

export const useGetResultQuery = (term: string) => {
  return useQuery<TResult[]>({
    queryKey: ["search", term],
    queryFn: () => getResult(term),
  })
}
