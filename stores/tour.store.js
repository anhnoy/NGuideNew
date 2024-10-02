import { defineStore } from "pinia";
import tourService from "~/services/tour.service";

export const useTourStore = defineStore("tour", {
  state: () => ({
    attractions: [],
    stays: [],
    golfs: [],
    params: {
      at_id: null,
      city_id: null,
    },
  }),

  actions: {
    setParams(at_id, city_id) {
      this.params.at_id = at_id;
      this.params.city_id = city_id;
    },
    async getTourAttraction(at_id, city_id) {
      try {
        const response = await tourService.getTourAttraction(at_id, city_id); 
        if (response.status === 200 && response.data.resp) {
          this.attractions = response.data.resp; 
          console.log("Response data tour attraction:", response.data.resp);
        } else {
          throw new Error("Failed to fetch tour attraction found");
        }
      } catch (error) {
        console.log("Tour Attraction Error:", error.message);
      }
    },
    
    async getTourStay(at_id, city_id) {
      try {
        const response = await tourService.getTourStay(at_id, city_id);
        if (response.status === 200 && response.data.resp) {
          this.stays = response.data.resp; 
          console.log("Response data tour stay:", response.data.resp);
        } else {
          throw new Error("Failed to fetch tour stay found");
        }
      } catch (error) {
        console.log("Tour Stay Error:", error.message);
      }
    },
    
    async getTourGolf(at_id, city_id) {
      try {
        const response = await tourService.getTourGolf(at_id, city_id);
        if (response.status === 200 && response.data.resp) {
          this.golfs = response.data.resp; 
          console.log("Response data tour golf:", response.data.resp);
        } else {
          throw new Error("Failed to fetch tour golf found");
        }
      } catch (error) {
        console.log("Tour Golf Error:", error.message);
      }
    },

    async getDetailTour(at_id, city_id) {
      try {
        const response = await tourService.getDetailTour(at_id, city_id);
        console.log("......", at_id);
        console.log("Full response object:", response.data);
        if (response.status === 200 && response.data.resp) {
          this.tours = response.data.resp;
          return response.data;
        } else {
          throw new Error("Failed to fetch detail tour");
        }
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    },
    async getDetailAddress(at_id, city_id) {
      try {
        const response = await tourService.getDetailAddress(at_id, city_id);
        console.log("Response data address:", response.data);
        if (response.status === 200 && response.data.resp) {
          this.tours = response.data.resp;
        } else {
          throw new Error("Failed to fetch detail address tour");
        }
      } catch (error) {
        console.error("Error fetching address detail:", error);
      }
    },
  },
});
