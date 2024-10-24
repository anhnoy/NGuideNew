import { defineStore } from "pinia";
import tourAttractionService from "@/services/tour-attraction.service";

export const useTourAttractionStore = defineStore("tourAttraction", {
  state: () => ({
    tourAttractions: [],
    tour_attractions: {},
    currentId: null,
  }),

  actions: {
    async getTourAttraction(laid) {
      try {
        const response = await tourAttractionService.tourAttraction(laid);
        if (response.status === 200 && response.data) {
          this.tour_attractions = response.data;
        } else {
          throw new Error("Failed to fetch detail tour");
        }
      } catch (error) {
        console.log(error);
      }
    },

    clearData() {
      this.tour_attractions = {};
    },

    async getAttractionType() {
      try {
        const resp = await tourAttractionService.attractionType();
        if (resp.status === 200 && resp.data) {
          this.tourAttractions = resp.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
