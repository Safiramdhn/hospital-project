'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

import { Patient } from '@/types/patient/patient';
import { PatientService } from '@/services/patientService';

const PatientListComponent: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const result = await PatientService.getAll();
        setPatients(result);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch patient data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/patient/form?id=${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await PatientService.delete(id);
        setPatients(patients.filter((patient) => patient.id !== id));
      } catch (err) {
        console.error(err);
        setError('Failed to delete patient');
      }
    }
  };

  const handleView = (id: number) => {
    router.push(`/patient/detail/${id}`);
  };

  return (
    <div className="w-full max-w-4xl ml-64">
      <h1 className="text-2xl font-bold mb-4">Patient List</h1>
      <hr />
      <button
        onClick={() => router.push('/patient/form')}
        className="w-40 bg-moonstone-100 text-davysGray-800 py-2 rounded hover:bg-mint-300 transition my-4"
      >
        Create Patient
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <p className="text-center text-davysGray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-mint-100">
                <th className="border p-2">No</th>
                <th className="border p-2">Patient Name</th>
                <th className="border p-2">MR Number</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((patient, index) => (
                  <tr className="hover:bg-gray-50" key={patient.id}>
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">{`${patient.first_name} ${patient.last_name}`}</td>
                    <td className="border p-2">{patient.mr_number}</td>
                    <td className="border p-2">
                      <div className="flex justify-center items-center">
                        <button
                          data-tooltip-id="view-tooltip"
                          data-tooltip-content="View Details"
                          className="w-10 text-davysGray-800 py-2 rounded"
                          onClick={() => handleView(patient.id)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>

                        <button
                          data-tooltip-id="edit-tooltip"
                          data-tooltip-content="Edit"
                          className="w-10 text-davysGray-800 py-2 rounded"
                          onClick={() => handleEdit(patient.id)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button
                          data-tooltip-id="delete-tooltip"
                          data-tooltip-content="Delete"
                          className="w-10 text-davysGray-800 py-2 rounded"
                          onClick={() => handleDelete(patient.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>

                        <Tooltip id="view-tooltip" place="bottom" />
                        <Tooltip id="edit-tooltip" place="bottom" />
                        <Tooltip id="delete-tooltip" place="bottom" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500">
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

export default PatientListComponent;
