'use client';
import React from 'react';
import MainHeaderComponent from '../../components/Header';
import SideBarComponent from '../../components/Sidebar';
import OutpatientRegistrationForm from './Form';
import useAuth from '../../hooks/Auth';

const OutpatientRegistrationPage = () => {
    const isAuthenticated = useAuth();
    
    if (!isAuthenticated) {
        return <div>You are not authenticated. Please login to access this page.</div>;
    }

    return (
        <div className="h-screen flex flex-col">
            {/* Header Section */}
            <MainHeaderComponent />

            {/* Sidebar + Content Wrapper */}
            <div className="flex flex-1">
                {/* Sticky Sidebar */}
                <SideBarComponent />

                {/* Scrollable Main Content */}
                <div className="flex-1 overflow-auto p-6">
                    <OutpatientRegistrationForm />
                </div>
            </div>
        </div>
    );
};

export default OutpatientRegistrationPage;
