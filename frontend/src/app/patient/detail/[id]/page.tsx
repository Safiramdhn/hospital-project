'use client';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/Auth';
import PatientDetailComponent from './Detail';
import PatientDetailHeaderComponent from './Header';
import { useParams } from 'next/navigation';
import axios from 'axios';

const PatientDetailPage = () => {
  const isAuthenticated = useAuth();
  const params = useParams();
  const patientID = params.id ? parseInt(params.id as string) : undefined;
  const [patientName, setPatientName] = useState('');
  
  const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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