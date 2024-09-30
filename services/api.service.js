import axios from "axios";

const BASE_URL = import.meta.env.VITE_ENV_POINT_URL;

export default () => {
  const baseurl = { baseURL: BASE_URL };
  return axios.create(baseurl);
};
