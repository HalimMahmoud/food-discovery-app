import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { axiosInstance, Users_URLS } from "../../service/utils";
import { registerSehemaValidation } from "../../service/vaildators";
export default function Register() {
  const [toggle, setToggle] = useState(true);
  const [toggleConfirm, setToggleConfirm] = useState(true);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(registerSehemaValidation),
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(Users_URLS.REGISTER, data);
      navigate("/verfiy");

      toast.success(response.data.message, {
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
    <div className="w-100">
      <h3 className="h5">Register</h3>
      <p className="text-muted">Welcome Back! Please enter your details</p>

      <form className="row" role="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="col">
          <div className="input-group mb-3">
            <div className="input-group-prepend ">
              <span className="input-group-text w-100 h-100" id="basic-addon1">
                <i className="fa fa-user"></i>
              </span>
            </div>
            <input
              {...register("userName")}
              type="text"
              className="form-control"
              placeholder="User Name"
              aria-label="User Name"
              aria-describedby="basic-addon1"
            />
          </div>
          {errors.userName && (
            <div className="pb-3 text-danger">{errors.userName.message}</div>
          )}
        </div>
        <div className="col">
          <div className="input-group mb-3">
            <div className="input-group-prepend ">
              <span className="input-group-text w-100 h-100" id="basic-addon1">
                <i className="fa fa-envelope"></i>
              </span>
            </div>
            <input
              {...register("email")}
              type="text"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
          </div>
          {errors.email && (
            <div className="pb-3 text-danger">{errors.email.message}</div>
          )}
        </div>
        <div className="w-100"></div>
        <div className="col">
          <div className="input-group mb-3">
            <div className="input-group-prepend ">
              <span className="input-group-text w-100 h-100" id="basic-addon1">
                <i className="fa fa-globe"></i>
              </span>
            </div>
            <input
              {...register("country")}
              type="text"
              className="form-control"
              placeholder="Country"
              aria-label="Country"
              aria-describedby="basic-addon1"
            />
          </div>
          {errors.country && (
            <div className="pb-3 text-danger">{errors.country.message}</div>
          )}
        </div>
        <div className="col">
          <div className="input-group mb-3">
            <div className="input-group-prepend ">
              <span className="input-group-text w-100 h-100" id="basic-addon1">
                <i className="fa fa-mobile-screen"></i>
              </span>
            </div>
            <input
              {...register("phoneNumber")}
              type="text"
              className="form-control"
              placeholder="Phone Number"
              aria-label="Phone Number"
              aria-describedby="basic-addon1"
            />
          </div>
          {errors.phoneNumber && (
            <div className="pb-3 text-danger">{errors.phoneNumber.message}</div>
          )}
        </div>

        <div className="w-100"></div>

        <div className="col">
          <div className="input-group mb-3">
            <div className="input-group-prepend ">
              <span className="input-group-text w-100 h-100" id="basic-addon1">
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
            <i
              className="fa fa-eye showpass"
              onClick={() => {
                setToggle(!toggle);
              }}
            ></i>
          </div>
          {errors.password && (
            <div className="pb-3 text-danger">{errors.password.message}</div>
          )}
        </div>

        <div className="col">
          <div className="input-group mb-3">
            <div className="input-group-prepend ">
              <span className="input-group-text w-100 h-100" id="basic-addon1">
                <i className="fa fa-lock"></i>
              </span>
            </div>
            <input
              {...register("confirmPassword", {
                validate: (confirmPassword) => {
                  return (
                    confirmPassword === watch(password) ||
                    "Passwords do not match"
                  );
                },
              })}
              type={toggleConfirm ? "text" : "password"}
              className="form-control"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              aria-describedby="basic-addon1"
            />
            <i
              className="fa fa-eye showpass"
              onClick={() => {
                setToggleConfirm(!toggleConfirm);
              }}
            ></i>
          </div>

          {errors.confirmPassword && (
            <div className="pb-3 text-danger">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <div className="links d-flex justify-content-end my-3">
          {/* <Link className="text-black" to="register">
                    Register?
                  </Link> */}
          <Link className="text-success" to="/">
            Login Now?
          </Link>
        </div>
        <button
          type="submit"
          className="btn btn-success w-50 m-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? <i className="fa fa-spinner"></i> : "Register"}
        </button>
      </form>
    </div>
  );
}
