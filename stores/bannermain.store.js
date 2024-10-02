import { defineStore } from "pinia";
import bannerMainService from "~/services/bannermain.service";

export const useBannerMainStore = defineStore("bannerMain", {
  state: () => ({
    bannerMains: [],
    params: {
      bc_id: null,
    },
  }),

  actions: {
    setParams(params) {
      this.params = params;
    },

    async getBannerMain(bc_id) {
      try {
        const response = await bannerMainService.getBannerMain(bc_id);
        if (response.status === 200 && response.data.resp) {
          this.bannerMains = response.data.resp;
          console.log("banner main data:", response.data.resp);
        } else {
          throw new Error("Failed to fetch banner main");
        }
      } catch (error) {
        console.log("banner main error =>", error);
      }
    },
  },
});
