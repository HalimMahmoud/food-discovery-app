import Logo from "../../assets/4 3.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
export default function Reset() {
  const [toggle, setToggle] = useState(false);
  const [toggleConfirm, setToggleConfirm] = useState(false);

  const navigate = useNavigate();
  const formSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    seed: Yup.string()
      .required("OTP is required")
      .length(4, "OTP length is 4 characters"),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      )
      .required("Password is required")
      .min(8, "Password length should be at least 8 characters")
      .max(20, "Password cannot exceed more than 20 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .min(8, "Password length should be at least 8 characters")
      .max(20, "Password cannot exceed more than 20 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );
      navigate("/");

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
    <div className="layout vh-100 ">
      <div className="overlay d-flex justify-content-center align-items-center">
        <div className="container-fluid w-50 bg-white rounded col-md-5 px-5 py-3">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <img className="w-50" src={Logo} alt="logo" />
            <div className="w-100">
              <h3 className="h5">Reset Password</h3>
              <p className="text-muted">
                Please Enter Your Otp or Check Your Inbox
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
                    {...register("email")}
                    type="text"
                    className="form-control"
                    placeholder="Email"
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
                      <i className="fa fa-key"></i>
                    </span>
                  </div>
                  <input
                    {...register("seed")}
                    type="text"
                    className="form-control"
                    placeholder="OTP"
                    aria-label="OTP"
                    aria-describedby="basic-addon1"
                  />
                </div>
                {errors.seed && (
                  <div className="pb-3">{errors.seed.message}</div>
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
                    {...register("password")}
                    type={toggle ? "text" : "password"}
                    className="form-control"
                    placeholder="New Password"
                    aria-label="New Password"
                    aria-describedby="basic-addon1"
                  />
                  <i
                    id="showpass"
                    className="fa fa-eye eye-icon"
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  ></i>
                </div>

                {errors.password && (
                  <div className="pb-3">{errors.password.message}</div>
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
                    {...register("confirmPassword")}
                    type={toggleConfirm ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm New Password"
                    aria-label="Confirm New Password"
                    aria-describedby="basic-addon1"
                  />
                  <i
                    id="showpass"
                    className="fa fa-eye eye-icon"
                    onClick={() => {
                      setToggleConfirm(!toggleConfirm);
                    }}
                  ></i>
                </div>

                {errors.confirmPassword && (
                  <div className="pb-3">{errors.confirmPassword.message}</div>
                )}
                <button type="submit" className="btn btn-success w-100 mt-5">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
