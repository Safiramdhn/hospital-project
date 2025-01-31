'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Patient } from '@/app/types/patient/patient';
import { PersonalInformation } from '@/app/types/patient/personalInformation';
import { SocialData } from '@/app/types/patient/socialData';
import { EmergencyContact } from '@/app/types/patient/emergencyContact';

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface Input {
  patient?: Patient;
  personal_information?: PersonalInformation;
  social_data?: SocialData;
  emergency_contact?: EmergencyContact;
}

// interface Patient {
//   id?: number;
//   mr_number?: string;
//   ktp_number?: string;
//   first_name?: string;
//   last_name?: string;
//   active_status?: boolean;
//   mother_name?: string;
//   employee_id: number ;
// }

// interface PersonalInformation {
//   birth_place?: string;
//   birth_date?: string;
//   gender?: string;
//   blood_type?: string;
//   maritial_status?: string;
//   religion?: string;
//   contact_number?: string;
//   email?: string;
//   id_type?: string;
//   id_number: string;
//   employeer?: string;
//   education?: string;
// }

// interface SocialData {
//   address?: string;
//   city?: string;
//   postal_code?: string;
//   mr_date: string;
//   weight?: number;
//   ethnicity?: string;
// }

// interface EmergencyContact {
//   contact_name?: string;
//   phone_number?: string;
//   address?: string;
//   city?: string;
// }

