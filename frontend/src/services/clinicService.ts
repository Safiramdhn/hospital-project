import apiClient from "@/utils/apiClient";
import { Clinic } from "../types/clinic";

export const ClinicService = {
    getClinics: async (): Promise<Clinic[] | []> => {
        try {
            const response = await apiClient.getClinics();
            const data = response?.data;

            if (Array.isArray(data)) {
                return data;
            } else {
                // Handle case where data is not an array
                console.error("Expected an array of clinics, but got:", data);
                return [];
            }
        } catch (error) {
            throw error;
        }
    }
}