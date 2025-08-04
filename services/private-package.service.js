import API from "./api.service";

export default {
    async sendPrivatePackage(storeData) {
        const url = "/apply-private-package";
        try {
            // Serialize the store data to prevent circular references
            const serializedData = {
                name: storeData.name,
                phone: storeData.phone,
                startDate: storeData.startDate,
                adults: storeData.adults,
                kids: storeData.kids,
                infants: storeData.infants,
                callTime: storeData.callTime,
                flight: storeData.flight,
                email: storeData.email,
                info: storeData.info,
                privacy: storeData.privacy,
                package: {
                    image: storeData.package?.image || "",
                    title: storeData.package?.title || ""
                },
                selectedOption: storeData.selectedOption,
                req_bid: storeData.req_bid,
                req_bid_end: storeData.req_bid_end
            };

            const response = await API().post(url, serializedData);
            return response;
        } catch (error) {
            console.error("Error sending private package application:", error);
            throw error;
        }
    }
}