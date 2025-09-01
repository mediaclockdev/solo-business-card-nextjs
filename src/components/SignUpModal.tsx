"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext"; // adjust path as per your project
import { useToast } from "@/contexts/ToastContext"; // adjust path as per your project
import { X, Eye, EyeOff } from "lucide-react";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowSignIn: () => void;
}

export default function SignUpModal({ isOpen, onClose, onShowSignIn }: SignUpModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { success, error } = await register(name, email, password);

    let msg = "Something went wrong!";

    if (error?.trim() === "auth/email-already-in-use") {
      msg = "A user with this email already exists!";
    }

    if (success) {
      onClose();
    } else {
      showToast(msg, "error");
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
      <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg p-6 py-10 mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-all duration-200 ease-in-out shadow-xl rounded-[10px] box-border border-0 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-7 text-center">Create your account</h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

           <label className="block text-[rgb(55,65,81)] font-medium text-xs sm:text-sm leading-5 mb-1">
            Business Category <span className="text-red-500">*</span>
          </label>
          <select className="w-full p-2 pl-3 pr-3 border appearance-none border-gray-300 rounded-lg text-xs sm:text-sm leading-6 mb-3 p-2">
            <option value="">Select Category</option>
            <option value="ARTS/MUSIC/WRITING">Arts/Music/Writing</option>
            <option value="BANKING/FINANCE">Banking/Finance</option>
            <option value="BUSINESS MGT">Business Mgt</option>
            <option value="COMMUNICATION">Communication</option>
            <option value="CONSTRUCTION">Construction</option>
            <option value="EDUCATION">Education</option>
            <option value="ENGINEERING">Engineering</option>
            <option value="ENTERTAINMENT">Entertainment</option>
            <option value="FARMING">Farming</option>
            <option value="GOV/POLITICS">Gov/Politics</option>
            <option value="HEALTHCARE">Healthcare</option>
            <option value="HOSPITALITY">Hospitality</option>
            <option value="IT/SOFTWARE">IT/Software</option>
            <option value="LEGAL">Legal</option>
            <option value="MANUFACTURING">Manufacturing</option>
            <option value="MILITARY">Military</option>
            <option value="NON-PROFIT">Non-Profit</option>
            <option value="REAL ESTATE">Real Estate</option>
            <option value="RETAIL">Retail</option>
            <option value="SALES/MARKETING">Sales/Marketing</option>
            <option value="SCIENCE/RESEARCH">Science/Research</option>
            <option value="SELF-EMPLOYED">Self-Employed</option>
            <option value="STUDENT">Student</option>
            <option value="TRANSPORTATION">Transportation</option>
            <option value="RETIRED">Retired</option>
            <option value="OTHER">Other</option>
          </select>

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
          {/* Container for password input and toggle */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full p-2 border border-gray-300 rounded pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-gray-500 text-[15px] leading-5 mt-[5px]">
              Must be at least 6 characters
            </p>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 -top-6 flex items-center pr-2 text-gray-400 hover:text-gray-600 cursor-pointer"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-2 text-center">
          By signing up, you agree to our{" "}
          <a href="/terms-of-service" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => {
              onClose();
              onShowSignIn();
            }}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
