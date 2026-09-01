import React, { useState, useEffect } from 'react'; // useEffect import kiya hai
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/api';
import { useGoogleLogin } from '@react-oauth/google'; 
import axios from 'axios'; 

const Signup = () => {
  const [role, setRole] = useState('member');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state for loader

  const { login } = useAuth();
  const navigate = useNavigate();

  // 🔴 NAYA CODE: Agar user already logged in hai, toh turant dashboard bhej do
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  // Handle Real Google Signup (Updated with Live Render Backend URL)
  const googleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        // 1. Google ke API se user ki profile details nikalna
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        const { name, email } = res.data;
        
        // 2. Apne Live Render Backend par data aur selected 'role' bhejna
        const backendRes = await axios.post('https://codexpert2-backend.onrender.com/api/auth/google-login', { 
          name, 
          email, 
          role 
        });

        // 3. Asli JWT Token aur User data save karna
        localStorage.setItem('token', backendRes.data.token);
        login(backendRes.data.user);
        
        // 🔴 NAYA CODE: replace: true add kiya history clean rakhne ke liye
        navigate('/dashboard', { replace: true });
        
      } catch (err) {
        console.error('Google signup backend fetch failed:', err);
        setError('Google signup failed. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      console.log('Signup Failed');
      setError('Google authentication was cancelled or failed.');
      setLoading(false);
    },
  });

  // Password Validation & Standard Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Check length (8 to 15 characters)
    if (password.length < 8 || password.length > 15) {
      setError('Password must be between 8 and 15 characters long.');
      return;
    }

    // Check special character
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!hasSpecialChar) {
      setError('Password must include at least one special character.');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      const response = await registerUser({ name, email, password, role });
      alert(response.data.message); 
      
      // 🔴 NAYA CODE: replace: true add kiya yaha bhi
      navigate('/login', { replace: true }); 
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-4 py-12 relative overflow-hidden">
      
      {/* Background Decorative Glow Effects */}
      <div className="absolute top-1/4 left-5 md:left-20 w-72 h-72 bg-[var(--color-zoom-blue)]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-5 md:right-20 w-80 h-80 bg-[var(--color-zoom-azure)]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md relative z-10">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Create Account</h2>
          <p className="text-slate-500 text-sm">Start building with CodeXpert AI</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          
          {/* 1. Role Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Select Your Role</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('leader')}
                className={`py-2.5 px-4 rounded-xl font-semibold text-sm border transition-all cursor-pointer ${
                  role === 'leader'
                    ? 'bg-[var(--color-zoom-blue)] text-white border-[var(--color-zoom-blue)] shadow-md'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                👔 Team Leader
              </button>
              <button
                type="button"
                onClick={() => setRole('member')}
                className={`py-2.5 px-4 rounded-xl font-semibold text-sm border transition-all cursor-pointer ${
                  role === 'member'
                    ? 'bg-[var(--color-zoom-blue)] text-white border-[var(--color-zoom-blue)] shadow-md'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                💻 Team Member
              </button>
            </div>
          </div>

          {/* Google Sign Up Button */}
          <button 
            type="button"
            onClick={() => { setLoading(true); googleSignup(); }}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl transition-all shadow-sm mt-1 cursor-pointer disabled:opacity-50"
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
          <div className="flex items-center my-2">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="px-3 text-xs text-slate-400 uppercase tracking-wider font-medium">Or continue with email</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            {/* Email ID */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 focus:border-[var(--color-zoom-blue)] transition-all bg-slate-50"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Shiv" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 focus:border-[var(--color-zoom-blue)] transition-all bg-slate-50"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="8-15 chars with special symbol" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-zoom-blue)]/50 focus:border-[var(--color-zoom-blue)] transition-all bg-slate-50 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm font-medium cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Must be 8-15 characters and contain a special character.</p>
            </div>

            {/* Signup Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                `Sign Up as ${role === 'leader' ? 'Team Leader' : 'Team Member'}`
              )}
            </button>
          </form>

        </div>

        <div className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--color-zoom-blue)] font-bold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;