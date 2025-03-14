import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { priveteApiInstance } from "../services/api/apiInstance";
import { recipes_endpoints } from "../services/api/apiConfig";

export const useReceipe = () => {
  // handle fetch logic
  const [recipesList, setRecipesList] = useState([]);

  const getAllRecipes = async () => {
    try {
      const response = await priveteApiInstance.get(
        recipes_endpoints.GET_ALL_RECIPES(10, 1)
      );

      setRecipesList(response?.data?.data);
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "light",
      });
    }
  };
  useEffect(() => {
    getAllRecipes();
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

  return {
    recipesList,
    deleteRecipe,
    handleShow,
    handleClose,
    handleCloseAndDelete,
    showModal,
    selectedId,
  };
};
