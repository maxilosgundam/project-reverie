'use client'

import { useState } from 'react';
import { useSignin } from '../hooks/useSignin';


const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signin, isLoading, error} = useSignin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    await signin(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg border border-gray-300">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-2xl font-bold text-center text-gray-800 font-serif">Sign In</h3>
        <p className="text-center text-gray-600">Enter your credentials to access your account.</p>
          
          <div className="space-y-4">
          {error && <div className='text-red-500 text-sm'>{error}</div>}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <button 
          disabled={isLoading}
          className="w-full px-4 py-2 text-white bg-amber-600 hover:bg-amber-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
        >
          Sign In
        </button>
        </form>
      </div>
    </div>
  );
}

export default Signin