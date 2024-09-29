import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bgimg from '../../images/bgimg2.jpeg'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState(''); // For forgot password
  const [resetMessage, setResetMessage] = useState(''); // For showing reset messages
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Toggle forgot password view
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
        if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
        //email validation
        if(!email.includes('@gmail.com')&&!email.includes('@yahoo.com')){
          setError('invalid email format')
          return;
        }

    try {
      const response = await fetch('http://localhost:5000/api/v1/login/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, user } = data;
        // Store token and user data in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', user.name);
        localStorage.setItem('email', user.email);
        localStorage.setItem('image', user.image);
        navigate('/home');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error logging in. Please try again.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setResetMessage('Please enter your email');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await response.json();
      if (response.ok) {
        setResetMessage('Reset link sent successfully. Check your email.');
      } else {
        setResetMessage(data.message || 'Failed to send reset link');
      }
    } catch (err) {
      console.error('Error:', err);
      setResetMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center p-32 h-screen" style={{
      backgroundImage: `url(${bgimg})`, // Replace with your image URL
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className='px-[32px] flex items-center flex-col sm:px-[70px] py-16 bg-gray-300 bg-opacity-80 shadow-lg shadow-blue-400'>
        <h1 className="text-3xl sm:text-4xl mb-4 font-semibold mb-14">Login</h1>

        {!showForgotPassword ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[300px]  mb-2 p-2 border sm:w-[400px] border-gray-300 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[300px]  mb-2 p-2 border sm:w-[400px] border-gray-300 rounded"
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            <h4 className='text-[14px]'>
              Not a member? <Link to="/Register" className='text-green-600 text-[19px]'>Register</Link>
            </h4>
            <div className='flex items-center justify-center'>
              <button
                onClick={handleLogin}
                className="bg-[#c72092] text-white w-[100px] sm:w-[150px] hover:bg-pink-900 px-4 py-2 rounded mt-4"
              >
                Login
              </button>
            </div>
            <p className="text-blue-600 mt-4 cursor-pointer" onClick={() => setShowForgotPassword(true)}>
              Forgot Password?
            </p>
          </>
        ) : (
          <div>
            <h2 className="text-2xl mb-4">Reset Password</h2>
            <input
              type="email"
              placeholder="Enter your email to reset password"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="mb-2 p-2 w-[400px] border border-gray-300 rounded"
              required
            />
            {resetMessage && <p className="text-red-500">{resetMessage}</p>}
            <div className='flex items-center justify-center'>
              <button
                onClick={handleForgotPassword}
                className="bg-[#c72092] text-white w-[150px] hover:bg-pink-900 px-4 py-2 rounded mt-4"
              >
                Send Reset Link
              </button>
            </div>
            <p className="text-blue-600 mt-4 cursor-pointer" onClick={() => setShowForgotPassword(false)}>
              Back to Login
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
