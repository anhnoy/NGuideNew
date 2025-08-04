import API from "./api.service";

export default {
  async applyCorporation(storeData) {
    const url = "/apply-corporation";
    try {
        // Serialize the store data to prevent circular references
        const serializedData = {
            reservationName: storeData.reservationName,
            position: storeData.position,
            startDate: storeData.startDate,
            email: storeData.fullEmail, // Use the getter for full email
            company: storeData.company,
            phone: storeData.phone,
            callableTime: storeData.callableTime,
            additionalRequests: storeData.additionalRequests,
            privacy: storeData.privacy
        };
    
        const response = await API().post(url, serializedData);
        return response;
        } catch (error) {
            console.error("Error sending corporation application:", error);
            throw error;
        }
    }
};