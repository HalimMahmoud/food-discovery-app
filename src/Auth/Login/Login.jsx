import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance, Users_URLS } from "../../service/utils";
import { loginSehemaValidation } from "../../service/vaildators";
// eslint-disable-next-line react/prop-types
export default function Login(props) {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSehemaValidation),
  });

  const [toggle, setToggle] = useState(false);
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(Users_URLS.LOGIN, data);
      localStorage.setItem("token", response.data.token);
      // eslint-disable-next-line react/prop-types
      props.saveLoginData();
      navigate("/dashboard");

      toast.success("Logged in successfully", {
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "light",
      });
    }
  };
  return (
    <div className="w-100">
      <h3 className="h5">Log In</h3>
      <p className="text-muted">Welcome Back! Please enter your details</p>

      <form className="" role="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <div className="input-group-prepend ">
            <span className="input-group-text">
              <i className="fa fa-envelope"></i>
            </span>
          </div>
          <input
            {...register("email")}
            type="text"
            className="form-control"
            placeholder="Enter your E-mail"
            aria-label="Email"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.email && (
          <div className="pb-3 text-danger">{errors.email.message}</div>
        )}

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock"></i>
            </span>
          </div>

          <input
            {...register("password")}
            type={toggle ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
          />
          <div className="input-group-append">
            <span
              className="input-group-text showpass"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <i className={`fa ${toggle ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </div>
        </div>

        {errors.password && (
          <div className="pb-3 text-danger">{errors.password.message}</div>
        )}

        <div className="links d-flex justify-content-between my-3">
          <Link className="text-black" to="/register">
            Register?
          </Link>
          <Link className="text-success" to="/forget">
            Forget Password?
          </Link>
        </div>
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? <i className="fa fa-spinner"></i> : "Login"}
        </button>
      </form>
    </div>
  );
}
