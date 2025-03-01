import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { axiosInstance, Users_URLS } from "../../service/utils";
import { resetSehemaValidation } from "../../service/vaildators";
export default function Reset() {
  const [toggle, setToggle] = useState(false);
  const [toggleConfirm, setToggleConfirm] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    register,
    formState: { errors, isSubmitting, defaultValues },
    handleSubmit,
  } = useForm({
    defaultValues: { email: state?.email },
    mode: "onChange",
    resolver: yupResolver(resetSehemaValidation),
  });

  const disabled = defaultValues.email ? "disabled" : "";

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        Users_URLS.RESET_PASSWORD,
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
    <div className="w-100">
      <h3 className="h5">Reset Password</h3>
      <p className="text-muted">Please Enter Your Otp or Check Your Inbox</p>

      <form className="" role="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <div className="input-group-prepend ">
            <span className="input-group-text w-100 h-100" id="basic-addon1">
              <i className="fa fa-envelope"></i>
            </span>
          </div>
          <input
            {...register("email")}
            disabled={disabled}
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

        <div className="input-group mb-3">
          <div className="input-group-prepend ">
            <span className="input-group-text w-100 h-100" id="basic-addon1">
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
          <div className="pb-3 text-danger">{errors.seed.message}</div>
        )}

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
            placeholder="New Password"
            aria-label="New Password"
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
        <div className="input-group mb-3">
          <div className="input-group-prepend ">
            <span className="input-group-text w-100 h-100" id="basic-addon1">
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
          <div className="input-group-append">
            <span
              className="input-group-text showpass"
              onClick={() => {
                setToggleConfirm(!toggleConfirm);
              }}
            >
              <i
                className={`fa ${toggleConfirm ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </span>
          </div>
        </div>

        {errors.confirmPassword && (
          <div className="pb-3 text-danger">
            {errors.confirmPassword.message}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-success w-100 mt-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? <i className="fa fa-spinner"></i> : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
