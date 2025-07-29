import { defineStore } from "pinia";

export const useApplyPrivatePackageStore = defineStore("applyPrivatePackage", {
    state: () => ({
        name: "",
        phone: "",
        startDate: "",
        adults: 0,
        kids: 0,
        infants: 0,
        callTime: "",
        flight: "",
        email: "",
        info: "",
        privacy: false,
        package: {
            image: "",
            title: "",
        },
        // Additional fields needed for the component
        selectedOption: null, // for age group selection
        req_bid: 100,
        req_bid_end: 150
    }),
    actions: {
        setName(name) {
            this.name = name;
        },
        setPhone(phone) {
            this.phone = phone;
        },
        setStartDate(startDate) {
            this.startDate = startDate;
        },
        setAdults(adults) {
            this.adults = adults;
        },
        setKids(kids) {
            this.kids = kids;
        },
        setInfants(infants) {
            this.infants = infants;
        },
        setCallTime(callTime) {
            this.callTime = callTime;
        },
        setFlight(flight) {
            this.flight = flight;
        },
        setEmail(email) {
            this.email = email;
        },
        setInfo(info) {
            this.info = info;
        },
        setPrivacy(privacy) {
            this.privacy = privacy;
        },
        setPackage(image, title) {
            this.package.image = image;
            this.package.title = title;
        },
    },
});