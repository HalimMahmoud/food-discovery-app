import NotFoundImg from "../../assets/Mediamodifier-Design.svg";
import Logo from "../../assets/4 3.png";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate("/");
  };
  return (
    <div
      className="vh-100 notfound"
      style={{ backgroundImage: `url(${NotFoundImg})` }}
    >
      <div className="w-50 h-50">
        <img src={Logo} />

        <div className="d-flex flex-column justify-content-evenly h-100 align-items-center">
          <h1>Oops, ...</h1>
          <h3 className="text-success">Page not found</h3>

          <h5>
            This Page doesn’t exist or was removed! We suggest you back to home.
          </h5>

          <button className="btn btn-success py-2 px-5" onClick={onNavigate}>
            <i className="fa fa-arrow-left mx-2"></i>
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
}
