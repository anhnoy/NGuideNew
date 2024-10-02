import { defineStore } from "pinia";
import tourService from "~/services/tour.service";

export const useTourStore = defineStore("tour", {
  state: () => ({
    currentId: null,
    attractions: [],
    params: {
      at_id: null,
      city_id: null,
    },
    tour_attraction: {},
  }),

  actions: {
    setParams(params) {
      this.params = params;
    },
    resetAttractions() {
      this.attractions = [];
    },
    setCurrentId(id) {
      this.currentId = id;
    },

    async getTourAttraction(params) {
      try {
        const response = await tourService.getTourAttraction(params);
        if (response.status === 200 && response.data.resp) {
          const data = response.data.resp;

          data.forEach((ele) => {
            let indx = ele.tourism_attr_imgs.findIndex(
              (it) => it.is_profile === "Y"
            );

            indx = indx === -1 ? 0 : indx;
            const profileImage = ele.tourism_attr_imgs[indx];
            ele.image_path =
              profileImage.image_path === ""
                ? profileImage.key
                : profileImage.image_path;
          });
          this.attractions = data;
        } else {
          throw new Error("Failed to fetch tour attraction found");
        }
      } catch (error) {
        console.log("Tour Attraction Error:", error.message);
      }
    },

    async getDetailTour(laid) {
      try {
        const response = await tourService.getDetailTour(laid);
        console.log("Full response object:", response.data);
        if (response.status === 200 && response.data.resp) {
          this.tour_attraction = response.data.resp;
          return response.data;
        } else {
          throw new Error("Failed to fetch detail tour");
        }
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    },

    async getTourFilter(at_id, city_id) {
      try {
        const response = await tourService.getTourFilter(at_id, city_id);
      } catch (error) {
        console.log("Tour Filter Error:", error);
      }
    },
  },
});
