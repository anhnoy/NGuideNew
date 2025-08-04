import { defineStore } from "pinia";

export const useApplyCorporationStore = defineStore("applyCorporation", {
  state: () => ({
    reservationName: "",
    position: "",
    startDate: "",
    emailId: "",
    emailDomain: "",
    company: "",
    phone: "",
    callableTime: "",
    additionalRequests: "",
    privacy: false,
  }),

  getters: {
    fullEmail(state) {
      return state.emailDomain === "직접 입력"
        ? state.emailId
        : `${state.emailId}@${state.emailDomain}`;
    },
  },

  actions: {
    resetForm() {
      this.reservationName = "";
      this.position = "";
      this.startDate = "";
      this.emailId = "";
      this.emailDomain = "";
      this.company = "";
      this.phone = "";
      this.callableTime = "";
      this.additionalRequests = "";
      this.privacy = false;
    },
  },
});
