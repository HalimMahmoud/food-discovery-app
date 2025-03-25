import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifySchemaValidation } from "../../services/vaildators";
import { apiInstance } from "../../services/api/apiInstance";
import { users_endpoints } from "../../services/api/apiConfig";
export default function Verfiy() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    register,
    formState: { errors, isSubmitting, defaultValues },
    handleSubmit,
  } = useForm({
    defaultValues: { email: state?.email },
    mode: "onChange",
    resolver: yupResolver(verifySchemaValidation),
  });
  const disabled = defaultValues.email ? "disabled" : "";

  const onSubmit = async (data) => {
    try {
      const response = await apiInstance.put(users_endpoints.VERIFY, data);
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
      <h3 className="h5">Verify Account</h3>
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
            {...register("code")}
            type="text"
            className="form-control"
            placeholder="OTP"
            aria-label="OTP"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.code && (
          <div className="pb-3 text-danger">{errors.code.message}</div>
        )}

        <button
          type="submit"
          className="btn btn-success w-100 mt-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
}
