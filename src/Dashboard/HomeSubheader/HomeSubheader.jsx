import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

export default function HomeSubheader() {
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate("recipes");
  };
  const { isAdmin } = useContext(AuthContext);

  return (
    <div className="header h-100 my-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 rounded-4 subheader h-100">
        <div className="p-4 mb-3 mb-md-0 text-center text-md-start">
          <h3 className="d-inline">
            {isAdmin ? "Fill" : "Show"} the{" "}
            <span className="text-success">Recipes</span>!
          </h3>
          <p className="w-75 mx-auto mx-md-0">
            You can now fill the meals easily using the table and form, click
            here and fill it with the table!
          </p>
        </div>

        <div className="d-flex justify-content-center justify-content-md-end align-items-center p-5">
          <button
            className="btn btn-success py-2 px-5"
            style={{ minWidth: "200px" }}
            onClick={onNavigate}
          >
            {isAdmin ? "Fill" : ""} Recipes
            <i className="fa fa-arrow-right mx-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
