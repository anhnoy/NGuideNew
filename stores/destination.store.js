import { defineStore } from "pinia";
import { destinationModel } from "@/models/destinationModel"; // Adjust this path as needed

export const useDestinationStore = defineStore("destination", {
  state: () => ({
    travelCustom: {
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
      selectedAccommodations: "",
      selectedBeds: [],
      req_inc_food: "",
      selectedFoods: [],
      selectedVehicles: "",
      strictList: [],
      additionList: [],
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
      isChecked: false,
    },
  }),
  actions: {
    toggleSelectedTheme(th_id) {
      const index = this.travelCustom.selectedThemes.findIndex(
        (theme) => theme.th_id === th_id
      );
      if (index !== -1) {
        this.travelCustom.selectedThemes.splice(index, 1);
      } else {
        this.travelCustom.selectedThemes.push({ th_id });
      }
    },
    toggleFood(fdt_id) {
      const index = this.travelCustom.selectedFoods.findIndex(
        (food) => food.fdt_id === fdt_id
      );
      if (index !== -1) {
        this.travelCustom.selectedFoods.splice(index, 1);
      } else {
        this.travelCustom.selectedFoods.push({ fdt_id });
      }
    },
    toggleBed(rid) {
      const index = this.travelCustom.selectedBeds.findIndex(
        (bed) => bed.rid === rid
      );
      if (index !== -1) {
        this.travelCustom.selectedBeds.splice(index, 1);
      } else {
        this.travelCustom.selectedBeds.push({ rid });
      }
    },
    toggleStrictListItem(sc_id) {
      const index = this.travelCustom.strictList.findIndex(
        (item) => item.sc_id === sc_id
      );
      if (index !== -1) {
        this.travelCustom.strictList.splice(index, 1);
      } else {
        this.travelCustom.strictList.push({ sc_id });
      }
    },
    toggleAdditionListItem(ado_id) {
      const index = this.travelCustom.additionList.findIndex(
        (item) => item.ado_id === ado_id
      );
      if (index !== -1) {
        this.travelCustom.additionList.splice(index, 1);
      } else {
        this.travelCustom.additionList.push({ ado_id });
      }
    },
    toggleTripReq(laid, land_name) {
      const index = this.travelCustom.trip_req.findIndex(
        (trip) => trip.laid === laid
      );
      if (index !== -1) {
        this.travelCustom.trip_req.splice(index, 1); // Remove if already selected
      } else {
        this.travelCustom.trip_req.push({ laid, land_name }); // Add if not selected
      }
    },

    clearSelection() {
      this.travelCustom = {
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
        selectedAccommodations: "",
        selectedBeds: [],
        req_inc_food: "",
        selectedFoods: [],
        selectedVehicles: "",
        strictList: [],
        additionList: [],
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
        selectedCity: null,
        selectedPlaces: [],
      };
    },
    setSelectedDestination(destination) {
      this.travelCustom.selectedDestination = destination;
    },
    clearDestination() {
      this.travelCustom.selectedDestination = null;
    },
    setStartDate(date) {
      this.travelCustom.startDate = date;
    },
    setEndDate(date) {
      this.travelCustom.endDate = date;
    },
    setSelectedDeparture(time) {
      this.travelCustom.selectedDeparture = time;
    },
    setSelectedArrival(time) {
      this.travelCustom.selectedArrival = time;
    },
    setSelectedOption(option) {
      this.travelCustom.selectedOption = option;
    },
    setBudgetRange(start, end) {
      this.travelCustom.req_bid = start;
      this.travelCustom.req_bid_end = end;
    },
    setAccommodations(value) {
      this.travelCustom.selectedAccommodations =
        this.travelCustom.selectedAccommodations === value ? null : value;
    },
    setOtherOptions(option) {
      this.travelCustom.req_inc_food = option;
    },
    setFoods(foods) {
      this.travelCustom.selectedFoods = foods.map((food) => ({ fdt_id: food }));
    },
    setVehicles(vehicles) {
      this.travelCustom.selectedVehicles = vehicles;
    },
    setReq_group_name(group) {
      this.travelCustom.req_group_name = group;
    },
    setReservationName(name) {
      this.travelCustom.reservationName = name;
    },
    setEmail(email) {
      this.travelCustom.email = email;
    },
    setPhone(phone) {
      this.travelCustom.phone = phone;
    },
    setSecretCode(code) {
      this.travelCustom.secretCode = code;
    },
    setSecretCodeConfirm(code) {
      this.travelCustom.secretCodeConfirm = code;
    },
    setAdditionalInfo(info) {
      this.travelCustom.additionalInfo = info;
    },
    setSelectedDestinationIcon(icon) {
      this.travelCustom.selectedDestinationIcon = icon;
    },
    setSelectReq_adults(adults) {
      this.travelCustom.selectReq_adults = adults;
    },
    setSelectReq_kids(kids) {
      this.travelCustom.selectReq_kids = kids;
    },
    setSelectReq_infants(infants) {
      this.travelCustom.selectReq_infants = infants;
    },
    clearDestinationRequest() {
      this.travelCustom.destinationRequest = destinationModel();
    },
    setHasPlaceToVisit(value) {
      this.travelCustom.hasPlaceToVisit = value;
    },
    setSelectedCity(cityId) {
      this.travelCustom.selectedCity = cityId;
    },
    setSelectedPlaces(places) {
      this.selectedPlaces = places;
    },
    setPrivacyAgreed(value) {
      this.travelCustom.privacyAgreed = value;
    },
    setIsChecked(value) {
      this.travelCustom.isChecked = value;
    },
  },
});
