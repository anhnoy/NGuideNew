import { defineStore } from "pinia";
import faqService from "~/services/faq.service";

export const useFaqStore = defineStore("faq", {
  state: () => ({
    faqs: [],
    params: {
      faq_id: null,
      faq_lao_id: null
    },
  }),

  actions: {
    setParams(params) {
      this.params = params;
    },

    async getFaq(faq_id) {
      try {
        const response = await faqService.getFaq(faq_id);
        if (response.status === 200 && response.data.resp) {
          this.faqs = response.data.resp;
          console.log("resp", response.data.resp);
        } else {
          throw new Error("Failed to fetch FAQ or no data found");
        }
      } catch (error) {
        console.error("Faq Error:", error);
      }
    },

    async getFaqLao(faq_lao_id) {
      try {
        const response = await faqService.getFaqLao(faq_lao_id);
        if (response.status === 200 && response.data.resp) {
          this.faqLaos = response.data.resp;
          console.log("resp Laos", response.data.resp);
        } else {
          throw new Error("Failed to fetch faqLao");
        }
      } catch (error) {
        console.error("Faq Lao Error:", error);
      }
    }
  },
});
