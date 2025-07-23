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

const getMeaning = async (
  khanda_no: number,
  sutra_no: number,
  lang: string,
  section: number,
) => {
  // console.log("getMeaning called with:", { khanda_no, sutra_no, lang, section })
  // const language = "sa";
  const response = await api.get(
    `sutras/${GLOBAL_CONFIG.upanishad}/${section}/${khanda_no}/${sutra_no}/meaning?lang=${lang}`
  )
  return response.data
}

export const useGetMeaningQuery = (
  khanda_no: number,
  sutra_no: number,
  lang: string,
  section: number,
) => {
  return useQuery({
    queryKey: ["meaning", khanda_no, sutra_no, lang,  section],
    queryFn: () => getMeaning(khanda_no, sutra_no, lang,  section),
  })
}
