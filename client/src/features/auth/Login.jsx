import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../utils/auth';


function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()


  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      // Simulate API call latency for realistic button feedback.
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const user = {
        name: formData.username || "Brian",
        role: "root-user",
      };

      setUser(user);

      if (user.role === "root-user") {
        navigate("/super-admin");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        <h1 className="text-3xl font-bold text-center mb-2 text-slate-700">
          Book Management System
        </h1>
        <p className='text-center text-slate-500 mb-6'>Sign in to continue to your dashboard</p>
        <div className='bg-white/95 backdrop-blur shadow-xl rounded-2xl px-8 pt-8 pb-8 mb-4 border border-slate-100'>
          <h1 className='text-2xl font-bold text-center mb-6 text-slate-800'>Login</h1>
          <form onSubmit={handleLogin}>
            <div className='mb-4'>
              <label className='block text-slate-700 text-sm font-semibold mb-2' htmlFor='username'>
                Username
              </label>
              <input
                className='w-full py-2.5 px-3 text-slate-700 border border-slate-300 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                id='username'
                type='text'
                placeholder='Username'
                value={formData.username}
                onChange={handleChange}
                autoComplete='username'
                required
              />
            </div>
            <div className='mb-6'>
              <label className='block text-slate-700 text-sm font-semibold mb-2' htmlFor='password'>
                Password
              </label>
              <input
                className='w-full py-2.5 px-3 text-slate-700 border border-slate-300 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                id='password'
                type='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                autoComplete='current-password'
                required
              />
            </div>
            <button
              className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 transition flex items-center justify-center gap-2'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className='animate-spin h-5 w-5 text-white' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Login'
              )}
            </button>
            <p onClick={() => navigate('/forgot-password')} className='text-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer'>
              Forgot password?
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login