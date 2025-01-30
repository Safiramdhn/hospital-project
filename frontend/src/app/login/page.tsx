'use client';

import React from 'react';

import LoginHeaderComponent from './Header';
import LoginFormComponent from './Form';


const LoginPage = () => {
  
  return (
    <div className="min-h-screen bg-mint-100">
      <LoginHeaderComponent />
      
      <LoginFormComponent/>
    </div>
  );
};

export default LoginPage;
