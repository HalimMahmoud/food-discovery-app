import { useEffect, useState } from "react";
import { favs_endpoints, imageURL } from "../services/api/apiConfig";
import { privateApiInstance } from "../services/api/apiInstance";
import { toast } from "react-toastify";
import NoData from "../Shared/NoData/NoData";
import DeleteConfirmation from "../Shared/Modal/DeleteConfirmation";
import NoDataImg from "../assets/Group 48102290.png";
import PageHeader from "../Shared/PageHeader/PageHeader";

export default function FavoriteList() {
  const [userRecipes, setUserRecipes] = useState([]);

  const getAllUserFavorites = async () => {
    try {
      const response = await privateApiInstance.get(
        favs_endpoints.GET_ALL_FAVS
      );
      setUserRecipes(response.data.data);
      //   toast.success("Item is added to favorite successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getAllUserFavorites();
  }, []);

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
    deleteUserRecipe(id);
  };

  const deleteUserRecipe = async (selectedId) => {
    try {
      await privateApiInstance.delete(favs_endpoints.DELET_FAV(selectedId));
      toast.success("Item is deleted successfully");
      getAllUserFavorites();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div>
      <div className="">
        <PageHeader
          title="Favorites"
          tag="Items"
          description="You can now add your items that any user can order it from the application and you can edit"
        />

        <div className="container-fluid mt-2">
          {userRecipes.length === 0 ? (
            <NoData />
          ) : (
            <div className="row">
              {userRecipes?.map((userRecipe) => (
                <div
                  className="col-md-4 border rounded py-3"
                  key={userRecipe.id}
                >
                  <img
                    className="w-100"
                    src={
                      userRecipe.recipe.imagePath
                        ? imageURL + userRecipe.recipe.imagePath
                        : NoDataImg
                    }
                  />
                  <h3>{userRecipe.recipe.name}</h3>
                  <p>{userRecipe.recipe.description}</p>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleShow(userRecipe.id)}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmation
        item="Recipe"
        show={showModal}
        handleClose={handleClose}
        handleCloseAndDelete={() => handleCloseAndDelete(selectedId)}
      />
    </div>
  );
}
