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
    },

    getAll: async (search: Record<string, string>) : Promise<any> =>  {
        try {
            const response = await apiClient.getOutpatientRegistrations(search);

            if (response.status !== 200) {
                throw new Error("Failed to fetch data");
            }

            // Format response data
            return response.data.map((item: any) => ({
                patient: {
                    first_name: item.patient.first_name,
                    last_name: item.patient.last_name,
                    mr_number: item.patient.mr_number,
                },
                doctor: {
                    name: item.service_detail?.doctor?.name ?? "",
                },
                clinic: {
                    name: item.service_detail?.clinic?.name ?? "",
                },
                id: item.id,
                registration_number: item.registration_number,
                booking_number: item.booking_number,
                visit_date: item.visit_date,
            }));
        } catch (error) {
            console.error("Error fetching outpatient registrations:", error);
            throw error;
        }
    }
}