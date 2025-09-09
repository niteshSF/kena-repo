import VScrollImg from "@/assets/vertical_scroll.png";
import TexturedButton from "../shared/TexturedButton";
import LanguageSelect from "./LanguageSelect";
import useSutraStore from "@/store/sutraStore";
import { useGetSutraListQuery } from "@/api/sutras.api.ts";
import ErrorMessage from "../shared/ErrorMessage";
import CustomBeatLoader from "../shared/CustomBeatLoader";
import SearchBar from "./SearchBar";

interface Khanda {
  number: number;
  sutra_list: (number | 'next')[];
}

const RightScroll = ({ isCommentary }: { isCommentary: boolean }) => {
  const { error, isLoading } = useGetSutraListQuery();
  const { chapter, setChapter, sutra_no, setSutraNo, setKhandaNo, section, setSection } = useSutraStore();

  const data: { khanda_list: Khanda[] } = {
    khanda_list: [
      { number: 1, sutra_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'next'] },
      { number: 2, sutra_list: [1, 2, 3, 4, 5, 'next'] },
      { number: 3, sutra_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'next'] },
      { number: 4, sutra_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'next'] },
    ],
  };

  const handleSutraClick = (sutra: number | 'next', khanda_number: number) => {
    console.log('rs SutraClick: section', section, 'khanda:', khanda_number, 'sutra:', sutra);
    if (sutra === 'next') {
      const nextKhanda = data.khanda_list.find((k: Khanda) => k.number === khanda_number + 1);
      if (nextKhanda) {
        setChapter(nextKhanda.number);
        setKhandaNo(nextKhanda.number);
       
        const nextSutra = nextKhanda.sutra_list[0] as number;
        setSutraNo(nextSutra);
        setSection(0);
      }
    } else {
      setSutraNo(sutra);
      setChapter(khanda_number);
      setKhandaNo(khanda_number);
      setSection(0);
    }
  };

  const handleKhandaClick = (khanda: number) => {
    console.log('rs KhandaClick: khanda:', khanda);

      setChapter(khanda);
      setKhandaNo(khanda);
      setSection(0);
      const firstSutra = data.khanda_list.find((k: Khanda) => k.number === khanda)?.sutra_list[0];
      setSutraNo(firstSutra as number);

  };

  return (
    <div
      className="h-[600px] w-[250px] bg-cover bg-no-repeat bg-center flex flex-col items-center"
      style={{ backgroundImage: `url(${VScrollImg})`, backgroundSize: "100% 100%", minWidth: "250px" }}
    >
      <div className="flex flex-col items-center mx-8 ml-10 mt-10 w-full">

        <SearchBar />
        <LanguageSelect isCommentary={!isCommentary} />

        {isLoading && <CustomBeatLoader />}
        {error && <ErrorMessage error={error.message} />}

        {/* Shanti Mantra button */}
        <TexturedButton
          className="mt-7 mb-4 w-52 h-12 flex items-center justify-center"
          selected={sutra_no === 0 && chapter === 0}
          onClick={() => handleSutraClick(0, 0)}
        >
          Shanti Mantra
        </TexturedButton>

        {/* Khandas as TexturedButtons */}
        {data.khanda_list.map((item: Khanda) => (
          <TexturedButton
            key={item.number}
            selected={chapter === item.number}
            onClick={() => handleKhandaClick(item.number)}
            className="mt-2"
          >
            Khanda {item.number}
          </TexturedButton>
        ))}

        {/* Changes thr Shanti Mantra button as per the Last  */}
        <TexturedButton
          className="mt-6 w-52 h-12 flex items-center justify-center"
          selected={sutra_no === -1 && chapter === 0}   // made it as sutra no -1, so as it show tha data as stored in the database
          onClick={() => handleSutraClick(-1, 0)}
        >
          Shanti Mantra
        </TexturedButton>
      </div>
    </div>
  );
};

export default RightScroll;
