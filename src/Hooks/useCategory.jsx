import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { priveteApiInstance } from "../services/api/apiInstance";
import { categories_endpoints } from "../services/api/apiConfig";

export const useCategory = () => {
  // handle fetch logic
  const [categoriesList, setCategoriesList] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await priveteApiInstance.get(
        categories_endpoints.GET_ALL_CATEGORIES(10, 1)
      );

      setCategoriesList(response?.data?.data);
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "light",
      });
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
    deleteCategory(id);
  };

  return {
    categoriesList,
    deleteCategory,
    handleShow,
    handleClose,
    handleCloseAndDelete,
    showModal,
    selectedId,
  };
};
