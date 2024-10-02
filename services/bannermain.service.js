import API from "./api.service";

export default {
  async getBannerMain(bc_id) {
    const url = "/banners/main";
    console.log("banner => ", url);
    return API().get(url, { params: { bc_id } });
  },
};
