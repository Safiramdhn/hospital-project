'use client';
import React from 'react';
import MainHeader from '../components/Header';
import SideBar from '../components/Sidebar';
import OutpatientList from './OutpatientList';
import useAuth from '../hooks/Auth';

const OutpatientRegistrationPage = () => {
    const isAuthenticated = useAuth();
    
    if (!isAuthenticated) {
        return <div>You are not authenticated. Please login to access this page.</div>;
    }

    return (
        <div className="h-screen flex flex-col">
            {/* Header Section */}
            <MainHeader />

            {/* Sidebar + Content Wrapper */}
            <div className="flex flex-1">
                {/* Sticky Sidebar */}
                <SideBar />

                {/* Scrollable Main Content */}
                <div className="flex-1 overflow-auto p-6">
                    <OutpatientList />
                </div>
            </div>
        </div>
    );
};

export default OutpatientRegistrationPage;
