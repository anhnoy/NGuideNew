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

    async getBannerMain(params) {
      try {
        const resp = await bannerService.getBannerMain(params);
        if (resp.status === 200) {
          this.banners = resp.data;
        } else {
          console.error("response status:", resp.status);
        }
      } catch (err) {
        console.error("API Error:", err);
      }
    },
  },
});
