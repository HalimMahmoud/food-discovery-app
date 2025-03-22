import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { recipeDataSehemaValidation } from "../../services/vaildators";
import { priveteApiInstance } from "../../services/api/apiInstance";
import {
  categories_endpoints,
  recipes_endpoints,
  tags_endpoints,
} from "../../services/api/apiConfig";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";

export default function RecipeData() {
  const formRef = useRef();

  const navigate = useNavigate();
  const params = useParams();
  const onNavigate = () => {
    navigate("/dashboard/recipes");
  };
  const [
    { name, description, price, imagePath, category, tag },
    setRecipeData,
  ] = useState({});
  const getRecipeData = async (id) => {
    const response = await priveteApiInstance.get(
      recipes_endpoints.GET_RECIPE(id)
    );
    console.log(category, tag);
    setRecipeData(response.data);
  };

  useEffect(() => {
    if (params.id) {
      getRecipeData(params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);
  const {
    register,
    // reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    values: {
      name,
      description,
      price,
      recipeImage: imagePath,
      categoryIds: category?.map((category) => category.id),
      tagId: tag?.id,
    },
    resolver: yupResolver(recipeDataSehemaValidation),
  });
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    getAllCategories();
    getAllTags();
  }, []);
  const onSubmit = async () => {
    const formData = new FormData(formRef.current);

    try {
      if (params.id) {
        await priveteApiInstance.put(
          recipes_endpoints.UPDATE_RECIPE(params.id),
          formData,

          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Recipe is edited successfully");
      } else {
        const response = await priveteApiInstance.post(
          recipes_endpoints.ADD_RECIPE,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response);
        toast.success("Recipe is added successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="container-fluid header my-3">
        <div className="row h-100 rounded-4 subheader">
          <div className="col-md-8 h-100">
            <div className="caption d-flex align-items-center h-100">
              <div className="m-5">
                <div className="d-inline">
                  <h3 className="d-inline">
                    Fill the <span className="text-success">Recipes </span>!
                  </h3>
                </div>

                <p className="w-75">
                  you can now fill the meals easily using the table and form ,
                  click here and sill it with the table !
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 h-100 d-flex justify-content-end  align-items-center">
            <button
              className="btn btn-success py-2 px-5 m-5"
              onClick={onNavigate}
            >
              All Recipes
              <i className="fa fa-arrow-right mx-2"></i>
            </button>
          </div>
        </div>
      </div>

      <form
        className="container"
        role="form"
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
      >
        {/* <img className="w-50 my-5" src={ModalImg} /> */}
        <h5>{params.id ? "Edit recipe" : "Add new recipe"}</h5>

        <div className="input-group mb-3">
          <input
            {...register("name")}
            type="text"
            className="form-control"
            placeholder="Name"
          />
        </div>
        {errors.name && (
          <div className="pb-3 text-danger">{errors.name.message}</div>
        )}

        <div className="input-group mb-3">
          <input
            {...register("description")}
            type="text"
            className="form-control"
            placeholder="Description"
          />
        </div>
        {errors.description && (
          <div className="pb-3 text-danger">{errors.description.message}</div>
        )}

        <div className="input-group mb-3">
          <input
            {...register("price")}
            type="number"
            className="form-control"
            placeholder="Price"
          />
        </div>
        {errors.price && (
          <div className="pb-3 text-danger">{errors.price.message}</div>
        )}

        <div className="form-group mb-3">
          <select {...register("tagId")} className="form-control form-select">
            <option value="">Tag</option>
            {tags?.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        {errors.tagId && (
          <div className="pb-3 text-danger">{errors.tagId.message}</div>
        )}

        <div className="input-group mb-3">
          <input
            {...register("recipeImage")}
            type="file"
            className="form-control"
          />
        </div>
        {errors.recipeImage && (
          <div className="pb-3 text-danger">{errors.recipeImage.message}</div>
        )}

        <div className="form-group mb-3">
          <select
            {...register("categoriesIds")}
            className="form-control form-select"
          >
            <option value="">Category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {errors.categoriesIds && (
          <div className="pb-3 text-danger">{errors.categoriesIds.message}</div>
        )}
        <button
          type="submit"
          className="btn btn-success"
          disabled={isSubmitting}
        >
          {isSubmitting ? <i className="fa fa-spinner"></i> : "Save"}
        </button>
      </form>
    </div>
  );
}
