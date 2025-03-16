import { useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";
// import AddEditCategory from "../../Shared/Modal/AddEditCategory";
// import AddCategory from "../../Shared/Modal/AddEditCategory";
import { priveteApiInstance } from "../../services/api/apiInstance";
import { categories_endpoints } from "../../services/api/apiConfig";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../Shared/Modal/DeleteConfirmation";
// import DeleteConfirmation from "../../Shared/Model/DeleteConfirmation";
import NoData from "../../Shared/NoData/NoData";
import Pagination from "../../Shared/Pagination/Pagination";
import CategoryData from "../CategoryData/CategoryData";

export default function CategoriesList() {
  // handle fetch logic
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const [arrayOfPages, setArrayOfPages] = useState([]);

  const [{ name }, setQuery] = useState({
    name: "",
  });
  const getAllCategories = async (pageSize, pageNumber, name) => {
    try {
      const response = await priveteApiInstance.get(
        categories_endpoints.GET_ALL_CATEGORIES,
        {
          params: {
            pageNumber,
            pageSize,
            name,
          },
        }
      );

      setArrayOfPages(
        Array.from(
          { length: response?.data?.totalNumberOfPages },
          (_, i) => i + 1
        )
      );
      setCategoriesList(response?.data?.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllCategories(10, currentPageNumber, name);
  }, [currentPageNumber, name]);

  // handle delete category logic
  const deleteCategory = async (selectedId) => {
    try {
      await priveteApiInstance.delete(
        categories_endpoints.DELETE_CATEGORY(selectedId)
      );
      toast.success("Item is deleted successfully");
      getAllCategories(10, currentPageNumber, name);
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
    deleteCategory(id);
  };

  const getValues = (e) => {
    setQuery((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div>
      <Header
        title="Categories"
        tag="Items"
        description="You can now add your items that any user can order it from the application and you can edit"
      />

      <div className="title d-flex justify-content-between my-3">
        <div className="caption">
          <h3>Categories Table Details</h3>
          <span>You can check details</span>
        </div>
        {/* <button className="btn btn-success my-auto">Add new Category</button> */}
        <CategoryData
          getAllCategories={() => getAllCategories(10, currentPageNumber, name)}
        />
      </div>

      <div className="container-fluid">
        <form onChange={getValues}>
          <div className="form-group row">
            <div className="col-md-12">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text bg-transparent"
                    id="search-addon"
                  >
                    <i className="fa fa-search"></i>
                  </span>
                </div>
                <input
                  name="name"
                  className="form-control"
                  type="text"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Item Name</th>
            <th scope="col">Creation Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        {loading ? (
          <tbody className="text-center">
            <tr>
              <td colSpan="3" className="">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {categoriesList.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <NoData />
                </td>
              </tr>
            ) : (
              categoriesList.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>
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
                          <CategoryData
                            selectedId={category.id}
                            categoryName={category.name}
                            getAllCategories={() =>
                              getAllCategories(10, currentPageNumber, name)
                            }
                          />
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleShow(category.id)}
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
        item="Category"
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
