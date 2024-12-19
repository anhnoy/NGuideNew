import API from "./api.service";

export default {
  async getMainGroup() {
    const url = "/main_group";
    return API().get(url);
  },
  async getTourPlace(cityId, type, limit = 9) {
    const url = `/tour_destination?city_id=${cityId}&type=${type}&page=0&size=${limit}`;
    return API().get(url);
  },
  async createInform(data) {
    const url = "/createInform";
    try {
      const response = await API().post(url, data);
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error("Error creating inform:", error);
      throw error; // Optionally re-throw the error to handle it elsewhere
    }
  },

  async createEasyReq(data) {
    try {
      const url = "/createInform/easy_req";
      const response = await API().post(url, data);
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error("Exception occurred while creating easy quotation", error);
      throw error;
    }
  },
  async getToken() {
    try {
      const url = "/tokenRequest";
      const response = await API().get(url);
      return response.data;
    } catch (error) {
      console.error("Exception occurred while getting token", error);
      throw error;
    }
  },
};
