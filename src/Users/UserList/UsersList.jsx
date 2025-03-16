import { useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";

import { priveteApiInstance } from "../../services/api/apiInstance";
import { imageURL, users_endpoints } from "../../services/api/apiConfig";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../Shared/Modal/DeleteConfirmation";
// import DeleteConfirmation from "../../Shared/Model/DeleteConfirmation";
import NoData from "../../Shared/NoData/NoData";
import Pagination from "../../Shared/Pagination/Pagination";

export default function UsersList() {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const [{ userName, email, country, groups }, setQuery] = useState({
    userName: "",
    email: "",
    country: "",
    groups: [1],
  });
  // handle fetch logic
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [arrayOfPages, setArrayOfPages] = useState([]);

  const getAllUsers = async (
    groups,
    pageSize,
    pageNumber,
    userName,
    email,
    country
  ) => {
    try {
      const response = await priveteApiInstance.get(
        users_endpoints.GET_ALL_USERS,
        {
          params: {
            groups,
            pageNumber,
            pageSize,
            userName,
            email,
            country,
          },
        }
      );
      setUsersList([...response.data.data]);

      setArrayOfPages(
        Array.from(
          { length: response.data.totalNumberOfPages },
          (_, i) => i + 1
        )
      );

      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllUsers(groups, 10, currentPageNumber, userName, email, country);
  }, [currentPageNumber, groups, userName, email, country]);

  // handle delete category logic
  const deleteUser = async (selectedId) => {
    try {
      await priveteApiInstance.delete(users_endpoints.DELETE_USER(selectedId));
      toast.success("User is deleted successfully");
      getAllUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  // confirmation model before delete
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleShow = (id) => {
    setShowModal(true);
    setSelectedId(id);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  const handleCloseAndDelete = (id) => {
    handleClose();
    deleteUser(id);
  };
  const getValues = (e) => {
    setQuery((prev) => {
      console.log({ ...prev, [e.target.name]: e.target.value });
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div>
      <Header
        title="Users"
        tag="Items"
        description="You can now add your items that any user can order it from the application and you can edit"
      />

      <div className="title d-flex justify-content-between my-3">
        <div className="caption">
          <h3>Users Table Details</h3>
          <span>You can check details</span>
        </div>
        {/* <button className="btn btn-success my-auto">Add new Category</button> */}
        {/* <AddCategory getAllCategories={getAllUsers} /> */}
      </div>

      <div className="container-fluid">
        <form onChange={getValues}>
          <div className="form-group row">
            <div className="col-md-4">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text bg-transparent"
                    id="search-addon"
                  >
                    <i className="fa fa-user"></i>
                  </span>
                </div>
                <input
                  name="userName"
                  className="form-control"
                  type="text"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="form-group col-md-4">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text bg-transparent"
                    id="search-addon"
                  >
                    <i className="fa fa-envelope"></i>
                  </span>
                </div>
                <input
                  name="email"
                  className="form-control"
                  type="text"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="form-group col-md-2">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text bg-transparent"
                    id="search-addon"
                  >
                    <i className="fa fa-globe"></i>
                  </span>
                </div>
                <input
                  name="country"
                  className="form-control"
                  type="text"
                  placeholder="Country"
                />
              </div>
            </div>

            <div className="form-group col-md-2">
              <select name="groups" className="form-control form-select">
                <option value="1">SuperAdmin</option>
                <option value="2">SystemUser</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">User Name</th>
            <th scope="col">Image</th>

            <th scope="col">Phone</th>

            <th scope="col">Email</th>

            <th scope="col">Country</th>
            <th scope="col">Group</th>

            <th scope="col">Actions</th>
          </tr>
        </thead>

        {loading ? (
          <tbody className="text-center">
            <tr>
              <td colSpan="7" className="">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {usersList.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <NoData />
                </td>
              </tr>
            ) : (
              usersList.map((user) => (
                <tr key={user.id}>
                  <td>{user.userName}</td>
                  <td>
                    <img src={imageURL + user.imagePath} width="200px" />
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>
                  <td>{user.group.name}</td>
                  <td>
                    <div className="dropdown">
                      <i
                        className="fa fa-ellipsis text-success m-2"
                        data-bs-offset="-20,0"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></i>
                      <ul className="dropdown-menu">
                        <li>
                          <button className="dropdown-item" type="button">
                            <i className="fa fa-eye text-success m-2"></i>
                            View
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" type="button">
                            <i className="fa fa-edit text-success m-2"></i>
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleShow(user.id)}
                            type="button"
                          >
                            <i className="fa fa-trash text-success m-2"></i>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        )}
      </table>

      <DeleteConfirmation
        item="User"
        show={showModal}
        handleClose={handleClose}
        handleCloseAndDelete={() => handleCloseAndDelete(selectedId)}
      />

      <Pagination
        arrayOfPages={arrayOfPages}
        currentPage={currentPageNumber}
        changeCurrentPage={setCurrentPageNumber}
      />
    </div>
  );
}
