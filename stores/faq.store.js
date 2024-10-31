import { defineStore } from "pinia";
import faqService from "~/services/faq.service";

export const useFaqStore = defineStore("faq", {
  state: () => ({
    faqs: [],
    faqLaos: [],
    params: {
      faq_id: null,
      faq_lao_id: null,
    },
    totalFaq: 0,
    totalFaqLao: 0,
  }),

  actions: {
    setParams(params) {
      this.params = params;
    },

    async getFaq(params) {
      try {
        const response = await faqService.getFaq(params);
        if (response.status === 200 && response.data.resp) {
          this.faqs = response.data.resp.rows;
          this.totalFaq = response.data.resp.count;
        } else {
          throw new Error("Failed to fetch FAQ or no data found");
        }
      } catch (error) {
        console.error("Faq Error:", error);
      }
    },

    async getFaqLao(params) {
      try {
        const response = await faqService.getFaqLao(params);
        if (response.status === 200 && response.data.resp) {
          this.faqLaos = response.data.resp.rows;
          this.totalFaqLao = response.data.resp.count;
        } else {
          throw new Error("Failed to fetch FAQLao or no data found");
        }
      } catch (error) {
        console.error("Faq Lao Error:", error.message);
      }
    },

    async faqType() {
      try {
        const response = await faqService.faqType();
        if (response.status === 200) {
          this.faqTypes = response.data;
        } else {
          console.error("response status:", response.status);
        }
      } catch (error) {
        console.error("Faq Type Error:", error);
      }
    },

    async faqTypeLao() {
      try {
        const response = await faqService.faqTypeLao();
        if (response.status === 200) {
          this.faqTypeLaos = response.data;
        } else {
          throw new Error("Failed to fetch faqTypeLao");
        }
      } catch (error) {
        console.error("Faq Type Lao Error:", error);
      }
    },
  },
});
