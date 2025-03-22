export const baseURL = "https://upskilling-egypt.com:3006/api/v1/";
export const imageURL = "https://upskilling-egypt.com:3006/";

export const users_endpoints = {
  LOGIN: `/Users/Login`,
  REGISTER: `/Users/Register`,
  VERIFY: `/Users/Verify`,
  RESET_REQUEST: `/Users/Reset/Request`,
  RESET: `/Users/Reset`,
  GET_USER: (id) => `/Users/${id}`,
  GET_ALL_USERS: `/Users/`,
  DELETE_USER: (id) => `/Users/${id}`,
  CHANGE_PASSWORD: `/Users/ChangePassword`,
};

export const categories_endpoints = {
  GET_ALL_CATEGORIES: `/Category/`,
  UPDATE_CATEGORY: (id) => `/Category/${id}`,
  DELETE_CATEGORY: (id) => `/Category/${id}`,
  ADD_CATEGORY: `/Category`,
};

export const recipes_endpoints = {
  GET_ALL_RECIPES: `/Recipe/`,
  GET_RECIPE: (id) => `/Recipe/${id}`,
  DELETE_RECIPE: (id) => `/Recipe/${id}`,
  UPDATE_RECIPE: (id) => `/Recipe/${id}`,
  ADD_RECIPE: `/Recipe`,
};

export const tags_endpoints = {
  GET_ALL_TAGS: `/Tag/`,
};

export const favs_endpoints = {
  GET_ALL_FAVS: `/userRecipe/`,
  ADD_FAV: `/userRecipe/`,
  DELET_FAV: (id) => `/userRecipe/${id}`,
};
