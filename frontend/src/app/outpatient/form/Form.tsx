'use client';
import React, { useState, useEffect } from 'react';
import { OutPatientRegistration } from '@/types/outpatient';
import { Clinic } from '@/types/clinic'; 
import { Doctor } from '@/types/doctor';
import { TariffReference } from '@/types/tariffReference';
import { Patient } from '@/types/patient/patient';
import { ClinicService } from '@/services/clinicService';
import { DoctorService } from '@/services/doctorService';
import { TariffReferenceService } from '@/services/tarffReferenceService';
import { OutpatientService } from '@/services/outpatientService';

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const OutpatientRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<OutPatientRegistration>({
    register: {
      patient_id: 0,
      session: 'Fullday',
      notes: '',
      visit_date: '',
    },
    service_detail: {
      clinic_code: '',
      doctor_code: '',
    },
    billing_detail: {
      treatment: '',
      discount: 0,
    },
    visit_detail: {
      class_type: 'NON',
      insurance_type: 'UMUM',
      insurance_number: '',
      guarantor: '',
      entry_method: 'Datang Sendiri',
      tariff_code: '',
    },
  });
  
  const [patientCredential, setPatientCredential] = useState('');
  const [patientData, setPatientData] = useState<Patient | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [clinics, setClinic] = useState<Clinic[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [tariffs, setTariffs] = useState<TariffReference[]>([]);

  const [date, setDate] = useState('');

  // Set initial date to today's date in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // "YYYY-MM-DD"
    setDate(formattedDate);
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
    handleChange(event);
  };

  const handlePatientSearch = async () => {
    try {
      const result = await fetch(`${apiURL}/patient/find-patient-record`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
        },
        body: JSON.stringify({ patient_credential: patientCredential }),
      });

      if (!result.ok) {
        const errorData = await result.json();
        throw new Error(errorData.message || 'Failed to fetch patient data.');
      }

      const data = await result.json();
      setPatientData(data.patient);
    } catch (error) {
      console.error('Error searching patient:', error);
    }
  };

  // Fetch clinics, doctors and tariffs
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const result = await ClinicService.getClinics();
        setClinic(result);
      } catch (error) {
        console.error('Error fetching clinics:', error);
        alert(error);
      }
    };
    const fetchDoctors = async () => {
      try {
        const result = await DoctorService.getDoctors();
        setDoctors(result);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        alert(error);
      }
    };
    const fetchTariffs = async () => {
      try {
        const result = await TariffReferenceService.getTariffReferences();
        setTariffs(result);
      } catch (error) {
        console.error('Error fetching tariffs:', error);
        alert(error);
      }
    };

    fetchClinics();
    fetchDoctors();
    fetchTariffs();
  }, []);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');
  
    if (section && field && formData) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof FormData],
          [field]: value,
        },
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (formData.register.patient_id <= 0 && patientData) {
      formData.register.patient_id = patientData.id
    }

    try {
      const result = await OutpatientService.create(formData);
      setMessage(`${result?.message}, queue number: ${result?.queue_number}`);

      // unset the form fields
      setFormData({register: {
        patient_id: 0,
        session: 'Fullday',
        notes: '',
        visit_date: '',
      },
      service_detail: {
        clinic_code: '',
        doctor_code: '',
      },
      billing_detail: {
        treatment: '',
        discount: 0,
      },
      visit_detail: {
        class_type: 'NON',
        insurance_type: 'UMUM',
        insurance_number: '',
        guarantor: '',
        entry_method: 'Datang Sendiri',
        tariff_code: '',
      },});
    } catch (error) {
      setMessage('Error submitting form. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Pendaftaran Rawat Jalan</h2>

      <div>
        <label className="block text-sm font-medium">Cari Pasien</label>
        <input
          type="text"
          value={patientCredential}
          onChange={(e) => setPatientCredential(e.target.value)}
          className="border p-2 w-full rounded-md shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
          placeholder="No. KTP / No. Rekam Medis"
        />
      </div>
      <button type="button" onClick={handlePatientSearch} className="w-full bg-moonstone-100 text-davysGray-800 py-2 rounded hover:bg-mint-300 transition my-4">
        Cari Pasien
      </button>

      {message && <p className="text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 border-t-4 border-gray-200 p-2">
        {/* Register Section */}
        <h2>Data Registrasi</h2>
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-medium">ID Pasien</label>
            <input
              type="number"
              name="register.patient_id"
              value={patientData?.id}
              onChange={handleChange}
              className="border p-2 w-full rounded-md shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
              required
            />
          </div>

          <div className="ml-2">
            <label className="block text-sm font-medium">Nama Pasien</label>
            <input
              type="text"
              value={`${patientData?.first_name || ''} ${patientData?.last_name || ''}`}
              className="border p-2 w-full rounded-md shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Sesi</label>
          <select name="register.session" value={formData.register.session} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Fullday">Fullday</option>
            <option value="Halfday">Half Day</option>``
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Catatan</label>
          <textarea name="register.notes" value={formData.register.notes} onChange={handleChange} className="w-full p-2 border roundedshadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium">Tanggal Rawat Jalan</label>
          <input
            type="date"
            name="register.visit_date"
            value={formData.register.visit_date}
            onChange={handleDateChange}
            className="border p-2 w-full rounded-md shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
            required
          />
        </div>

        {/* Service Detail Section */}
        <h2>Data Poliklinik</h2>
        <div>
          <label className="block text-sm font-medium">Poliklinik</label>
          <select
            name="service_detail.clinic_code"
            value={formData.service_detail.clinic_code}
            onChange={handleChange}
            className="w-full p-2 border rounded shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
            required
          >
            <option value="">Pilih Poliklinik</option>
            {clinics?.map((clinic) => (
              <option key={clinic.id} value={clinic.code}>
                {`${clinic.code} - ${clinic.name}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Dokter</label>
          <select
            name="service_detail.doctor_code"
            value={formData.service_detail.doctor_code}
            onChange={handleChange}
            className="w-full p-2 border rounded shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
            required
          >
            <option value="">Pilih Dokter</option>
            {doctors?.map((doctor) =>
              // only display doctor based on selected clinic id
              doctor.clinic_id === clinics?.find((clinic) => clinic.code === formData.service_detail.clinic_code)?.id ? (
                <option key={doctor.id} value={doctor.code}>
                  {`${doctor.code} - ${doctor.name}`}
                </option>
              ) : null
            )}
          </select>
        </div>

        {/* Billing Detail Section */}
        <h2>Data Pembayaran</h2>
        <div>
          <label className="block text-sm font-medium">Tindakan</label>
          <input
            type="text"
            name="billing_detail.treatment"
            value={formData.billing_detail.treatment}
            onChange={handleChange}
            className="border p-2 w-full rounded-md shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Diskon (%)</label>
          <input
            type="number"
            name="billing_detail.discount"
            value={formData.billing_detail.discount || 0}
            onChange={handleChange}
            className="border p-2 w-full rounded-md shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
          />
        </div>

        {/* Visit Detail Section */}
        <h2>Data Rujukan</h2>
        <div>
          <label className="block text-sm font-medium">Tipe Kelas</label>
          <select
            name="visit_detail.class_type"
            value={formData.visit_detail.class_type}
            onChange={handleChange}
            className="w-full p-2 border rounded shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
          >
            <option value="NON">Non</option>
            <option value="VIP  ">VIP</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Tipe Asuransi</label>
          <select
            name="visit_detail.insurance_type"
            value={formData.visit_detail.insurance_type}
            onChange={handleChange}
            className="w-full p-2 border rounded shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
          >
            <option value="UMUM">UMUM</option>
            <option value="BPJS Kesehatan">BPJS Kesehatan</option>
            <option value="BPJS TK">BPJS Ketenagakerjaan</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">No. Asuransi</label>
          <input
            type="text"
            name="visit_detail.insurance_number"
            value={formData.visit_detail.insurance_number}
            onChange={handleChange}
            className="border p-2 w-full rounded-md shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Penjamin</label>
          <input
            type="text"
            name="visit_detail.guarantor"
            value={formData.visit_detail.guarantor}
            onChange={handleChange}
            className="border p-2 w-full rounded-md shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Metode Masuk</label>
          <select
            name="visit_detail.entry_method"
            value={formData.visit_detail.entry_method}
            onChange={handleChange}
            className="w-full p-2 border rounded shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
          >
            <option value="Datang Sendiri">Datang Sendiri</option>
            <option value="Online">Online</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Kode Tarif</label>
          <select
            name="visit_detail.tariff_code"
            value={formData.visit_detail.tariff_code}
            onChange={handleChange}
            className="w-full p-2 border rounded shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
          >
            <option value="">Select Tariff</option>
            {tariffs.map((tariff) => (
              <option key={tariff.id} value={tariff.tariff_code}>
                {tariff.tariff_code} - {tariff.description}
              </option>
            ))}
          </select>
        </div>

        <div className="p-2 border-t-4 rounded border-gray-100"></div>

        {/* displaying temporary calculation of billing */}
        <h2>Data Pembayaran Sementara</h2>
        {formData.visit_detail.tariff_code && (
          <div>
            <label className="block text-sm font-medium">Billing</label>

            {/* registration fee */}
            <p>
              Tarif Registrasi:{' '}
              {tariffs.find((tariff) => tariff.tariff_code === formData.visit_detail.tariff_code)
                ? //ignore invalid
                  parseFloat(tariffs.find((tariff) => tariff.tariff_code === formData.visit_detail.tariff_code)!.base_registration_fee).toFixed(2)
                : '0.00'}
            </p>

            {/* examination fee */}
            <p>
              Tarif Pemeriksaan:{' '}
              {tariffs.find((tariff) => tariff.tariff_code === formData.visit_detail.tariff_code)
                ? //ignore invalid
                  parseFloat(tariffs.find((tariff) => tariff.tariff_code === formData.visit_detail.tariff_code)!.base_examination_fee).toFixed(2)
                : '0.00'}
            </p>

            {/* total fee */}
            <p>
              Tarif Total:{' '}
              {tariffs.find((tariff) => tariff.tariff_code === formData.visit_detail.tariff_code)
                ? //ignore invalid
                  (
                    parseFloat(tariffs.find((tariff) => tariff.tariff_code === formData.visit_detail.tariff_code)!.base_registration_fee) +
                    parseFloat(tariffs.find((tariff) => tariff.tariff_code === formData.visit_detail.tariff_code)!.base_examination_fee)
                  ).toFixed(2)
                : '0.00'}
            </p>

            {/* total discount fee */}
            <p>
              Diskon:{' '}
              {tariffs.find((tariff) => tariff.tariff_code === formData.visit_detail.tariff_code)
                ? //ignore invalid
                  (
                    ((parseFloat(tariffs.find((tariff) => tariff.tariff_code === formData.visit_detail.tariff_code)!.base_registration_fee) +
                      parseFloat(tariffs.find((tariff) => tariff.tariff_code === formData.visit_detail.tariff_code)!.base_examination_fee)) *
                      (parseFloat(formData.billing_detail.discount) || 0)) /
                    100
                  ).toFixed(2)
                : '0.00'}
            </p>

            {/* total payment */}
            <p>
              Total Pembayaran:{' '}
              {tariffs.find((tariff) => tariff.tariff_code === formData.visit_detail.tariff_code)
                ? (
                    (parseFloat(tariffs.find((tariff) => tariff.tariff_code === formData.visit_detail.tariff_code)!.base_registration_fee) +
                      parseFloat(tariffs.find((tariff) => tariff.tariff_code === formData.visit_detail.tariff_code)!.base_examination_fee)) *
                    (1 - (parseFloat(formData.billing_detail.discount) || 0) / 100)
                  ).toFixed(2)
                : '0.00'}
            </p>
          </div>
        )}

        <div className="p-2 border-t-4 rounded border-gray-100"></div>
        {/* Submit Button */}
        <button type="submit" className="w-full bg-moonstone-100 text-davysGray-800 py-2 rounded hover:bg-mint-300 transition my-4" disabled={loading}>
          {loading ? 'Submitting...' : 'Registrasi'}
        </button>
      </form>
    </div>
  );
};

export default OutpatientRegistrationForm;
