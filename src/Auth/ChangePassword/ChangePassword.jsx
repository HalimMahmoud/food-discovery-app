import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSehemaValidation } from "../../services/vaildators";
import { useEffect, useState } from "react";
import { users_endpoints } from "../../services/api/apiConfig";
import { privateApiInstance } from "../../services/api/apiInstance";
import { toast } from "react-toastify";

import Logo from "../../assets/4 3.png";
import { MenuItem } from "react-pro-sidebar";

// eslint-disable-next-line react/prop-types
export default function ChangePassword({ SidebarItem }) {
  const [showModal, setShowModal] = useState(false);

  const [oldPasswordToggle, setOldPasswordToggle] = useState(false);
  const [newPasswordToggle, setNewPasswordToggle] = useState(false);
  const [confirmNewPasswordToggle, setConfirmNewPasswordToggle] =
    useState(false);

  const {
    register,
    reset,
    watch,
    trigger,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(changePasswordSehemaValidation),
  });

  const newPassword = watch("newPassword");
  const confirmNewPassword = watch("confirmNewPassword");

  useEffect(() => {
    if (confirmNewPassword) {
      trigger("confirmNewPassword");
    }
  }, [newPassword, confirmNewPassword, trigger]);
  const onSubmit = async (data) => {
    handleClose();

    try {
      const response = await privateApiInstance.put(
        users_endpoints.CHANGE_PASSWORD,
        data
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    reset();
  };

  return (
    <>
      {SidebarItem ? (
        <MenuItem onClick={handleShow} icon={<i className="fa fa-unlock"></i>}>
          Change Password
        </MenuItem>
      ) : (
        <button className="dropdown-item" type="button" onClick={handleShow}>
          Change Password
        </button>
      )}
      <Modal show={showModal} onHide={handleClose}>
        <i
          className="fa-regular fa-circle-xmark close-icon text-danger"
          onClick={handleClose}
        ></i>
        <div className="container-fluid bg-white rounded px-5 py-3">
          <img className="" src={Logo} alt="logo" />

          <h3 className="h5">Change Password</h3>
          <p className="text-muted">Enter your details below </p>

          <form className="" role="form" onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body className="">
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
                  {...register("oldPassword")}
                  type={oldPasswordToggle ? "text" : "password"}
                  className="form-control"
                  placeholder="Old Password"
                  aria-label="Old Password"
                  aria-describedby="basic-addon1"
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text showpass"
                    onClick={() => {
                      setOldPasswordToggle(!oldPasswordToggle);
                    }}
                  >
                    <i
                      className={`fa ${
                        oldPasswordToggle ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </span>
                </div>
              </div>
              {errors.oldPassword && (
                <div className="pb-3 text-danger">
                  {errors.oldPassword.message}
                </div>
              )}{" "}
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
                  {...register("newPassword")}
                  type={newPasswordToggle ? "text" : "password"}
                  className="form-control"
                  placeholder="New Password"
                  aria-label="New Password"
                  aria-describedby="basic-addon1"
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text showpass"
                    onClick={() => {
                      setNewPasswordToggle(!newPasswordToggle);
                    }}
                  >
                    <i
                      className={`fa ${
                        newPasswordToggle ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </span>
                </div>
              </div>
              {errors.newPassword && (
                <div className="pb-3 text-danger">
                  {errors.newPassword.message}
                </div>
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
                  {...register("confirmNewPassword", {
                    validate: (confirmNewPassword) => {
                      return (
                        confirmNewPassword === watch(newPassword) ||
                        "Passwords do not match"
                      );
                    },
                  })}
                  type={confirmNewPasswordToggle ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm New Password"
                  aria-label="Confirm New Password"
                  aria-describedby="basic-addon1"
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text showpass"
                    onClick={() => {
                      setConfirmNewPasswordToggle(!confirmNewPasswordToggle);
                    }}
                  >
                    <i
                      className={`fa ${
                        confirmNewPasswordToggle ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </span>
                </div>
              </div>
              {errors.confirmNewPassword && (
                <div className="pb-3 text-danger">
                  {errors.confirmNewPassword.message}
                </div>
              )}
              <Button
                type="submit"
                className=" w-100 mt-5"
                variant="success"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <i className="fa fa-spinner"></i>
                ) : (
                  "Change Password"
                )}
              </Button>
            </Modal.Body>
          </form>
        </div>
      </Modal>
    </>
  );
}
