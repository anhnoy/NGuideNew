import API from "./api.service";

export default {
  async getRegion(params) {
    const url = "/banners/main";
    return API().get(url, { params: params });
  },

  async getFight() {
    const url = "/flight-ticket-status/list";
    return API().get(url);
  },

  async getCountry() {
    const url = "/country";
    return API().get(url);
  },
  async getCityByRegion(regionId) {
    const url = `/citys?region=${regionId}`;
    return API().get(url);
  },
  async getHotelList() {
    const url = "/hotel/list";
    return API().get(url);
  },
  async getRoomType() {
    const url = "/room";
    return API().get(url);
  },
  async getIncludedFood() {
    const url = "/req-inc-food/list";
    return API().get(url);
  },
  async getAdditionOptions() {
    const url = "/additionOption";
    return API().get(url);
  },
  async getCityByRegion(regionId) {
  const url = `/citys?region=${regionId}`;
  return API().get(url);
}

};
