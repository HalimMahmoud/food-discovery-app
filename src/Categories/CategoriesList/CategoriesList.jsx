import { useEffect, useState } from "react";
import { axiosInstanceWithToken, Categories_URLS } from "../../service/utils";
import Header from "../../Shared/Header/Header";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await axiosInstanceWithToken.get(
        Categories_URLS.GET_ALL_CATEGORIES(10, 1)
      );

      console.log(response.data.data);

      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div>
      <Header
        title="Categories Item"
        description="You can now add your items that any user can order it from the application and you can edit"
      />

      <div className="title bg-info d-flex justify-content-between">
        <div className="caption">
          <h3>Categories Details</h3>
          <span>You can check details</span>
        </div>
        <button className="btn btn-success">Add new Category</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categoriesList.map((category) => (
            <tr key={category.id}>
              <th>{category.id}</th>
              <td>{category.name}</td>
              <td>{category.creationDate}</td>
              <td>
                <i className="fa fa-trash text-danger m-2"></i>
                <i className="fa fa-edit text-warning m-2"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
