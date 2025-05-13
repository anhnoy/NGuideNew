import API from "./api.service";

export default {
  async sendOTP(data) {
    const url = "/sendOTP";
    try {
      const response = await API().post(url, data);
      return response;
    } catch (error) {
      console.error("Error send OTP:", error);
      throw error;
    }
  },

  async verifyOTP(data) {
    const url = `/verifyOTP`;
    try {
      const response = await API().post(url, data);
      return response;
    } catch (error) {
      console.error("Error verify OTP:", error);
      throw error;
    }
  },
};
