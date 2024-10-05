import API from "./api.service";

export default {
  async getBannerMain(params) {
    const url = "/banners/main";
    return API().get(url, { params: params });
  },
};
