import API from "./api.service";

export default {
  async quotation_login(body) {
    const url = `/auth/login`;
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
  async confirmQuotation(quo_id) {
    const url = `/confirmQuote?quo_id=${quo_id}`;
    return API().put(url);
  },
  async addComment(body) {
    const url = `/quote_comment`;
    return API().post(url, body);
  },
};
