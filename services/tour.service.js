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

  async getFilterCity(params) {
    const url = "/tour_attraction/filter";
    return API().get(url, { params: params});
  },

  async getCountry() {
    const url = "/country";
    return API().get(url);
  },

  async getCity(cid) {
    const url = "/city";
    return API().get(url, { params: { cid } });
  },
};
