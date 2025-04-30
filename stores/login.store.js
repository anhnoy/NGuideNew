import { defineStore } from "pinia";
import quotationService from "~/services/quotation.service";

export const useQuotationStore = defineStore("quotation", {
  state: () => ({
    fecthListItems: [],
    totalQuote: 0,
  }),
  actions: {
    setParams(params) {
      this.params = params;
    },

    async getAllQuotationByPhone(req_group_Name, phone) {
      try {
        const response = await quotationService.getQuotationAll(req_group_Name, phone);
        if (response.status === 200) {
          this.fecthListItems = response.data.rows;
          this.totalQuote = response.data.count;
          return response;
        } else {
          throw new Error("Failed to fetch Quotation All");
        }
      } catch (error) {
        console.log("Quotation Allt Error:", error);
      }
    },
  },
});
