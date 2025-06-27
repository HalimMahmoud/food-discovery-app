import HomeHeaderFigure from "../../assets/HomeHeaderFigure.png";
import HomeHeaderBackground from "../../assets/HomeHeaderBackground.svg";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

// eslint-disable-next-line react/prop-types
export default function HomeHeader() {
  const { user } = useContext(AuthContext);
  const title = "Welcome";
  const tag = user?.userName;
  const description =
    "This is a welcoming screen for the entry of the application, You can now see the options";

  return (
    <div className="header h-100">
      <header
        style={{
          backgroundImage: `url("${HomeHeaderBackground}")`,
        }}
        className="bg-header h-100 d-flex flex-column flex-md-row justify-content-between align-items-center p-3"
      >
        <div className="text-white px-4">
          <h1 className="d-inline">{title}</h1>
          <h5 className="d-inline m-3">{tag}</h5>
          <p className="w-60">{description}</p>
        </div>

        <div>
          <img
            src={HomeHeaderFigure}
            width="250"
            height="250"
            alt="Logo"
            className="img-fluid"
          />
        </div>
      </header>
    </div>
  );
}
