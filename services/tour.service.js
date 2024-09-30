import API from "./api.service";

export default {
  async getTourAttraction(at_id) {
    const url = "/tour_attraction";
    return API().get(url, { params: { at_id } });
  },

  async getTourStay(at_id) {
    const url = "/tour_stay";
    return API().get(url, { params: { at_id } });
  },

  async getTourGolf(at_id) {
    const url = "/tour_golf";
    return API().get(url, { params: { at_id } });
  },

  async getDetailTour(at_id) {
    const url = "/tour_attration/Introduction";
    return API().get(url, { params: { at_id } });
  },

  async getTourAddress(at_id) {
    const url = "/tour_attration/address";
    return API().get(url, { params: { at_id } });
  },
};
