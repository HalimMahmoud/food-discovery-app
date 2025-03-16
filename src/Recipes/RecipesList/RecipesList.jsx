import { useEffect, useState } from "react";
import {
  categories_endpoints,
  imageURL,
  recipes_endpoints,
  tags_endpoints,
} from "../../services/api/apiConfig";
import Header from "../../Shared/Header/Header";
import DeleteConfirmation from "../../Shared/Modal/DeleteConfirmation";
import { priveteApiInstance } from "../../services/api/apiInstance";
import { toast } from "react-toastify";
import Pagination from "../../Shared/Pagination/Pagination";
import NoData from "../../Shared/NoData/NoData";
import { useNavigate } from "react-router-dom";

export default function RecipesList() {
  const navigate = useNavigate();
  // handle fetch logic
  const [recipesList, setRecipesList] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const [{ name, tagId, categoryId }, setQuery] = useState({
    name: "",
    tagId: "",
    categoryId: "",
  });
  const getAllCategories = async () => {
    try {
      const response = await priveteApiInstance.get(
        categories_endpoints.GET_ALL_CATEGORIES
      );

      setCategories(response?.data?.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getAllTags = async () => {
    try {
      const response = await priveteApiInstance.get(
        tags_endpoints.GET_ALL_TAGS
      );
      setTags(response?.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const getAllRecipes = async (
    pageSize,
    pageNumber,
    name,
    tagId,
    categoryId
  ) => {
    try {
      const response = await priveteApiInstance.get(
        recipes_endpoints.GET_ALL_RECIPES,
        {
          params: {
            pageNumber,
            pageSize,
            name,
            tagId,
            categoryId,
          },
        }
      );

      setRecipesList(response?.data?.data);
      setLoading(false);
      setArrayOfPages(
        Array.from(
          { length: response?.data?.totalNumberOfPages },
          (_, i) => i + 1
        )
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getAllRecipes(10, currentPageNumber, name, tagId, categoryId);
  }, [currentPageNumber, name, tagId, categoryId]);

  useEffect(() => {
    getAllCategories();
    getAllTags();
  }, []);
  // handle delete category logic
  const deleteRecipe = async (selectedId) => {
    try {
      await priveteApiInstance.delete(
        recipes_endpoints.DELETE_RECIPE(selectedId)
      );
      toast.success("Item is deleted successfully");
      getAllRecipes();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  // confirmation model before delete
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState();

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
    deleteRecipe(id);
  };

  const getValues = (e) => {
    setQuery((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [arrayOfPages, setArrayOfPages] = useState([]);

  return (
    <div className="">
      <Header
        title="Recipes"
        tag="Items"
        description="You can now add your items that any user can order it from the application and you can edit"
      />
      <div className="title d-flex justify-content-between my-3">
        <div className="caption">
          <h3>Recipes Table Details</h3>
          <span>You can check details</span>
        </div>
        <button
          className="btn btn-success my-auto"
          onClick={() => navigate("new")}
        >
          Add new Recipe
        </button>
      </div>

      <div className="container-fluid">
        <form onChange={getValues}>
          <div className="form-group row">
            <div className="col-md-6">
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

            <div className="form-group col-md-3">
              <select name="tagId" className="form-control form-select">
                <option value="">Tag</option>
                {tags?.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group col-md-3">
              <select name="categoryId" className="form-control form-select">
                <option value="">Category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Item Name</th>
            <th scope="col">Image</th>

            <th scope="col">Price</th>

            <th scope="col">Description</th>

            <th scope="col">Tag</th>
            <th scope="col">Category</th>

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
            {recipesList.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <NoData />
                </td>
              </tr>
            ) : (
              recipesList.map((recipe) => (
                <tr key={recipe.id}>
                  <td>{recipe.name}</td>
                  <td>
                    <img src={imageURL + recipe.imagePath} width="200px" />
                  </td>
                  <td>{recipe.price} $</td>
                  <td>{recipe.description}</td>
                  <td>{recipe.tag.name}</td>
                  <td>
                    {recipe.category.map((category) => `${category.name}, `)}
                  </td>
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
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => navigate(`${recipe.id}/edit`)}
                          >
                            <i className="fa fa-edit text-success m-2"></i>
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleShow(recipe.id)}
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
        item="Recipe"
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
