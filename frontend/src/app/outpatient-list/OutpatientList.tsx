'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface OutPatientRegistrationInput {
  registrationNumber: string;
  bookingNumber: string;
  patientName: string;
  doctorName: string;
  clinicName: string;
}

interface OutPatients {
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
}

const OutpatientList: React.FC = () => {
  const [data, setData] = useState<OutPatients[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<OutPatientRegistrationInput>({
    registrationNumber: '',
    bookingNumber: '',
    patientName: '',
    doctorName: '',
    clinicName: '',
  });
  
  useEffect(() => {
      const fetchData = async () => {
        try {
          const params = new URLSearchParams({
            patient_name: search.patientName,
            doctor_name: search.doctorName,
            clinic_name: search.clinicName,
            registration_number: search.registrationNumber,
            booking_number: search.bookingNumber,
          }).toString();
    
          const response = await axios.get(`${apiURL}/outpatient-register?${params}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('Authorization'),
            },
          });
    
          // Check if the response is a JSON
          if (response.status !== 200) {
            throw new Error('Failed to fetch data');
          }
    
          // Assuming response.data is an array, map it to match the OutPatients interface
          const formattedData = response.data.map((item: any) => ({
            patient: {
              first_name: item.patient.first_name,
              last_name: item.patient.last_name,
              mr_number: item.patient.mr_number,
            },
            doctor: {
              name: item.service_detail?.doctor?.name ?? '',
            },
            clinic: {
              name: item.service_detail?.clinic?.name ?? '',
            },
            registration_number: item.registration_number,
            booking_number: item.booking_number,
            visit_date: item.visit_date,
          }));
    
          console.log("Formatted Data", formattedData);
          setData(formattedData);  // Update state with the formatted data
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
    fetchData();
  }, [search]);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  return (
    <div className="w-full max-w-4xl ml-64">
      <h1 className="text-2xl font-bold mb-4">Outpatient Registration</h1>

      <h2 className="text-lg font-semibold mb-2">Pencarian</h2>
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Nama Pasien"
          value={search.patientName}
          onChange={(e) => setSearch((prev) => ({ ...prev, patientName: e.target.value }))}
          className="border p-2 mb-4 w-full rounded-md shadow-sm mr-2  focus:ring-2 focus:ring-mint-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Nama Docter"
          value={search.doctorName}
          onChange={(e) => setSearch((prev) => ({ ...prev, doctorName: e.target.value }))}
          className="border p-2 mb-4 w-full rounded-md shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Nama Poliklinik"
          value={search.clinicName}
          onChange={(e) => setSearch((prev) => ({ ...prev, clinicName: e.target.value }))}
          className="border p-2 mb-4 w-full rounded-md shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="No. Registrasi"
          value={search.registrationNumber}
          onChange={(e) => setSearch((prev) => ({ ...prev, registrationNumber: e.target.value }))}
          className="border p-2 mb-4 w-full rounded-md shadow-s mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="No. Booking"
          value={search.bookingNumber}
          onChange={(e) => setSearch((prev) => ({ ...prev, bookingNumber: e.target.value }))}
          className="border p-2 mb-4 w-full rounded-md shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none"
        />
      </div>

      {loading ? (
        <p className="text-center text-davysGray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-mint-100">
                <th className="border p-2">No. Registrasi</th>
                <th className="border p-2">No. Booking</th>
                <th className="border p-2">Pasien</th>
                <th className="border p-2">Dokter</th>
                <th className="border p-2">Poliklinik</th>
                <th className="border p-2">Tanggal Rawat Jalan</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2">{item.registration_number}</td>
                    <td className="border p-2">{item.booking_number}</td>
                    <td className="border p-2">
                      {item.patient.first_name} {item.patient.last_name}
                    </td>
                    <td className="border p-2">{item.doctor.name}</td>
                    <td className="border p-2">{item.clinic.name}</td>
                    <td className="border p-2">{new Date(item.visit_date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OutpatientList;
