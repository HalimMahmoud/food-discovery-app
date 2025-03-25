import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { editProfileSehemaValidation } from "../../services/vaildators";
import { privateApiInstance } from "../../services/api/apiInstance";
import { users_endpoints } from "../../services/api/apiConfig";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function EditProfile() {
  const formRef = useRef();

  const [showModal, setShowModal] = useState(false);
  const [toggleConfirm, setToggleConfirm] = useState(false);
  const [{ userName, email, country, phoneNumber, profileImage }, setUser] =
    useState({
      userName: "",
      email: "",
      country: "",
      phoneNumber: "",
      profileImage: "",
    });
  const getUserData = async () => {
    try {
      const response = await privateApiInstance.get(users_endpoints.GET_USER);

      const { userName, email, country, phoneNumber, imagePath } =
        response.data;
      setUser({
        userName,
        email,
        country,
        phoneNumber,
        profileImage: imagePath,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    reset();
  };

  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    values: {
      userName,
      email,
      country,
      phoneNumber,
      profileImage,
      confirmPassword: "",
    },
    resolver: yupResolver(editProfileSehemaValidation),
  });

  const onSubmit = async () => {
    const formData = new FormData(formRef.current);

    try {
      const response = await privateApiInstance.put(
        users_endpoints.UPDATE_USER,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      toast.success("Profile is edited successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <button
        className="dropdown-item"
        onClick={() => handleShow(null)}
        type="button"
      >
        Edit Profile
      </button>
      <Modal show={showModal} onHide={handleClose}>
        <i
          className="fa-regular fa-circle-xmark close-icon text-danger"
          onClick={handleClose}
        ></i>

        <form
          className=""
          role="form"
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Modal.Body className="">
            {/* <img className="w-50 my-5" src={ModalImg} /> */}
            <h5>Edit Profile</h5>

            <div className="container">
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
                  <div className="pb-3 text-danger">{errors.email.message}</div>
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
                  <input
                    {...register("profileImage")}
                    type="file"
                    className="form-control"
                  />
                </div>
                {errors.profileImage && (
                  <div className="pb-3 text-danger">
                    {errors.profileImage.message}
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
                  <div className="input-group-append">
                    <span
                      className="input-group-text showpass"
                      onClick={() => {
                        setToggleConfirm(!toggleConfirm);
                      }}
                    >
                      <i
                        className={`fa ${
                          toggleConfirm ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </span>
                  </div>
                </div>

                {errors.confirmPassword && (
                  <div className="pb-3 text-danger">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="success" disabled={isSubmitting}>
              {isSubmitting ? <i className="fa fa-spinner"></i> : "Save"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
