import API from "./api.service";

export default {
  async tourAttraction(laid) {
    const url = `/tour_attraction/${laid}`;
    return API().get(url);
  },
  async typeDetail(type, cityId) {
    const url = `/typeDetail?type=${type}&ctid=${cityId}`;
    return API().get(url);
  },
};
