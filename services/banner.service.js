import API from "./api.service";

export default {
  async getBanner(params) {
    const url = "/banners/main";
    return API().get(url, { params: params });
  },
};
