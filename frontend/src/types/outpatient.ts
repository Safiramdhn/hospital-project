export interface OutPatientFilter {
    registrationNumber: string;
    bookingNumber: string;
    patientName: string;
    doctorName: string;
    clinicName: string;
}

export interface OutPatient {
    patient: {
        first_name: string;
        last_name: string;
        mr_number: string;
    };
    doctor: {
        name: string;
    };
    clinic: {
        name: string;
    };
    registration_number: string;
    booking_number: string;
    visit_date: string;
    id: number;
}

export interface OutPatientRegistration {
    register: {
        patient_id: number;
        session: 'Fullday' | 'Halfday'; // You can add more session types if necessary
        notes: string;
        visit_date: string;
    };
    service_detail: {
        clinic_code: string;
        doctor_code: string;
    };
    billing_detail: {
        treatment: string;
        discount: 0;
    };
    visit_detail: {
        class_type: 'NON' | 'VIP'
        insurance_type: 'UMUM' | 'BPJS Kesehatan' | 'BPJS TK'; // Adjust the types as needed
        insurance_number: string;
        guarantor: string;
        entry_method: 'Datang Sendiri' | 'Online'; // Adjust the types as needed
        tariff_code: string;
    };
}