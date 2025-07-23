import { Mode } from "@/types/types"
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

type TAudio = {
  file_path: string
}

const getAudio = async (section: number, chapter: number, number: number, mode: Mode) => {
  const response = await api.get(`/sutras/${GLOBAL_CONFIG.upanishad}/${section}/${chapter}/${number}/audio?mode=${mode}`)
  return response.data
}

export const useGetAudioQuery = (section: number, chapter: number, number: number, mode: Mode) => {
  return useQuery<TAudio>({
    queryKey: ["audio", section, chapter, number, mode],
    queryFn: () => getAudio(section, chapter, number, mode),
  })
}
