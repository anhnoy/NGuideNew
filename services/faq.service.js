import API from "./api.service";
export default {
  async getFaq(faq_id) {
    const url = "/faq";
    return API().get(url, { params: { faq_id } });
  },

  async getFaqLao(faq_lao_id) {
    const url = "/faqLao";
    return API().get(url, { params: { faq_lao_id } });
  },
};
