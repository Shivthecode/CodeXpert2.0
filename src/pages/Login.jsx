import React, { useState } from 'react'; 
import { Link, useNavigate, Navigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
// 🔴 NAYI APIs IMPORT KI HAIN YAHAN:
import { loginUser, forgotPassword, verifyOtp, resetPassword } from '../services/api';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'; 

const Login = () => {
  const [step, setStep] = useState('login'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); 

  const { login, user } = useAuth(); 
  const navigate = useNavigate();

  // Agar user logged in hai, toh bina render kiye seedha bhej do
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Handle Real Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        const { name, email } = res.data;
        
        const backendRes = await axios.post('https://codexpert2-backend.onrender.com/api/auth/google-login', { 
          name, 
          email, 
          role: 'member' 
        });

        localStorage.setItem('token', backendRes.data.token);
        login(backendRes.data.user);
        navigate('/dashboard', { replace: true });
        
      } catch (error) {
        console.error('Google login backend fetch failed:', error);
        setMessage('Google login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      console.log('Login Failed');
      setMessage('Google authentication was cancelled or failed.');
      setLoading(false);
    },
  });

  // Handle Standard Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Please fill in all fields.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.data.token);
      login(response.data.user);
      navigate('/dashboard', { replace: true });
      
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 🔴 ASLI FORGOT PASSWORD HANDLERS
  // ==========================================

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }
    
    setLoading(true);
    setMessage('');
    try {
      await forgotPassword({ email }); // API Call
      setMessage(`OTP has been sent to ${email}`);
      setStep('forgot-otp');
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setMessage('Please enter the verification code.');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      await verifyOtp({ email, otp }); // API Call
      setMessage('');
      setStep('new-password');
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      await resetPassword({ email, newPassword }); // API Call
      alert('Password updated successfully! Please login with your new password.');
      setStep('login');
      setNewPassword('');
      setOtp('');
      setMessage('');
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-5 md:left-20 w-72 h-72 bg-[var(--color-zoom-blue)]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-5 md:right-20 w-80 h-80 bg-[var(--color-zoom-azure)]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md relative z-10">
        
        {step === 'login' && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-500 text-sm">Log in to your CodeXpert account</p>
            </div>

            {message && <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl font-medium">{message}</div>}

            <button 
              type="button"
              onClick={() => { setLoading(true); googleLogin(); }} 
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl transition-all shadow-sm mb-4 cursor-pointer disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.16 21.32 7.22 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.18C.43 8.12 0 9.83 0 12s.43 3.88 1.18 5.4l4.09-3.16z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.16 2.68 1.18 6.6l4.09 3.16c.95-2.85 3.6-4.96 6.73-4.96z"/>
              </svg>
              Continue with Google
            </button>

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
                disabled={loading}
                className="w-full bg-[var(--color-zoom-blue)] hover:bg-[var(--color-zoom-azure)] text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-1 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
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
                disabled={loading}
                className="w-full bg-[var(--color-zoom-blue)] hover:bg-[var(--color-zoom-azure)] text-white font-bold py-3.5 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
              
              <button 
                type="button" 
                onClick={() => setStep('login')} 
                className="text-center text-sm text-slate-500 hover:text-slate-800 font-medium mt-2 cursor-pointer"
              >
                Back to Login
              </button>
            </form>
          </>
        )}

        {step === 'forgot-otp' && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Enter OTP</h2>
              <p className="text-slate-500 text-sm">We've sent a 4-digit code to <span className="font-semibold text-slate-700">{email}</span></p>
            </div>

            {message && <div className="mb-4 p-3 bg-blue-50 text-blue-700 text-xs rounded-xl font-medium">{message}</div>}

            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Verification Code</label>
                <input 
                  type="text" 
                  maxLength="4"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="e.g. 4821" 
                  className="w-full px-4 py-3 text-center tracking-widest text-lg font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 bg-slate-50"
                />
              </div>

              <button 
                type="submit"
                disabled={loading} 
                className="w-full bg-[var(--color-zoom-blue)] hover:bg-[var(--color-zoom-azure)] text-white font-bold py-3.5 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          </>
        )}

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
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? 'Updating...' : 'Update Password & Login'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;