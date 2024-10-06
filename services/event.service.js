import API from "./api.service";

export default {
  async getEvent(params) {
    const url = "/events";
    console.log("Parameters being sent:", params); 
    return API().get(url, { params: params });
  },

  async eventDetail(ev_id) {
    console.log("Event ID being sent:", ev_id);
    const url = `/events/${ev_id}`;
    return API().get(url);
  },
};
