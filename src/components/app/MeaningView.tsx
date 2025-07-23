import { useGetMeaningQuery } from "@/api/meaning.api"
import HorizontalScroll from "@/assets/horizontal_scroll.png"
import ErrorMessage from "../shared/ErrorMessage"
import useSutraStore from "@/store/sutraStore"
import useLanguageStore from "@/store/languageStore"
import CustomBeatLoader from "../shared/CustomBeatLoader"
import MultilineText from "../shared/MultilineText"
// import usePhilosophyStore from "@/store/philosophyStore"

const MeaningView = () => {
  const { sutra_no, khanda_no, section } = useSutraStore()
  const { language } = useLanguageStore()
  // const { philosophy } = usePhilosophyStore()

  const { error, isLoading, data } = useGetMeaningQuery(
    khanda_no,
    sutra_no,
    language,
    // philosophy,
    section
  )

  return (
    <div
      style={{
        backgroundImage: `url(${HorizontalScroll})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="pt-7 mt-5"></div>
      <div className="h-[210px] max-w-[90%] mx-auto overflow-y-auto">
        {isLoading && <CustomBeatLoader />}
        {error && <ErrorMessage error={"No meaning found"} />}
        <div className="font-semibold text-darkbrown text-lg pl-4">
          {data && <MultilineText text={data.text} />}
        </div>
      </div>
      <div className="pb-7"></div>
    </div>
  )
}

export default MeaningView
