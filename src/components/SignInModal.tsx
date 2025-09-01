"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext"; // ✅ adjust path as per your project
import { Lock } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowSignUp: () => void;
  message?: string;
}

export default function SignInModal({
  isOpen,
  onClose,
  onShowSignUp,
  message,
}: SignInModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { success, error } = await login(email, password);

    let errorMessage = "Something went wrong!";
    if (error?.trim() === "auth/invalid-credential") {
      errorMessage = "Invalid email or password!";
    }

    if (success) {
      onClose();
    } else {
      showToast(errorMessage, "error");
    }

    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-md max-w-md bg-white rounded-lg shadow-lg p-6 py-7 mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-all duration-200 ease-in-out shadow-xl rounded-[10px]"
        >
          ✕
        </button>

        {message && (
          <div className="bg-blue-100 p-3 my-4 flex justify-center rounded-md">
            <Lock className="w-6 h-6 text-blue-600 my-auto mr-2" />
            <div className="text-blue-600 font-small text-center">
              {message}
            </div>
          </div>
        )}

        <h2 className="text-gray-900 font-bold text-2xl leading-[40px] text-center mb-10">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full p-2 border border-gray-300 rounded pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 hover:text-gray-600 cursor-pointer"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-eye "
                  id="w2v-i"
                >
                  <path
                    d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                    id="w2v-0"
                  ></path>
                  <circle cx="12" cy="12" r="3" id="w2v-1"></circle>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-eye-off "
                  id="w2v-i"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" id="w2v-0"></path>
                  <path
                    d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                    id="w2v-1"
                  ></path>
                  <path
                    d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                    id="w2v-2"
                  ></path>
                  <line x1="2" x2="22" y1="2" y2="22" id="w2v-3"></line>
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => {
              onClose();
              onShowSignUp();
            }}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
