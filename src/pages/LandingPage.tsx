import { Link, useNavigate } from "react-router-dom";
import landingPageImage from "../assets/LandingPage.png";
import EnterButton from "../assets/EnterButton.png";
import name from "../assets/landigpage-name.png";
import logo1 from "../assets/logo1-meity.png";
import logo2 from "../assets/logo2-uoh.png";
import logo3 from "../assets/logo3-sf.png";
import { IoHome } from "react-icons/io5";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Background Image */}
      <img
        src={landingPageImage}
        alt="Landing Page"
        style={{ margin: "0px", padding: "0px", width: "100%", height: "100vh" }}
      />

      {/* Top-left home icon */}
      <div
  style={{
    position: "absolute",
    top: "4vh",
    left: "2vw",
    zIndex: 10,
  }}
>
  <Link to="https://test1.samskritifoundation.org/home/" style={{ textDecoration: "none" }}>
    <div
      style={{
        height: "8vh",
        width: "8vh",
        backgroundColor: "black",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
      }}
    >
      <IoHome
        color="white"
        style={{
          height: "20vh",
          width: "4vh",
        }}
      />
    </div>
  </Link>
</div>

      {/* Top-right logos */}
      <div
        style={{
          position: "absolute",
          top: "3vh",
          right: "4vw",
          display: "flex",
          gap: "3vw",
          zIndex: 10,
        }}
      >
        <a href="https://www.meity.gov.in/" target="_blank" rel="noopener noreferrer">
          <img src={logo1} alt="Logo 1" style={{ height: "16vh" }} />
        </a>
        <a href="https://sanskrit.uohyd.ac.in/" target="_blank" rel="noopener noreferrer">
          <img src={logo2} alt="Logo 2" style={{ height: "16vh" }} />
        </a>
        <a href="https://samskritifoundation.org/" target="_blank" rel="noopener noreferrer">
          <img src={logo3} alt="Logo 3" style={{ height: "16vh" }} />
        </a>
      </div>

      {/* Image Name */}
      <img
        src={name}
        alt="Title Name"
        style={{
          position: "absolute",
          width: "41vw",
          bottom: "30vh",
          right: "9vw", 
        }}
      />

      {/* Enter Button */}
      <img
        src={EnterButton}
        alt="Enter"
        style={{
          position: "absolute",
          width: "11vw",
          bottom: "9vh",
          right: "10vw",
          cursor: "pointer",
        }}
        onClick={() => navigate("/introduction")}
      />
    </div>
  );
};

export default LandingPage;
