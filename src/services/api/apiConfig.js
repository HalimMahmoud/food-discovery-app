export const baseURL = "https://upskilling-egypt.com:3006/api/v1/";
export const imageURL = "https://upskilling-egypt.com:3006/";

export const users_endpoints = {
  LOGIN: `/Users/Login`,
  REGISTER: `/Users/Register`,
  VERIFY: `/Users/Verify`,
  RESET_REQUEST: `/Users/Reset/Request`,
  RESET: `/Users/Reset`,
  GET_USER: (id) => `/Users/${id}`,
};

export const categories_endpoints = {
  GET_ALL_CATEGORIES: (pageSize, pageNumber) =>
    `/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,

  DELETE_CATEGORY: (id) => `/Category/${id}`,
};

export const recipes_endpoints = {
  GET_ALL_RECIPES: (pageSize, pageNumber) =>
    `/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,

  DELETE_RECIPE: (id) => `/Recipe/${id}`,
};
