import axios from "axios";
const baseURL = "https://upskilling-egypt.com:3006/api/v1/";

export const axiosInstance = axios.create({
  baseURL,
  //   headers: { "X-Custom-Header": "foobar" },
});

export const axiosInstanceWithToken = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});

export const Users_URLS = {
  LOGIN: `/Users/Login`,
  REGISTER: `/Users/Register`,
  VERFIY_PASSWORD: `/Users/Verify`,
  FORGET_PASSWORD: `/Users/Reset/Request`,
  RESET_PASSWORD: `/Users/Reset`,
  GET_USER: (id) => `/Users/${id}`,
};

export const Categories_URLS = {
  GET_ALL_CATEGORIES: (pageSize, pageNumber) =>
    `/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
};
