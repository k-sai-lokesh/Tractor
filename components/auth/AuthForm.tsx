"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

interface AuthFormProps {
  mode: "login" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (mode === "login") {
        const res = (await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/owner-dashboard",
        })) as any;
        if (res?.error) setError("Invalid email or password");
      } else {
        const name = formData.get("name") as string;
        const regRes = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await regRes.json();
        if (!regRes.ok) {
          setError(data.error || "Failed to create account");
          setIsLoading(false);
          return;
        }

        // Auto-login after signup
        await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/owner-dashboard",
        });
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "/owner-dashboard" });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 glass-card fade-in-up">
      <div className="text-center mb-8">
        <h1 className="section-heading mb-2">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="section-subheading">
          {mode === "login" 
            ? "Sign in to manage your tractor rentals" 
            : "Join the premier tractor leasing platform"}
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {/* Google Button */}
        <button 
          onClick={() => handleSocialLogin("google")}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all font-medium text-gray-700 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        {/* Microsoft Button */}
        <button 
          onClick={() => handleSocialLogin("microsoft-entra-id")}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all font-medium text-gray-700 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 23 23">
            <path fill="#f3f3f3" d="M0 0h23v23H0z" />
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
          Continue with Microsoft
        </button>

        {/* Apple Button */}
        <button 
          onClick={() => handleSocialLogin("apple")}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black hover:bg-gray-900 text-white rounded-xl transition-all font-medium shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.96.95-2.22 1.78-3.32 1.78-1.5 0-1.89-1-3.66-1-1.77 0-2.2 1-3.66 1-1.09 0-2.39-.81-3.32-1.78C1.41 18.23 0 15.39 0 12.05c0-5.32 3.46-8.23 6.84-8.23 1.77 0 3.35 1.09 4.39 1.09 1.04 0 2.89-1.09 4.39-1.09 1.41 0 2.6.43 3.46 1.34-2.8 1.63-2.34 5.37.49 6.27-.85 2-.17 4.09.48 6.85zM11.23 3.65c0-2 1.66-3.65 3.33-3.65.17 1.95-1.57 3.69-3.33 3.65z" />
          </svg>
          Continue with Apple
        </button>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-cream text-gray-500 uppercase tracking-wider font-semibold">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
            {error}
          </div>
        )}

        {mode === "signup" && (
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                name="name"
                type="text" 
                required 
                placeholder="John Doe"
                className="input-field pl-10"
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              name="email"
              type="email" 
              required 
              placeholder="name@example.com"
              className="input-field pl-10"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between ml-1">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            {mode === "login" && (
              <Link href="/forgot-password" title="Forgot Password" className="text-xs font-bold text-green hover:underline">
                Forgot password?
              </Link>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              name="password"
              type={showPassword ? "text" : "password"} 
              required 
              placeholder="••••••••"
              className="input-field pl-10 pr-10"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-1 cursor-pointer group">
          <input 
            type="checkbox" 
            id="remember" 
            className="w-4 h-4 rounded border-gray-300 text-green focus:ring-green cursor-pointer"
          />
          <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer group-hover:text-gray-900 transition-colors">
            Remember me
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="btn-primary w-full justify-center mt-2 group"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              {mode === "login" ? "Sign In" : "Sign Up"}
              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-bold text-green hover:underline">
              Sign up for free
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-green hover:underline">
              Sign in here
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
