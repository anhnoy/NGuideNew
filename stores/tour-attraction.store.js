import { defineStore } from "pinia";
import tourAttractionService from "@/services/tour-attraction.service";
import logger from "~/services/logger.service";

export const useTourAttractionStore = defineStore("tourAttraction", {
  state: () => ({
    tourAttractions: [],
    tour_attractions: {},
    currentId: null,
  }),

  actions: {
    clearData() {
      this.tour_attractions = {};
      this.currentId = null;
    },

    async getTourAttraction(laid) {
      try {
        const response = await tourAttractionService.tourAttraction(laid);
        if (response.status === 200 && response.data) {
          this.tour_attractions = response.data;
        } else {
          this.tour_attractions = {};
          throw new Error("Failed to fetch detail tour");
        }
      } catch (error) {
        logger.error("Error fetching tour attraction:", error);
      }
    },

    async getTypeDetail(type, cityId) {
      try {
        const response = await tourAttractionService.typeDetail(type, cityId);
        if (response.status === 200 && response.data) {
          this.tourAttractions = response.data;
        } else {
           this.tour_attractions = {};
          throw new Error("Failed to fetch type detail");
        }
      } catch (error) {
        logger.error("Error in getTypeDetail:", error);
      }
    },

    changeOption(type, optionId) {
      logger.debug("Changing option:", { type, optionId });
    },
  },
});
