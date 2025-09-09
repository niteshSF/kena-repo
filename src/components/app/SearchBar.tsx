import { useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { useDebounce } from "@/hooks/useDebounce"
import { useGetResultQuery } from "@/api/search.api"

import LightBarImg from "@/assets/light_bar.png"
import DarkBarImg from "@/assets/dark_bar.png"
import CustomBeatLoader from "../shared/CustomBeatLoader"
import ErrorMessage from "../shared/ErrorMessage"

import useLanguageStore from "@/store/languageStore"
import useModeStore from "@/store/modeStore"
import useSutraStore from "@/store/sutraStore"
import usePhilosophyStore from "@/store/philosophyStore"

import { Language, Mode, Philosophy } from "@/types/types"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const debouncedSearchTerm = useDebounce(searchTerm, 250)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const navigate = useNavigate()

  const searchRef = useRef<HTMLDivElement>(null) 

  const { setLanguage } = useLanguageStore()
  const { setMode } = useModeStore()
  const { setSutraNo, setKhandaNo, setChapter, setSection } = useSutraStore()
  const { setPhilosophy } = usePhilosophyStore()

  const {
    data: results,
    isLoading,
    error,
  } = useGetResultQuery(debouncedSearchTerm)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSelect = (
    lang: Language,
    mode: string,
    khandaNo: number,
    sutraNo: number,
    chapter: number,
    section: number
  ) => {
    setLanguage(lang)
    setSutraNo(sutraNo)
    setKhandaNo(khandaNo)
    setChapter(chapter)
    setSection(section)

    if (mode === Mode.Chant) {
      setMode(Mode.Chant)
      navigate("/chant")
    } else if (mode === Mode.TeachMe) {
      setMode(Mode.TeachMe)
      navigate("/teach-me")
    } else if (mode.startsWith("interpretation")) {
      setMode(Mode.LearnMore)
      navigate("/learn-more")
      const pType = mode.split(" - ")[1]
      setPhilosophy(pType as Philosophy)
    }

    setSearchTerm("")
  }

  // to close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative mb-4" ref={searchRef}> 
      <div className="relative w-full mx-auto">
        <Input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleInputChange}
          className="h-10 pl-10 pr-4 rounded-md w-full placeholder:text-darkbrown placeholder:font-bold"
          style={{
            backgroundImage: `url(${LightBarImg})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-darkbrown" />
      </div>

      {searchTerm !== "" && results && (
        <div
          className="absolute right-[70px] top-[45px] max-w-[1060px] p-2 flex flex-col gap-1 rounded-lg z-50 max-h-[445px] overflow-y-auto shadow-xl"
          style={{
            backgroundImage: `url(${LightBarImg})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          {isLoading && <CustomBeatLoader />}
          {error && <ErrorMessage error="Search failed" />}

          {/* Showing message if no results */}
          {!isLoading && results.length === 0 && (
            <p className="text-center text-darkbrown font-semibold">No results found</p>
          )}

          {results.map((result, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="p-2 w-full text-darkbrown font-semibold hover:text-white flex items-center hover:cursor-pointer hover:rounded-sm"
              style={{
                backgroundImage: hoveredIndex === index ? `url(${DarkBarImg})` : "none",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
              onClick={() =>
                handleSearchSelect(
                  result.lang,
                  result.mode,
                  result.khanda_no,
                  result.sutra_no,
                  result.chapter,
                  result.section
                )
              }
            >
              <p className="whitespace-nowrap overflow-hidden text-ellipsis flex-[8]">
                {result.text}
              </p>

              {/* It shows SM if any of the Shanti Mantra is selected or else it shows the khanda & sutra number */}
              <p className="flex-[2] text-right leading-tight">
                 ॥ {result.chapter === 0 && (result.sutra_no === 0 || result.sutra_no === -1)
                   ? "SM"
                   : `${result.chapter}.${result.sutra_no}`} ॥

                <br />
                <span className="text-sm">({result.mode.replace("_", " ")})</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
