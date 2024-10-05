import API from "./api.service";

export default {
  async getEvent(params) {
    const url = "/events";
    return API().get(url, { params: params });
  },

  async eventDetail(ev_id) {
    const url = `/events/${ev_id}`;
    console.log('id', url)
    return API().get(url);
  },
};
