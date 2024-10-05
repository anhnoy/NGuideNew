import API from "./api.service";
export default {
  async getFaq(params) {
    const url = "/faq";
    return API().get(url, { params: params });
  },

  async getFaqLao(params) {
    const url = "/faqLao";
    return API().get(url, { params: params});
  },

  async faqType(){
    const url = "/faqType";
    return API().get(url);
  },

  async faqTypeLao(){
    const url = "/faqTypeLao";
    return API().get(url);
  },


};
