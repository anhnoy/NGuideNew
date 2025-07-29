import API from "./api.service";

export default {
    async sendPrivatePackage(data) {
        const url = "/apply-private-package";
        try {
            const response = await API().post(url, data);
            return response;
        } catch (error) {
            console.error("Error send OTP:", error);
            throw error;
        }
    }
}