// app/login/page.tsx
'use client';

import React, { useState } from 'react';
import axios from 'axios';

import LoginHeaderComponent from './Header';

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiURL}/auth/login`, { email, password });
      // save token in cookies
      if (response.data && response.data.token !== '') {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        // Redirect to outpatient form
        window.location.href = '/outpatient-registration';
      } else if (response.data && response.data.message !== '') {
        alert(response.data.message);
        // clear form fields
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (axios.isAxiosError(error) && error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-mint-100">
      <LoginHeaderComponent />
      <div className="flex items-center justify-center mt-20">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-charcoal-500 mb-6">Login Pegawai</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-moonstone-500"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-moonstone-500"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-moonstone-600 text-black font-semibold rounded-md hover:bg-moonstone-700 focus:outline-none focus:ring-2 focus:ring-moonstone-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
