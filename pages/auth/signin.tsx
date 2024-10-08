"use client";
import { useState } from 'react';
import { account } from '../../config/appwriteConfig'; 
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await account.createSession(email, password);
      router.push('/'); 
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occured');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSignIn} className="w-full max-w-sm">
        <h2 className="mb-4 text-2xl font-semibold">Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border"
          required
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;

