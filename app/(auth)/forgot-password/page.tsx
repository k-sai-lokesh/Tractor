"use client";

import React, { useState } from "react";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mocking email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSent(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 wheat-bg font-sans">
      <div className="w-full max-w-md glass-card p-8 fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green/10 mb-4">
            <LockIcon className="w-8 h-8 text-green" />
          </div>
          <h1 className="section-heading mb-2">Forgot Password?</h1>
          <p className="section-subheading">
            {isSent 
              ? "Check your email for reset instructions" 
              : "No worries, we'll send you reset instructions."}
          </p>
        </div>

        {!isSent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-primary w-full justify-center group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Reset Password
                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40 group-hover:opacity-100 transition-opacity" />
                </>
              )}
            </button>

            <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-green transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </form>
        ) : (
          <div className="text-center space-y-6 py-4">
            <div className="flex justify-center text-green">
              <CheckCircle2 className="w-16 h-16" />
            </div>
            <p className="text-gray-600">
              We&apos;ve sent a password reset link to <span className="font-bold text-gray-900">{email}</span>.
            </p>
            <div className="space-y-4">
              <Link href="/login" className="btn-primary w-full justify-center">
                Return to Login
              </Link>
              <button 
                onClick={() => setIsSent(false)}
                className="text-sm font-bold text-green hover:underline"
              >
                Didn&apos;t receive it? Try again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}
