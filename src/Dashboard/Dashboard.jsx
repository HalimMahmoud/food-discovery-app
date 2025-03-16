import { useNavigate } from "react-router-dom";
import { useLoginData } from "../Hooks/useLoginData";
import Header from "../Shared/Header/Header";

export default function Dashboard() {
  const { loginData } = useLoginData();

  const navigate = useNavigate();

  const onNavigate = () => {
    navigate("recipes");
  };
  return (
    <div>
      <Header
        title="Welcome"
        welcomeHeader={true}
        tag={loginData?.userName}
        description="This is a welcoming screen for the entry of the application , you can now see the options"
      />

      <div className="container-fluid header my-3">
        <div className="row h-100 rounded-4 subheader">
          <div className="col-md-8 h-100">
            <div className="caption d-flex align-items-center h-100">
              <div className="m-5">
                <div className="d-inline">
                  <h3 className="d-inline">
                    Fill the <span className="text-success">Recipes </span>!
                  </h3>
                </div>

                <p className="w-75">
                  you can now fill the meals easily using the table and form ,
                  click here and sill it with the table !
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 h-100 d-flex justify-content-end  align-items-center">
            <button
              className="btn btn-success py-2 px-5 m-5"
              onClick={onNavigate}
            >
              Fill Recipes
              <i className="fa fa-arrow-right mx-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
