import { useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";
import AddEditCategory from "../../Shared/Model/AddEditCategory";
import AddCategory from "../../Shared/Model/AddEditCategory";
import { priveteApiInstance } from "../../services/api/apiInstance";
import { categories_endpoints } from "../../services/api/apiConfig";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../Shared/Model/DeleteConfirmation";
// import DeleteConfirmation from "../../Shared/Model/DeleteConfirmation";

export default function CategoriesList() {
  // handle fetch logic
  const [categoriesList, setCategoriesList] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await priveteApiInstance.get(
        categories_endpoints.GET_ALL_CATEGORIES(10, 1)
      );
      setCategoriesList([...response.data.data]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // handle delete category logic
  const deleteCategory = async (selectedId) => {
    try {
      await priveteApiInstance.delete(
        categories_endpoints.DELETE_CATEGORY(selectedId)
      );
      toast.success("Item is deleted successfully");
      getAllCategories();
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
        <AddCategory />
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Item Name</th>
            <th scope="col">Creation Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoriesList.map((category) => (
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
                      <AddEditCategory
                        selectedId={category.id}
                        categoryName={category.name}
                        getAllCategories={() => getAllCategories()}
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
          ))}
        </tbody>
      </table>

      <DeleteConfirmation
        item="Category"
        show={showModal}
        handleClose={handleClose}
        handleCloseAndDelete={() => handleCloseAndDelete(selectedId)}
      />
    </div>
  );
}
