import apiClient from "@/utils/apiClient";
import { Doctor } from "../types/doctor";

export const DoctorService = {
    getDoctors: async (): Promise<Doctor[] | []> => {
        try {
            const response = await apiClient.getDoctors();
            const data = response?.data;

            if (Array.isArray(data)) {
                return data;
            } else {
                // Handle case where data is not an array
                console.error("Expected an array of doctors, but got:", data);
                return [];
            }
        } catch (error) {
            throw error;
        }
    }
}