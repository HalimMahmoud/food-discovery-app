import Logo from "../../assets/4 3.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );
      navigate("/dashboard");

      toast.success("Logged in successfully", {
        theme: "light",
      });
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "light",
      });
    }
  };
  return (
    <div className="layout vh-100 ">
      <div className="overlay d-flex justify-content-center align-items-center">
        <div className="container-fluid w-50 bg-white rounded col-md-5 px-5 py-3">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <img className="w-50" src={Logo} alt="logo" />
            <div className="w-100">
              <h3 className="h5">Log In</h3>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>

              <form className="" role="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <div className="input-group-prepend ">
                    <span
                      className="input-group-text w-100 h-100"
                      id="basic-addon1"
                    >
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid mail ",
                      },
                    })}
                    type="text"
                    className="form-control"
                    placeholder="Enter your E-mail"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                  />
                </div>
                {errors.email && (
                  <div className="pb-3">{errors.email.message}</div>
                )}

                <div className="input-group mb-3">
                  <div className="input-group-prepend ">
                    <span
                      className="input-group-text w-100 h-100"
                      id="basic-addon1"
                    >
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 5,
                        message: "Enter min 5 charaters at least",
                      },
                    })}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                  />
                </div>
                {errors.password && (
                  <div className="pb-3">{errors.password.message}</div>
                )}

                <div className="links d-flex justify-content-between my-3">
                  <Link className="text-black" to="register">
                    Register?
                  </Link>
                  <Link className="text-success" to="forget">
                    Forget Password?
                  </Link>
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
