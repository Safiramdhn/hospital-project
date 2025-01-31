import apiClient from "@/utils/apiClient";
import { TariffReference } from "../types/tariffReference";

export const TariffReferenceService = {
    getTariffReferences: async (): Promise<TariffReference[] | []> => {
        try {
            const response = await apiClient.getTariffReferences();
            const data = response?.data;

            if (Array.isArray(data)) {
                return data;
            } else {
                // Handle case where data is not an array
                console.error("Expected an array of tariff references, but got:", data);
                return [];
            }
        } catch (error) {
            throw error;
        }
    }
}