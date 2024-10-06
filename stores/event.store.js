import { defineStore } from "pinia";
import eventService from "~/services/event.service";

export const useEventStore = defineStore("event", {
  state: () => ({
    events: [],
    params: {
      page: null,
      size: null,
    },
    totalEvent: 0,
    eventDetail: {},
  }),
  actions: {
    setParams(params) {
      this.params = params;
    },

    async getEvent(params) {
      try {
        const response = await eventService.getEvent(params);
        if (response.status === 200 && response.data.resp) {
          this.events = response.data.resp.rows;
          this.totalEvent = response.data.resp.count;
        } else {
          throw new Error("Failed to fetch event");
        }
      } catch (error) {
        console.log("Event Error:", error);
      }
    },

    async eventDetail(ev_id) {
      try {
        const response = await eventService.eventDetail(ev_id);
        const data = response.data;
        this.eventDetail = data;
      } catch (error) {
        console.log("Event Detail Error:", error);
      }
    },
  },
});
