import API from "./api.service";

export default {
  async getMainGroup() {
    const url = "/main_group";
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
  async getPackageList(page = 0, size = 20) {
    const url = `/packages?page=${page}&size=${size}`;
    try {
      const response = await API().get(url);

      console.log("API Response:", response.data);
      console.log(response.status);

      return response.data; // Return the package list data
    } catch (error) {
      console.error("Error fetching package list:", error);
      throw error; // Optionally re-throw the error to handle it elsewhere
    }
  },
  async getPackageDetail(packageId) {
    const url = `/package/${packageId}`;
    return API().get(url);
  },

  async typeDetail(type) {
    const url = `/typeDetail/${type}`;
    console.log("API Response:", url);
    try {
      const response = await API().get(url);
      return response;
    } catch (error) {
      console.error("Error in typeDetail:", error);
      throw error;
    }
  },
};
