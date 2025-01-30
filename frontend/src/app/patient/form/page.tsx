'use client';
import React from 'react';
import CreatePatientHeaderComponent from './Header';
import useAuth from '../../hooks/Auth';
import PatientForm from './Form';

const CreatePatientPage = () => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <div>You are not authenticated. Please login to access this page.</div>;
  }

  return (
    <div className="flex flex-col bg-moonstone-100/50">
      {/* Header Section */}
      <CreatePatientHeaderComponent />
      
      {/* Main section */}
      <PatientForm/>
    </div>
  );
};

export default CreatePatientPage;
