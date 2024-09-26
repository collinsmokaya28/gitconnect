"use client";

import { useState } from 'react';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in:', { email, password });
    // Implement login logic here
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-teal-500 text-white text-center py-4">
        <h2 className="text-2xl font-semibold">Login Form</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Email or Phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <i className="fas fa-user absolute left-3 top-3 text-gray-500"></i>
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <i className="fas fa-lock absolute left-3 top-3 text-gray-500"></i>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <Link href="#" className="text-teal-500 hover:underline">Forgot password?</Link>
        </div>
        <div className="mb-6">
          <input
            type="submit"
            value="Login"
            className="w-full py-3 bg-teal-500 text-white font-semibold rounded hover:bg-teal-600 cursor-pointer transition duration-200"
          />
        </div>
        <div className="text-center">
          <span className="text-gray-600">Not a member? </span>
          <Link href="/auth/signup" className="text-teal-500 hover:underline">Signup now</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

