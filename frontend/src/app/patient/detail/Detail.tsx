'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface Patient {
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
  deletedAt: string | null;
  personal_information: PersonalInformation;
  social_data: SocialData;
  emergency_contact: EmergencyContact;
  employee: {
    name: string;
  };
}

interface PersonalInformation {
  id: number;
  patient_id: number;
  birth_place: string;
  birth_date: string;
  gender: string;
  blood_type: string;
  maritial_status: string;
  religion: string;
  contact_number: string;
  email: string;
  id_type: string;
  id_number: string;
  employeer: string;
  education: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface SocialData {
  id: number;
  patient_id: number;
  address: string;
  city: string;
  postal_code: string;
  mr_date: string;
  weight: number;
  ethnicity: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface EmergencyContact {
  id: number;
  patient_id: number;
  contact_name: string;
  phone_number: string;
  address: string;
  city: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

const PatientDetailComponent = () => {
  const router = useRouter();
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //   define the tabs
  const sections = ['Data Pribadi', 'Data sosial', 'Kontak Darurat'];
  const patientID = id && typeof id === 'string' ? parseInt(id) : undefined;

  if (!patientID) {
    return <div>Invalid patient ID</div>;
  }

  // fetch patient detail from api
  useEffect(() => {
    const fetchPatientDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiURL}/patients/${patientID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status !== 200) {
          throw new Error('Failed to fetch patient data');
        }
        const data = await response.data;
        setPatient(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  },[patientID]);

  return (
    <div>
      <h1>
        {' '}
        Detail Pasient {patient?.first_name} {patient?.last_name}{' '}
      </h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <div>
        <p>Terakhir Tersimpan Oleh : {patient?.employee?.name || 'User'}</p>
        <p>Tanggal Terakhir Diperbaharui : {patient?.updatedAt || '-'}</p>
      </div>

      <TabGroup>
        <TabList className="flex space-x-2 border-b">
          {sections.map((section, index) => (
            <Tab key={index} className="p-2 focus:outline-none">
              {section}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <h2>Data Pasien</h2>
            {patient && (
              <div>
                <p>No. Rekam Medis: {patient.mr_number}</p>
                <p>
                  Nama: {patient.first_name} {patient.last_name}
                </p>
                <p>Nama Ibu Kandung: {patient.mother_name}</p>
                <p>Tempat Lahir: {patient.personal_information?.birth_place}</p>
                <p>Tanggal Lahir: {patient.personal_information?.birth_date}</p>
                <p>Jenis Kelamin: {patient.personal_information?.gender}</p>
                <p>Golongan Darah: {patient.personal_information?.blood_type}</p>
                <p>Status Pernikahan: {patient.personal_information?.maritial_status}</p>
                <p>Agama: {patient.personal_information.religion}</p>
                <p>No. Telp: {patient.personal_information.contact_number}</p>
                <p>Email: {patient.personal_information?.email}</p>
                <p>Tipe Tanda Identitas: {patient.personal_information?.id_type}</p>
                <p>No. Tanda Identas: {patient.personal_information?.id_number}</p>
                <p>Pegawai: {patient.personal_information?.employeer}</p>
                <p>Pendidikan Terakhir: {patient.personal_information?.education}</p>
              </div>
            )}
          </TabPanel>
          <TabPanel>
            <h2>Data Sosial</h2>
            {patient && (
              <div>
                <p>Alamat: {patient.social_data?.address}</p>
                <p>Kota: {patient.social_data?.city}</p>
                <p>Kode Pos: {patient.social_data?.postal_code}</p>
                <p>Tanggal Rekam Medis: {patient.social_data?.mr_date}</p>
                <p>Berat Badan: {patient.social_data?.weight}</p>
                <p>Suku: {patient.social_data?.ethnicity}</p>
              </div>
            )}
          </TabPanel>
          <TabPanel>
            <h2>Kontak Darurat</h2>
            {patient && (
              <div>
                <p>Nama Kontak: {patient.emergency_contact?.contact_name}</p>
                <p>No. Telp: {patient.emergency_contact?.phone_number}</p>
                <p>Alamat: {patient.emergency_contact?.address}</p>
                <p>Kota: {patient.emergency_contact?.city}</p>
              </div>
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default PatientDetailComponent;
