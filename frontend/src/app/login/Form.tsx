'use client';
import React, { useState } from 'react';
import { LoginService } from '@/services/loginService';

const LoginFormComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await LoginService.login(email, password);

      if (response?.token) {
        localStorage.setItem('Authorization', response.token);

        // Redirect to outpatient registration page
        window.location.href = '/outpatient/form';
      } else {
        console.error('Error logging in:', response);
        throw new Error("Invalid credentials or missing token.");
      }
    } catch (error) {
      console.error('Login error:', error);
      setEmail('');
      setPassword('');

      alert(error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-charcoal-500 mb-6">Login Pegawai</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-charcoal-700">
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
            <label htmlFor="password" className="block text-sm font-medium text-charcoal-700">
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
  );
};

export default LoginFormComponent;
