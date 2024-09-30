import { defineStore } from "pinia";
import bannerService from "~/services/banner.service";

export const useBannerStore = defineStore("banner", {
  state: () => ({
    banners: [],
    params: {
      bc_id: null,
    },
  }),

  actions: {
    setParams(params) {
      this.params = params;
    },

    async getBanner(bc_id) {
      try {
        const response = await bannerService.getBanner(bc_id);
        if (response.status === 200 && response.data.resp) {
          this.banners = response.data.resp;
          console.log("banner data:", response.data.resp);
        } else {
          throw new Error("Failed to fetch banner");
        }
      } catch (error) {
        console.log("banner error =>", error);
      }
    },
  },
});
