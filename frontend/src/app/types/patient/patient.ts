import { PersonalInformation } from "./personalInformation";
import { SocialData } from "./socialData";
import { EmergencyContact } from "./emergencyContact";

export interface Patient {
    id: number;
    mr_number: string;
    ktp_number: string;
    first_name: string;
    last_name: string;
    active_status: boolean;
    mother_name: string;
    employee_id: number;
    createdAt: string;
    updatedAt: string;
    personal_information?: PersonalInformation;
    social_data?: SocialData;
    emergency_contact?: EmergencyContact;
    employee: {
        name: string;
    }
}