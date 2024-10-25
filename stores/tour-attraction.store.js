import { defineStore } from "pinia";
import tourAttractionService from "@/services/tour-attraction.service";

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
          console.log("----> detail", response.data);
          this.tour_attractions = response.data;
        } else {
          this.tour_attractions = {};
          throw new Error("Failed to fetch detail tour");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getTypeDetail(type, cityId) {
      try {
        const response = await tourAttractionService.typeDetail(type, cityId);
        if (response.status === 200 && response.data) {
          this.tourAttractions = response.data;
        } else {
          throw new Error("Failed to fetch type detail");
        }
      } catch (error) {
        console.log("Error in getTypeDetail:", error);
      }
    },

    changeOption(type, optionId) {
      console.log("------>", type, optionId);
    },
  },
});
