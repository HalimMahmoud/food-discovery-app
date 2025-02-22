import Logo from "../../assets/4 3.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
export default function Register() {
  const [toggle, setToggle] = useState(false);
  const [toggleConfirm, setToggleConfirm] = useState(false);

  const navigate = useNavigate();
  const formSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Username is required")
      .min(4, "Username length should be at least 4 characters")
      .matches(
        /^[A-Za-z]*\d+/,
        "Username must contain characters and end with numbers without spaces"
      ),
    email: Yup.string().email("Invalid email").required("Email is required"),
    country: Yup.string()
      .required("Country name is required")
      .min(4, "Country name length should be at least 4 characters"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password length should be at least 8 characters")
      .max(20, "Password cannot exceed more than 20 characters")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
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
        "https://upskilling-egypt.com:3006/api/v1/Users/Register",
        data
      );
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
    <div className="layout vh-100 ">
      <div className="overlay d-flex justify-content-center align-items-center">
        <div className="container-fluid w-50 bg-white rounded col-md-5 px-5 py-3">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <img className="w-50" src={Logo} alt="logo" />
            <div className="w-100">
              <h3 className="h5">Register</h3>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>

              <form
                className="row"
                role="form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="col">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend ">
                      <span
                        className="input-group-text w-100 h-100"
                        id="basic-addon1"
                      >
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
                    <div className="pb-3 text-danger">
                      {errors.userName.message}
                    </div>
                  )}
                </div>
                <div className="col">
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
                    <div className="pb-3 text-danger">
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div className="w-100"></div>
                <div className="col">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend ">
                      <span
                        className="input-group-text w-100 h-100"
                        id="basic-addon1"
                      >
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
                    <div className="pb-3 text-danger">
                      {errors.country.message}
                    </div>
                  )}
                </div>
                <div className="col">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend ">
                      <span
                        className="input-group-text w-100 h-100"
                        id="basic-addon1"
                      >
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
                    <div className="pb-3 text-danger">
                      {errors.phoneNumber.message}
                    </div>
                  )}
                </div>

                <div className="w-100"></div>

                <div className="col">
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
                    <div className="pb-3 text-danger">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <div className="col">
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
                <button type="submit" className="btn btn-success w-50 m-auto">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
