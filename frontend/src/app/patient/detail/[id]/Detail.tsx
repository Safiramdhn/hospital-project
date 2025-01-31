'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { Patient } from '@/types/patient/patient';
import { PatientService } from '@/services/patientService';

const PatientDetailComponent = ({ patientID }: { patientID: number | undefined }) => {
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //   define the tabs
  const sections = ['Data Pribadi', 'Data sosial', 'Kontak Darurat'];

  if (!patientID) {
    return <div>Invalid patient ID</div>;
  }

  // fetch patient detail from api
  useEffect(() => {
    const fetchPatientDetail = async () => {
      setLoading(true);
      try {
        const result = await PatientService.getById(patientID);
        setPatient(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetail();
  },[patientID]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-6xl mx-auto mt-14 mb-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b-4 border-mint-300 pb-4">
        Detail Pasien {patient?.first_name} {patient?.last_name}
      </h1>
      
      {loading && (
        <div className="w-full text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-moonstone-500 mx-auto"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
  
      <div className="space-y-2 mb-6">
        <div className="flex items-center space-x-2 text-gray-600">
          <p className="font-semibold">Terakhir Tersimpan Oleh:</p>
          <p>{patient?.employee?.name || '-'}</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <p className="font-semibold">Tanggal Terakhir Diperbaharui:</p>
          <p>{patient && patient.updatedAt ? 
            `${new Date(patient.updatedAt).toLocaleDateString()} ${new Date(patient.updatedAt).toLocaleTimeString()}` : 
            '-'}</p>
        </div>
      </div>
  
      <TabGroup className="mt-6">
        <TabList className="flex space-x-1 border-b border-gray-200">
          {sections.map((section, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `${
                  selected
                    ? 'bg-mint-100 text-davysGray-700 border-b-2 border-mint-500'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                } px-4 py-2 font-medium rounded-t-lg focus:outline-none transition-colors duration-200`
              }
            >
              {section}
            </Tab>
          ))}
        </TabList>
        
        <TabPanels className="mt-4">
          <TabPanel>
            {patient && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem label="No. Rekam Medis" value={patient.mr_number} />
                <InfoItem label="Nama" value={`${patient.first_name} ${patient.last_name}`} />
                <InfoItem label="Nama Ibu Kandung" value={patient.mother_name} />
                <InfoItem label="Tempat Lahir" value={patient.personal_information?.birth_place} />
                <InfoItem label="Tanggal Lahir" value={patient.personal_information?.birth_date} />
                <InfoItem label="Jenis Kelamin" value={patient.personal_information?.gender} />
                <InfoItem label="Golongan Darah" value={patient.personal_information?.blood_type} />
                <InfoItem label="Status Pernikahan" value={patient.personal_information?.maritial_status} />
                <InfoItem label="Agama" value={patient.personal_information?.religion} />
                <InfoItem label="No. Telp" value={patient.personal_information?.contact_number} />
                <InfoItem label="Email" value={patient.personal_information?.email} />
                <InfoItem label="Tipe Tanda Identitas" value={patient.personal_information?.id_type} />
                <InfoItem label="No. Tanda Identitas" value={patient.personal_information?.id_number} />
                <InfoItem label="Pegawai" value={patient.personal_information?.employeer} />
                <InfoItem label="Pendidikan Terakhir" value={patient.personal_information?.education} />
              </div>
            )}
          </TabPanel>
  
          <TabPanel>
            {patient && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem label="Alamat" value={patient.social_data?.address} />
                <InfoItem label="Kota" value={patient.social_data?.city} />
                <InfoItem label="Kode Pos" value={patient.social_data?.postal_code} />
                <InfoItem label="Tanggal Rekam Medis" value={patient.social_data?.mr_date} />
                <InfoItem label="Berat Badan" value={`${patient.social_data?.weight} kg`} />
                <InfoItem label="Suku" value={patient.social_data?.ethnicity} />
              </div>
            )}
          </TabPanel>
  
          <TabPanel>
            {patient && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem label="Nama Kontak" value={patient.emergency_contact?.contact_name} />
                <InfoItem label="No. Telp" value={patient.emergency_contact?.phone_number} />
                <InfoItem label="Alamat" value={patient.emergency_contact?.address} />
                <InfoItem label="Kota" value={patient.emergency_contact?.city} />
              </div>
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
  
};

const InfoItem = ({ label, value }: { label: string; value: string | number | undefined }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value || '-'}</p>
  </div>
);

export default PatientDetailComponent;
