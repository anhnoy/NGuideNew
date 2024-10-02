import API from "./api.service";

export default {
  async getTourAttraction(params) {
    const url = "/tour_attraction";
    return API().get(url, { params: params });
  },
  async getDetailTour(laid) {
    const url = `/tour_attraction/Introduction/${laid}`;
    return API().get(url);
  },

  async getTourFilter(at_id, city_id) {
    const url = "/tour_attraction/filter";
    return API().get(url, { params: { at_id, city_id } });
  },
};
