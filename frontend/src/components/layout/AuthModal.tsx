import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AuthModal: React.FC = () => {
  const { isModalOpen, closeModal, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register-user';
      const payload = isLogin ? { email, password } : { name, email, password };
      
      const response = await api.post(endpoint, payload);
      login(response.data.token, response.data);
      closeModal();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/google', { token: credentialResponse.credential });
      login(response.data.token, response.data);
      closeModal();
    } catch (error) {
      setError('Google Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-montserrat text-primary">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-500 mt-2">
              {isLogin ? 'Sign in to access your saved properties' : 'Join Urban Edge to find your dream land'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-center text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 p-3 pl-12 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none" 
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-3 pl-12 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none" 
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-3 pl-12 rounded-xl focus:ring-2 focus:ring-cta focus:outline-none" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
          </div>

          <div className="flex justify-center">
             <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google Login Failed')}
                shape="circle"
                width="100%"
              />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-cta font-bold ml-2 hover:underline"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </div>
          
          <div className="mt-6 text-center pt-6 border-t border-gray-100">
             <Link to="/login" onClick={closeModal} className="text-xs text-gray-400 hover:text-primary font-bold uppercase tracking-wider">
               Are you an Admin? Login here
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
