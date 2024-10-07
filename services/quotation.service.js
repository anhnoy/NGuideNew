import API from "./api.service";

export default {
  async quotation_login(body) {
    const url = `/login_quo`;
    return API().post(url, body);
  },

  async getQuotationList(params) {
    const url = "/quotations";
    return API().get(url, { params: params });
  },
  async quotation_detail(quo_id) {
    const url = `/quotation/${quo_id}`; // quo_id as part of the path
    return API().get(url);
  },
  async guidetour_list(id) {
    const url = `guide_tour/${id}`
    return API().get(url);
  }
};
