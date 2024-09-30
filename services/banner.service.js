import API from "./api.service";

export default {
  async getBanner(bc_id) {
    const url = "/banner";
    console.log("banner => ", url);
    return API().get(url, { params: { bc_id } });
  },
};
