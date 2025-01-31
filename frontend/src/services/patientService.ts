import { EmergencyContact } from "@/types/patient/emergencyContact";
import { Patient } from "@/types/patient/patient";
import { PersonalInformation } from "@/types/patient/personalInformation";
import { SocialData } from "@/types/patient/socialData";
import apiClient from "@/utils/apiClient";

interface Input {
  patient?: Patient;
  personal_information?: PersonalInformation;
  social_data?: SocialData;
  emergency_contact?: EmergencyContact;
}

export const PatientService = {
    getByCredential: async (patient_credential: string): Promise<any> => {
        try {
            const response = await apiClient.getPatientByCredential(patient_credential);

            return response?.data;
        } catch (error) {
            throw error;
        }
    },
    getById: async (id: number): Promise<Patient | any> => {
        try {
            const response = await apiClient.getPatientById(id);
            return response?.data;

        } catch (error) {
            throw error;
        }
    },
    create: async (patientData: Input): Promise<Patient | any> => {
        try {
            const response = await apiClient.createPatient(patientData);
            return response?.data;

        } catch (error) {
            throw error;
        }
    },
    update: async (id: number, patientData: Input): Promise<Patient | any> => {
        try {
            const response = await apiClient.updatePatient(id, patientData);
            return response?.data;

        } catch (error) {
            throw error;
        }

    },
    delete: async (id: number): Promise<void | any> => {
        try {
            await apiClient.deletePatient(id);

        } catch (error) {
            throw error;
        }
    },
    getAll: async (): Promise<Patient[]> => {
        try {
            const response = await apiClient.getAllPatients();
            const data = response?.data;

            if (Array.isArray(data)) {
                return data;
            } else {
                // Handle case where data is not an array
                console.error("Expected an array of patients, but got:", data);
                return [];
            }

        } catch (error) {
            throw error;
        }
    }
}