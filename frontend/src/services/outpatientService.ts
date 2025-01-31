import { OutPatientRegistration } from "@/types/outpatient";
import apiClient from "@/utils/apiClient";

export const OutpatientService = {
    create: async (register: OutPatientRegistration) : Promise<any> => {
        try {
            const response = await apiClient.createOutpatientRegistration(register);

            return response?.data;
        } catch (error) {
            throw error;
        }
    }
}