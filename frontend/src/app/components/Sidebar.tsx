'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component
import { Employee } from '@/types/employee';

import NavItemComponent from './NavItem';
import { EmployeeService } from '@/services/employeeService';

const SideBarComponent: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const getEmployeeProfile = async () => {
      try {
        const response = await EmployeeService.getProfile();
        setEmployee(response);
        setError(null);
      } catch (error) {
        setError('Failed to fetch employee profile');
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    getEmployeeProfile();
  }, []);

  // Handle scrolling event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60); // Adjust threshold as needed
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`w-64 h-screen bg-moonstone-500 text-charcoal-700 flex flex-col fixed left-0 transition-all duration-300 ${
        isScrolled ? 'top-0 h-screen' : 'top-15'
      }`}
    >
      <div className="px-2 py-4 inline-flex justify-evenly items-center border-b border-davysGray-500">
        <div className="w-12 h-12">
          <Image
            src={`https://eu.ui-avatars.com/api/?name=${employee?.name || 'User'}&size=250`}
            alt={employee?.name || 'User'}
            width={48} 
            height={48}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <p className="text-md font-semibold text-justify flex-1 ml-3">
          {loading ? 'Loading...' : error ? 'Error' : employee?.name || 'No Name'}
        </p>
      </div>

      <nav className="px-4 py-4">
        <ul className="space-y-2">
          <NavItemComponent href="/outpatient/form" icon="/enrollment_17386533.png" label="Outpatient Registration Form" />
          <NavItemComponent href="/outpatient" icon="/calendar_11815700.png" label="Outpatient List" />
          <NavItemComponent href="/patient" icon="/medical_1512910.png" label="Patient List" />
        </ul>
      </nav>
    </div>
  );
};

export default SideBarComponent;