const PatientForm: React.FC = () => {
  const router = useRouter();
  const param = useSearchParams();
  const id = param.get('id');
  const parsedID = id && typeof id === 'string' ? parseInt(id) : undefined;

  const [input, setInput] = useState<Input>({
    patient: {
      employee_id: 0,
      id: 0,
      mr_number: '',
      ktp_number: '',
      first_name: '',
      last_name: '',
      active_status: false,
      mother_name: '',
      createdAt: '',
      updatedAt: '',
      employee: {
        name: ''
      },
      personal_information: undefined,
      social_data: undefined,
      emergency_contact: undefined
    },
    personal_information: {
      id_number: '',
      gender: 'Laki-laki',
      blood_type: 'A',
      maritial_status: 'Single',
      religion: 'Islam',
      id_type: 'KTP',
      education: 'SD',
      id: 0,
      patient_id: 0,
      birth_place: '',
      birth_date: '',
      contact_number: '',
      email: '',
      employeer: ''
    },
    social_data: {
      mr_date: '',
      id: 0,
      patient_id: 0,
      address: '',
      city: '',
      postal_code: '',
      weight: 0,
      ethnicity: '',
      createdAt: '',
      updatedAt: ''
    },
    emergency_contact: {
      id: 0,
      patient_id: 0,
      contact_name: '',
      phone_number: '',
      address: '',
      city: '',
      createdAt: '',
      updatedAt: ''
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (parsedID) {
        setLoading(true);
        try {
          const response = await fetch(`${apiURL}/patient/${parsedID}`, {
            headers:{
              contentType: 'application/json',
              Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            }
          });
          if (!response.ok) throw new Error('Failed to fetch patient data');
          const data = await response.json();
          setInput({
            ...data,
            patient: {
              first_name: data.first_name,
              last_name: data.last_name,
              ktp_number: data.ktp_number,
              mother_name: data.mother_name,
            }
          });
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    if (parsedID) {
      fetchPatient();
    }
  }, [parsedID]);

  useEffect(() =>{
    console.log("Patient data", input)
  }, [input]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const method = parsedID ? 'PUT' : 'POST';
      const url = parsedID ? `${apiURL}/patient/${parsedID}` : `${apiURL}/patient`;
      console.log("patient for submit", input)
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) throw new Error('Failed to save patient data');
      router.push('/patient');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Input, value: any) => {
      setInput((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-6xl mx-auto my-10">
      <h1 className="text-2xl font-bold my-4 text-center">{parsedID ? 'Edit Patient' : 'Create Patient'}</h1>

      <form onSubmit={handleSubmit} className="space-y-4 border-t-4 border-gray-200 p-2">
        {/* Basic Patient Info */}
        <h2>Data Pasien Baru</h2>
        <hr />

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div>
              <label className="block text-sm font-medium">Nama Depan</label>
              <input
                type="text"
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                value={input.patient?.first_name || ''}
                onChange={(e) => handleChange('patient', {...input.patient, first_name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Jenis Tanda Identitas</label>
              <select
                value={input.personal_information?.id_type || 'KTP'}
                onChange={(e) => handleChange('personal_information', { ...input.personal_information, id_type: e.target.value })}
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
              >
                <option value="KTP">KTP</option>
                <option value="Passport">Passport</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Nama Ibu Kandung</label>
              <input
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                type="text"
                value={input.patient?.mother_name || ''}
                onChange={(e) => handleChange('patient', {...input.patient, mother_name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Tempat Lahir</label>
              <input
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                type="text"
                value={input.personal_information?.birth_place || ''}
                onChange={(e) => handleChange('personal_information', { ...input.personal_information, birth_place: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Status Pernikahan</label>
              <select
                value={input.personal_information?.maritial_status || 'Single'}
                onChange={(e) => handleChange('personal_information', { ...input.personal_information, maritial_status: e.target.value })}
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
              >
                <option value="Single">Single</option>
                <option value="Menikah">Menikah</option>
                <option value="Duda/Janda">Duda/Janda</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Agama</label>
              <select
                value={input.personal_information?.religion || ''}
                onChange={(e) => handleChange('personal_information', { ...input.personal_information, religion: e.target.value })}
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
              >
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Budha">Budha</option>
                <option value="Lain-lain">Lain-lain</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">No. Telp</label>
              <input
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                type="text"
                value={input.personal_information?.contact_number || ''}
                onChange={(e) => handleChange('personal_information', { ...input.personal_information, contact_number: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Nama Kantor Pegawai</label>
              <input
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                type="text"
                value={input.personal_information?.employeer || ''}
                onChange={(e) => handleChange('personal_information', { ...input.personal_information, employeer: e.target.value })}
              />
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium">Nama Belakang</label>
              <input
                type="text"
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                value={input.patient?.last_name || ''}
                onChange={(e) => handleChange('patient', {...input.patient, last_name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">No. Tanda Identitas</label>
              <input
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                type="text"
                value={input.patient?.ktp_number || ''}
                onChange={(e) => handleChange('patient', {...input.patient, ktp_number: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Jenis Kelamin</label>
              <select
                value={input.personal_information?.gender || 'Laki-laki'}
                onChange={(e) => handleChange('personal_information', { ...input.personal_information, gender: e.target.value })}
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
                <option value="Lain-lain">Lain-lain</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Tanggal Lahir</label>
              <input
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                type="date"
                value={input.personal_information?.birth_date || ''}
                onChange={(e) => handleChange('personal_information', { ...input.personal_information, birth_date: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Golongan Darah</label>
              <select
                value={input.personal_information?.blood_type || 'A'}
                onChange={(e) => handleChange('personal_information', { ...input.personal_information, blood_type: e.target.value })}
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="O">O</option>
                <option value="AB">AB</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Pendidikan Terakhir</label>
              <select
                value={input.personal_information?.education || 'SD'}
                onChange={(e) => handleChange('personal_information', { ...input.personal_information, education: e.target.value })}
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
              >
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA/K">SMA/K</option>
                <option value="D3">D3</option>
                <option value="D4/S1">D4/S1</option>
                <option value="S2">S2</option>
                <option value="Lain-lain">Lain-lain</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                type="text"
                value={input.personal_information?.email || ''}
                onChange={(e) => handleChange('personal_information', { ...input.personal_information, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Social Data */}
        <h2>Social Data</h2>
        <hr />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div>
              <label className="block text-sm font-medium">Alamat</label>
              <input
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                type="text"
                value={input.social_data?.address || ''}
                onChange={(e) => handleChange('social_data', { ...input.social_data, address: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Kota</label>
              <input
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                type="text"
                value={input.social_data?.city || ''}
                onChange={(e) => handleChange('social_data', { ...input.social_data, city: e.target.value })}
              />
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium">Kode Pos</label>
              <input
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                type="text"
                value={input.social_data?.postal_code || ''}
                onChange={(e) => handleChange('social_data', { ...input.social_data, postal_code: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Berat Badan</label>
              <input
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                type="number"
                value={input.social_data?.weight || ''}
                onChange={(e) => handleChange('social_data', { ...input.social_data, weight: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <h2>Emergency Contact</h2>
        <hr />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div>
              <label className="block text-sm font-medium">Nama Kontak</label>
              <input
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                type="text"
                value={input.emergency_contact?.contact_name || ''}
                onChange={(e) => handleChange('emergency_contact', { ...input.emergency_contact, contact_name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">No. Telp</label>
              <input
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                type="text"
                value={input.emergency_contact?.phone_number || ''}
                onChange={(e) => handleChange('emergency_contact', { ...input.emergency_contact, phone_number: e.target.value })}
              />
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium">Alamat</label>
              <input
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
                type="text"
                value={input.emergency_contact?.address || ''}
                onChange={(e) => handleChange('emergency_contact', { ...input.emergency_contact, address: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Kota</label>
              <input
                type="text"
                value={input.emergency_contact?.city || ''}
                onChange={(e) => handleChange('emergency_contact', { ...input.emergency_contact, city: e.target.value })}
                className="border p-2 rounded-md w-full shadow-sm mr-2 focus:ring-2 focus:ring-mint-400 focus:outline-none focus:border-none border-gray-800"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-moonstone-100 text-davysGray-800 py-2 rounded hover:bg-mint-300 transition my-4"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default PatientForm;
