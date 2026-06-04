import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contextApi/AuthContext";
// import { AuthService } from "../services/auth.service";
import { loginUser, registerUser  } from "../services/apiServices";
import useApiCall from "../hooks/useApiCall";
import { 
  Eye, EyeOff, Lock, Mail, AlertCircle, 
  ArrowRight, Zap, Code2, MessageCircle 
} from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { callApi } = useApiCall();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(callApi, { email, password });
      if (response.success) {
        login(response.data.token, response.data.user);
        navigate("/");
      } else {
        setError(response.errMessage || "Login failed");
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.errMessage || 
        "Something went wrong. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>

      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000" />

        {/* Main Card */}
        <div className="relative z-10 w-full max-w-lg">
          {/* Card Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30 animate-pulse-slow" />
          
          <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />
            
            {/* Header */}
            <div className="text-center pt-8 pb-4 px-8">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-60 animate-pulse" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-500 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 duration-300">
                  <Zap size={40} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-gray-400 mt-2">Log in to track your job search progress</p>
            </div>

            {/* Form */}
            <div className="px-8 pb-8">
              {error && (
                <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm backdrop-blur-sm animate-shake">
                  <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                  <p className="flex-1">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div className="group">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <Mail size={14} className="text-purple-400" />
                    Email Address
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                    <input
                      type="email"
                      required
                      value={email}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="group">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <Lock size={14} className="text-purple-400" />
                    Password
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <a href="#" className="text-xs text-purple-400 hover:text-pink-400 transition-colors">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full group mt-2"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 blur-lg opacity-50 group-hover:opacity-75 transition-all duration-300" />
                  <div className="relative flex items-center justify-center gap-3 w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-sm transition-all duration-300 transform group-hover:scale-[1.02] group-active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-lg">
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
              </form>

              {/* Social Login Section (optional, matching register) */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-4 bg-gray-900/50 text-gray-500">Or continue with</span>
                  </div>
                </div>
                
              </div>

              {/* Register Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-purple-400 hover:text-pink-400 font-semibold transition-all duration-300 inline-flex items-center gap-1 group">
                    Create one now
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;