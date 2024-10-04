import { defineStore } from "pinia";
import tourService from "~/services/tour.service";

export const useTourStore = defineStore("tour", {
  state: () => ({
    currentId: null,
    attractions: [],
    filterCity: [],
    params: {
      at_id: null,
      city_id: null,
    },
    tour_attraction: {},
    totalAttraction: 0,
    totalCity: 0,
  }),

  actions: {
    setParams(params) {
      this.params = params;
    },
    setCurrentId(id) {
      this.currentId = id;
    },

    async getTourAttraction(params) {
      try {
        const response = await tourService.getTourAttraction(params);
        if (response.status === 200 && response.data) {
          const data = response.data.rows;
          this.totalAttraction = response.data.count;

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

    async getFilterCity(params) {
      try {
        const response = await tourService.getFilterCity(params);
        if (response.status === 200 && response.data) {
          this.data = response.data.rows;
          this.totalCity = response.data.count;

          this.data.forEach((img) => {
            let index = img.tourism_attr_imgs.findIndex(
              (it) => it.is_profile === "Y"
            );
            index = index === -1 ? 0 : index;
            const profile = img.tourism_attr_imgs[index];
            img.image_path =
              profile.image_path === "" ? profile.key : profile.image_path;
          });
          this.filterCity = this.data;
        } else {
          throw new Error("Failed to fetch tour filter city");
        }
      } catch (error) {
        console.log("Tour Filter Error:", error);
      }
    },
  },
});
