import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'; 

const Login = () => {
  const [step, setStep] = useState('login'); // 'login', 'forgot-email', 'forgot-otp', 'new-password'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle Real Google Login (Updated with Production Backend API Connection)
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // 1. Google ke API se user ki profile details nikalna
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        const { name, email } = res.data;
        
        // 2. Apne backend par data bhejna (loginUser ya configured api service ka use karke)
        // Yahan hum loginUser ki tarah api import ya dynamic baseURL use kar rahe hain
        const backendRes = await loginUser.post('/auth/google-login', { 
          name, 
          email, 
          role: 'member' 
        });

        // 3. Asli JWT Token aur User data save karna
        localStorage.setItem('token', backendRes.data.token);
        login(backendRes.data.user);
        navigate('/dashboard');
        
      } catch (error) {
        console.error('Google login backend fetch failed:', error);
        setMessage('Google login failed. Please try again.');
      }
    },
    onError: () => {
      console.log('Login Failed');
      setMessage('Google authentication was cancelled or failed.');
    },
  });

  // Handle Standard Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Please fill in all fields.');
      return;
    }
    
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.data.token);
      login(response.data.user);
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid email or password!");
    }
  };

  // Step 1: Send OTP for Forgot Password
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }
    setMessage(`OTP sent to ${email} (Demo OTP: 1234)`);
    setStep('forgot-otp');
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== '1234') {
      setMessage('Invalid OTP. Please enter 1234.');
      return;
    }
    setMessage('');
    setStep('new-password');
  };

  // Step 3: Reset Password
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      return;
    }
    alert('Password updated successfully! Please login with your new password.');
    setStep('login');
    setNewPassword('');
    setEmail('');
    setPassword('');
    setMessage('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md">
        
        {/* 1. STANDARD LOGIN VIEW */}
        {step === 'login' && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-500 text-sm">Log in to your CodeXpert account</p>
            </div>

            {message && <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl font-medium">{message}</div>}

            {/* Google Login Button */}
            <button 
              type="button"
              onClick={() => googleLogin()} 
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl transition-all shadow-sm mb-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.16 21.32 7.22 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.18C.43 8.12 0 9.83 0 12s.43 3.88 1.18 5.4l4.09-3.16z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.16 2.68 1.18 6.6l4.09 3.16c.95-2.85 3.6-4.96 6.73-4.96z"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="px-3 text-xs text-slate-400 uppercase tracking-wider font-medium">Or continue with email</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 focus:border-[var(--color-zoom-blue)] transition-all bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 focus:border-[var(--color-zoom-blue)] transition-all bg-slate-50"
                />
                <div className="text-right mt-2">
                  <button 
                    type="button" 
                    onClick={() => { setStep('forgot-email'); setMessage(''); }} 
                    className="text-xs text-[var(--color-zoom-blue)] font-medium hover:underline bg-transparent border-none cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[var(--color-zoom-blue)] hover:bg-[var(--color-zoom-azure)] text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-1"
              >
                Log In
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[var(--color-zoom-blue)] font-bold hover:underline">
                Sign up for free
              </Link>
            </div>
          </>
        )}

        {/* 2. FORGOT PASSWORD - STEP 1: ENTER EMAIL */}
        {step === 'forgot-email' && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Reset Password</h2>
              <p className="text-slate-500 text-sm">Enter your email to receive an OTP verification code.</p>
            </div>

            {message && <div className="mb-4 p-3 bg-blue-50 text-blue-700 text-xs rounded-xl font-medium">{message}</div>}

            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 bg-slate-50"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[var(--color-zoom-blue)] hover:bg-[var(--color-zoom-azure)] text-white font-bold py-3.5 rounded-xl transition-all shadow-md"
              >
                Send OTP
              </button>
              
              <button 
                type="button" 
                onClick={() => setStep('login')} 
                className="text-center text-sm text-slate-500 hover:text-slate-800 font-medium mt-2"
              >
                Back to Login
              </button>
            </form>
          </>
        )}

        {/* 3. FORGOT PASSWORD - STEP 2: ENTER OTP */}
        {step === 'forgot-otp' && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Enter OTP</h2>
              <p className="text-slate-500 text-sm">We've sent a 4-digit code to <span className="font-semibold text-slate-700">{email}</span></p>
            </div>

            {message && <div className="mb-4 p-3 bg-blue-50 text-blue-700 text-xs rounded-xl font-medium">{message}</div>}

            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Verification Code (Try: 1234)</label>
                <input 
                  type="text" 
                  maxLength="4"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1234" 
                  className="w-full px-4 py-3 text-center tracking-widest text-lg font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 bg-slate-50"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[var(--color-zoom-blue)] hover:bg-[var(--color-zoom-azure)] text-white font-bold py-3.5 rounded-xl transition-all shadow-md"
              >
                Verify OTP
              </button>
            </form>
          </>
        )}

        {/* 4. FORGOT PASSWORD - STEP 3: NEW PASSWORD */}
        {step === 'new-password' && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">New Password</h2>
              <p className="text-slate-500 text-sm">Enter your new secure password below.</p>
            </div>

            {message && <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl font-medium">{message}</div>}

            <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                <input 
                  type="password" 
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 bg-slate-50"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all shadow-md"
              >
                Update Password & Login
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default Login;