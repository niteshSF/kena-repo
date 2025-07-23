import Header_bg from "../../assets/header_bg.png";
import TexturedButton from "@/components/shared/TexturedButton";
import { useLocation, useNavigate } from "react-router-dom";
import TitleImage from "../../assets/Title.png";
import HelpDropdown from "../app/HelpDropdown";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/chant" },
    { label: "About", path: "/about" },
    { label: "Credits", path: "/credits" },
    { label: "Disclaimer", path: "/disclaimer" },
   
  ];

  return (
    <header
          className="w-full h-[95px] flex justify-between items-center px-2 py-0 drop-shadow-lg bg-no-repeat"
          style={{
            backgroundImage: `url(${Header_bg})`,
            backgroundPosition: "-20px center",
            backgroundSize: "103% 110%",
            backgroundRepeat: "no-repeat",
          }}
        >
      {/* Left Section - Title Logo */}
      <div className="cursor-pointer pl-1 flex items-center gap-6 pb-2">
        <img src={TitleImage} alt="Title image" className="h-[65px] w-auto" />
      </div>

      {/* Center Title */}
          <div style={{ textAlign: "center", flex: "1", whiteSpace: "nowrap" }}>
            <h3
              style={{
                color: "#4B2E2E",
                fontWeight: "bolder",
                fontSize: "1.45rem",
                marginTop: "2px",
              }}
            >
              Sanskrit Knowledge Accessor
            </h3>
            <h1
              style={{
                color: "#eb4706",
                fontWeight: "bold",
                fontSize: "1.89rem",
                marginTop: "-8px",
              }}
            >
              Upanishad Reader
            </h1>
          </div>

      {/* Navigation Buttons */}
          <nav className="flex gap-1 pr-4">
            {navItems.map(({ label, path }) => (
              <TexturedButton
                key={path}
                selected={location.pathname === path}
                onClick={() => navigate(path)}
                aria-label={`Navigate to ${label}`}
              >
                {label}
              </TexturedButton>
            ))}
            <HelpDropdown />
          </nav>
        </header>
  );
};

export default Header;
