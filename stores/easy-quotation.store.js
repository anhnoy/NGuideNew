import { defineStore } from "pinia";
import { destinationModel } from "@/models/destinationModel"; // Adjust this path as needed

export const useEasyQuotationStore = defineStore("easyQuotation", {
  state: () => ({
    EasyQuotation: {
      selectedDestination: null,
      selectedDestinationIcon: null,
      selectedDestinationLabel: "",
      selectedThemes: [],
      selectedThemeLabel: [],
      startDate: null,
      endDate: null,
      selectedDeparture: "",
      selectedArrival: "",
      selectReq_adults: "0",
      selectReq_kids: "0",
      selectReq_infants: "0",
      selectedOption: "",
      req_bid: 100,
      req_bid_end: 100,
      trip_req: [],
      req_group_name: "",
      reservationName: "",
      email: "",
      phone: "",
      secretCode: "",
      secretCodeConfirm: "",
      additionalInfo: "",
      destinationRequest: destinationModel(),
      hasPlaceToVisit: "",
      selectedCity: "4",
      selectedButton: null,
      selectedPlaces: [],
      selectedPackageId: null,
    },
  }),
  actions: {
    toggleSelectedTheme(th_id) {
      const index = this.EasyQuotation.selectedThemes.findIndex(
        (theme) => theme.th_id === th_id
      );
      if (index !== -1) {
        this.EasyQuotation.selectedThemes.splice(index, 1);
      } else {
        this.EasyQuotation.selectedThemes.push({ th_id });
      }
    },
    toggleTripReq(laid, land_name) {
      const index = this.EasyQuotation.trip_req.findIndex(
        (trip) => trip.laid === laid
      );
      if (index !== -1) {
        this.EasyQuotation.trip_req.splice(index, 1); // Remove if already selected
      } else {
        this.EasyQuotation.trip_req.push({ laid, land_name }); // Add if not selected
      }
    },
    clearSelection() {
      this.EasyQuotation = {
        selectedDestination: null,
        selectedDestinationIcon: null,
        selectedDestinationLabel: "",
        selectedThemes: [],
        selectedThemeLabel: [],
        selectReq_adults: "0",
        selectReq_kids: "0",
        selectReq_infants: "0",
        startDate: null,
        endDate: null,
        selectedDeparture: "",
        selectedArrival: "",
        selectedOption: "",
        req_bid: 100,
        req_bid_end: 100,
        trip_req: [],
        req_group_name: "",
        reservationName: "",
        email: "",
        phone: "",
        secretCode: "",
        secretCodeConfirm: "",
        additionalInfo: "",
        destinationRequest: destinationModel(),
        hasPlaceToVisit: false,
        selectedCity: null,
        PackageId: null,
      };
    },
    setSelectedDestination(destination) {
      this.EasyQuotation.selectedDestination = destination;
    },
    clearDestination() {
      this.EasyQuotation.selectedDestination = null;
    },
    setStartDate(date) {
      this.EasyQuotation.startDate = date;
    },
    setEndDate(date) {
      this.EasyQuotation.endDate = date;
    },
    setSelectedDeparture(time) {
      this.EasyQuotation.selectedDeparture = time;
    },
    setSelectedArrival(time) {
      this.EasyQuotation.selectedArrival = time;
    },
    setSelectedOption(option) {
      this.EasyQuotation.selectedOption = option;
    },
    setBudgetRange(start, end) {
      this.EasyQuotation.req_bid = start;
      this.EasyQuotation.req_bid_end = end;
    },
  
    setReq_group_name(group) {
      this.EasyQuotation.req_group_name = group;
    },
    setReservationName(name) {
      this.EasyQuotation.reservationName = name;
    },
    setEmail(email) {
      this.EasyQuotation.email = email;
    },
    setPhone(phone) {
      this.EasyQuotation.phone = phone;
    },
    setSecretCode(code) {
      this.EasyQuotation.secretCode = code;
    },
    setSecretCodeConfirm(code) {
      this.EasyQuotation.secretCodeConfirm = code;
    },

    setSelectedDestinationIcon(icon) {
      this.EasyQuotation.selectedDestinationIcon = icon;
    },
    setSelectReq_adults(adults) {
      this.EasyQuotation.selectReq_adults = adults;
    },
    setSelectReq_kids(kids) {
      this.EasyQuotation.selectReq_kids = kids;
    },
    setSelectReq_infants(infants) {
      this.EasyQuotation.selectReq_infants = infants;
    },
    clearDestinationRequest() {
      this.EasyQuotation.destinationRequest = destinationModel();
    },
    setSelectedPackageId(id) {
      this.EasyQuotation.selectedPackageId = id; // Update the state reactively
    },
  },
});
