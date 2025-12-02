import React, { useState } from 'react';
import { X, Loader2, ShieldCheck } from 'lucide-react';
import { User } from '../types';
import { registerUser, loginUser } from '../services/authService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  isDark: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, isDark }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const user = await registerUser({
        name: 'Bat-Erdene',
        email: 'baterdene@gmail.com',
      });
      onLogin(user);
      onClose();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Register failed', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    try {
      setIsLoading(true);
      const user = await registerUser({
        name: 'System Administrator',
        email: 'admin@previsa.mn',
      });
      onLogin(user);
      onClose();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Admin login failed', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className={`relative w-full max-w-md p-8 rounded-xl shadow-2xl transform transition-all scale-100 ${isDark ? 'bg-navy-900 border border-navy-800 text-white' : 'bg-white text-navy-900'}`}>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold mb-2">Welcome to PreVisa MN</h2>
          <p className="text-sm opacity-80">Sign in to access premium tools and expert chat.</p>
        </div>

        <div className="space-y-4">
            <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg font-medium transition-all ${
                isDark 
                ? 'bg-white text-gray-800 hover:bg-gray-100' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            } shadow-sm hover:shadow-md`}
            >
            {isLoading ? (
                <Loader2 className="animate-spin" size={24} />
            ) : (
                <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                    />
                    <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                    />
                    <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                    />
                    <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                    />
                </svg>
                <span>Sign in with Google</span>
                </>
            )}
            </button>

            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                <span className="flex-shrink-0 mx-4 text-xs text-gray-400 uppercase">Or Preview As</span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            </div>

            <button
                onClick={handleAdminLogin}
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                    isDark 
                    ? 'bg-navy-800 text-gray-300 hover:bg-navy-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
                <ShieldCheck size={16} />
                <span>Sign in as Admin</span>
            </button>
        </div>
        
        <div className="mt-6 text-center text-xs opacity-60">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default LoginModal;