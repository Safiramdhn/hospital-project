'use client';
import React from 'react';
import useAuth from '../../../hooks/Auth';
import PatientDetailComponent from './Detail';
import PatientDetailHeaderComponent from './Header';
import { useParams } from 'next/navigation';

const PatientDetailPage = () => {
  const isAuthenticated = useAuth();
  const params = useParams();
  const patientID = params.id ? parseInt(params.id as string) : undefined;

  if (!isAuthenticated) {
    return <div>You are not authenticated. Please login to access this page.</div>;
  }

  return (
    <div className="bg-moonstone-200 flex flex-col">
      {/* Header Section */}
      <PatientDetailHeaderComponent />
      
      {/* Main section */}
      <PatientDetailComponent patientID={patientID}/>
    </div>
  );
};

export default PatientDetailPage;