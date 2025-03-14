import axios from "axios";
import { baseURL } from "./apiConfig";

const apiInstance = axios.create({
  baseURL,
});

const priveteApiInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});

export { priveteApiInstance, apiInstance };
