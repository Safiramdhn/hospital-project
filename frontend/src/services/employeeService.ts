import apiClient from "@/utils/apiClient";
import { Employee } from "../../types/employee";

export const EmployeeService = {
    getProfile: async function (): Promise<Employee | null> {
        try {
            const response = await apiClient.getEmployeeProfile();
            const data = response?.data;

            // Handle array response (if API returns an array)
            return Array.isArray(data) ? data[0] || null : data;
        } catch (error) {
            console.error("Failed to fetch employee profile:", error);
            throw error;
        }
    }
};
