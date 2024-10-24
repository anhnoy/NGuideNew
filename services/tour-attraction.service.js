import API from "./api.service";

export default {
  async tourAttraction(laid) {
    const url = `/tour_attraction/${laid}`;
    return API().get(url);
  },

  async attractionType() {
    const url = "/attractionType";
    return API().get(url);
  },
};
