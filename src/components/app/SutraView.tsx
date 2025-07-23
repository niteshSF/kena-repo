import { useGetSutraQuery } from "@/api/sutras.api.ts";
import HorizontalScroll from "@/assets/horizontal_scroll.png";
import ErrorMessage from "../shared/ErrorMessage";
import useSutraStore from "@/store/sutraStore";
import { useGetTransliterationQuery } from "@/api/transliteration.api";
import useLanguageStore from "@/store/languageStore";
import CustomBeatLoader from "../shared/CustomBeatLoader";
import MultilineText from "../shared/MultilineText";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetAudioQuery } from "@/api/audio.api";
import { Mode } from "@/types/types";
import useModeStore from "@/store/modeStore";

const SutraView = () => {
  const { sutra_no, chapter, section, incrementSutra } = useSutraStore();
  const { language } = useLanguageStore();
  const { mode } = useModeStore();

  // Fetch Sutra
  const { error, isLoading, data } = useGetSutraQuery(section, chapter, sutra_no);

  // Fetch Transliteration
  const {
    error: transError,
    isLoading: isTransLoading,
    data: transliteration,
  } = useGetTransliterationQuery(section, chapter, sutra_no, language);

  // Fetch Audio
  const { data: audioData } = useGetAudioQuery(
    section,
    chapter,
    sutra_no,
    mode as Mode
  );

  return (
    <div
      style={{
        backgroundImage: `url(${HorizontalScroll})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="pt-5" />

      <div className="max-w-[90%] mx-auto">
        {/* Header */}
        {data && (
          <div className="flex justify-between h-10 text-lg font-bold text-darkbrown mx-4">
            <Link to="/anusarak.png" target="_blank" rel="noopener noreferrer">
              <div className="flex mt-[2px] gap-1 items-center">
                Anusarak <ExternalLink size="20px" />
              </div>
            </Link>
            <p className="bg-darkbrown rounded-full text-white flex items-center justify-center w-10 h-10 -mt-1 mb-5">
              {data.chapter}.{data.number === 0 || data.number === -1 ? "S" : data.number}
            </p>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="h-[190px] overflow-y-auto box-content px-4">
          {isLoading && <CustomBeatLoader />}
          {error && <ErrorMessage error={error.message} />}

          {data && (
            <div className="font-bold text-darkorange text-xl text-center">
              {data.text && <MultilineText text={data.text} />}
            </div>
          )}

          {isTransLoading && <CustomBeatLoader />}
          {transError && <ErrorMessage error={transError.message} />}
          {transliteration && (
            <p className="mt-4 text-darkbrown font-semibold text-center text-xl">
              {transliteration.text && <MultilineText text={transliteration.text} />}
            </p>
          )}

          {/* Audio player with auto-increment logic */}
          {audioData?.file_path && (
            <div className="mt-4 flex justify-center">
              <audio
                src={`/static/${audioData.file_path}`}
                autoPlay
                onEnded={() => {
                  setTimeout(() => {
                    incrementSutra();
                  }, 2000); // Wait 2 seconds before going to next sutra
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="pb-5" />
    </div>
  );
};

export default SutraView;
