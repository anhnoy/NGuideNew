import { defineStore } from "pinia";
import tourService from "~/services/tour.service";

export const useTourStore = defineStore("tour", {
  state: () => ({
    tours: [],
    params: {
      at_id: null,
    },
  }),

  actions: {
    setParams(params) {
      this.params = params;
    },
    async getTourAttraction(at_id) {
      try {
        const response = await tourService.getTourAttraction(at_id);
        if (response.status === 200 && response.data.resp) {
          this.tours = response.data.resp;
          console.log("response data tour attraction:", response.data.resp);
        } else {
          throw new Error("failed to fetch tour attraction found");
        }
      } catch (error) {
        console.log("Tour Attraction Error", error);
      }
    },
    async getTourStay(at_id) {
      try {
        const response = await tourService.getTourStay(at_id);
        if (response.status === 200 && response.data.resp) {
          this.tours = response.data.resp;
          console.log("response data tour stay:", response.data.resp);
        } else {
          throw new Error("failed to fetch tour stay found");
        }
      } catch (error) {
        console.log("Tour Stay Error", error);
      }
    },
    async getTourGolf(at_id) {
      try {
        const response = await tourService.getTourGolf(at_id);
        if (response.status === 200 && response.data.resp) {
          this.tours = response.data.resp;
          console.log("response data tour golf:", response.data.resp);
        } else {
          throw new Error("failed to fetch tour golf found");
        }
      } catch (error) {
        console.log("Tour Golf Error", error);
      }
    },

    async getDetailTour(at_id) {
      try {
        const response = await tourService.getDetailTour(at_id);
        if (response.status === 200 && response.data.resp) {
          this.tours = response.data.resp;
        } else {
          throw new Error("failed to fetch detail tour found");
        }
      } catch (error) {
        console.log("Error detail:", error);
      }
    },
  },
});
