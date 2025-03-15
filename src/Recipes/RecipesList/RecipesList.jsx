import { useReceipe } from "../../Hooks/useReceipe";
import { imageURL } from "../../services/api/apiConfig";
import Header from "../../Shared/Header/Header";
import DeleteConfirmation from "../../Shared/Model/DeleteConfirmation";

export default function RecipesList() {
  const {
    recipesList,
    handleShow,
    handleClose,
    handleCloseAndDelete,
    showModal,
    selectedId,
  } = useReceipe();

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
        <button className="btn btn-success my-auto">Add new Recipe</button>
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
        <tbody>
          {recipesList.map((recipe) => (
            <tr key={recipe.id}>
              <td>{recipe.name}</td>
              <td>
                <img src={imageURL + recipe.imagePath} width="200px" />
              </td>
              <td>{recipe.price}</td>
              <td>{recipe.description}</td>
              <td>{recipe.tag.name}</td>
              <td>{recipe.category.map((category) => `${category.name}, `)}</td>
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
          ))}
        </tbody>
      </table>

      <DeleteConfirmation
        item="Recipe"
        show={showModal}
        handleClose={handleClose}
        handleCloseAndDelete={() => handleCloseAndDelete(selectedId)}
      />
    </div>
  );
}
