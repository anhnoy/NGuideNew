import API from "./api.service";
export default {
  async getFaq(params) {
    const url = "/faq";
    return API().get(url, { params: params });
  },

  async getFaqLao(params) {
    const url = "/faq/country";
    return API().get(url, { params: params });
  },

  async faqType() {
    const url = "/faqType";
    return API().get(url);
  },

  async faqTypeLao() {
    const url = "/faq/typecountry";
    return API().get(url);
  },

  async faqTypeThai() {
    const url = "/faq/typecountry";
    return API().get(url);
  },
};
