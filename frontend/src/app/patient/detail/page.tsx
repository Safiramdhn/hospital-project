'use client';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/Auth';
import PatientDetailComponent from './Detail';
import PatientDetailHeaderComponent from './Header';
import { useRouter } from 'next/navigation';

const PateintDetailPage = () => {
  const isAuthenticated = useAuth();
  const router = useRouter();
  // const { id } = router.query; // Get patient ID from URL
  const [patientName, setPatientName] = useState('');

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  // useEffect(() => {
  //   const fetchPatient = async () => {
  //     if (!id) return;

  //     try {
  //       const response = await fetch(`/api/patients/${id}`);
  //       if (!response.ok) throw new Error('Failed to fetch patient');
        
  //       const data = await response.json();
  //       setPatientName(`${data.first_name} ${data.last_name}`);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchPatient();
  // }, [id]);

  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <PatientDetailHeaderComponent patientName={patientName} />
      
      {/* Main section */}
      <PatientDetailComponent/>
    </div>
  );
};

export default PateintDetailPage;
