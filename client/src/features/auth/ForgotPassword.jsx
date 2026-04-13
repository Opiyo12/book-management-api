import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      alert('Please enter your email')
      return
    }

    // TODO: connect to backend
    console.log('Reset link sent to:', email)
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 w-full max-w-md'>
        
        <h2 className='text-xl font-bold text-center mb-2 text-gray-700'>
          Reset Password
        </h2>
        <p className='text-sm text-center text-gray-500 mb-6'>
          Enter your email to receive a reset link
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mb-4'
          >
            Send Reset Link
          </button>
        </form>

        <p
          onClick={() => navigate('/')}
          className='text-center text-sm text-blue-600 hover:underline cursor-pointer'
        >
          Back to Login
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword