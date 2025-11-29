import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sprout, Mail, ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';
import OTPInput from '../components/OTPInput';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [maxResends] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from localStorage (set during signup)
    const pendingEmail = localStorage.getItem('pendingEmail');
    if (pendingEmail) {
      setEmail(pendingEmail);
    } else {
      // If no pending email, redirect to signup
      navigate('/signup');
      return;
    }

    // Start initial countdown
    setCountdown(60);
  }, [navigate]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOTPComplete = (otpValue) => {
    setOtp(otpValue);
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await authAPI.verifyOTP({ email, otp });
      
      if (response.success) {
        toast.success('Email verified successfully! Welcome to Rythu Dipo!');
        localStorage.removeItem('pendingEmail');
        navigate('/', { replace: true });
      } else {
        toast.error(response.message || 'Invalid OTP');
        setOtp('');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      const errorMessage = error.response?.data?.message || 'Invalid or expired OTP';
      toast.error(errorMessage);
      setOtp('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) {
      toast.error(`Please wait ${countdown} seconds before requesting a new OTP`);
      return;
    }

    if (resendCount >= maxResends) {
      toast.error('Maximum resend limit reached. Please try signing up again.');
      return;
    }

    setIsResending(true);
    
    try {
      const response = await authAPI.resendOTP(email);
      
      if (response.success) {
        toast.success('New OTP sent to your email');
        setResendCount(prev => prev + 1);
        setCountdown(60);
        setOtp('');
      } else {
        toast.error(response.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to send OTP';
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const maskEmail = (email) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    const maskedUsername = username.slice(0, 2) + '*'.repeat(username.length - 2);
    return `${maskedUsername}@${domain}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-600 p-3 rounded-full">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-sm font-medium text-green-600 mt-1">
            {maskEmail(email)}
          </p>
        </div>

        {/* OTP Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            {/* OTP Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Enter Verification Code
              </label>
              <OTPInput
                length={6}
                onComplete={handleOTPComplete}
                disabled={isLoading}
                autoFocus={true}
              />
              <p className="text-xs text-gray-500 text-center mt-2">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            {/* Timer and Resend */}
            <div className="text-center">
              {countdown > 0 ? (
                <div className="text-sm text-gray-600">
                  Resend OTP in <span className="font-medium text-green-600">{formatTime(countdown)}</span>
                </div>
              ) : (
                <button
                  onClick={handleResendOTP}
                  disabled={isResending || resendCount >= maxResends}
                  className="text-sm text-green-600 hover:text-green-500 font-medium disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                >
                  {isResending ? (
                    <>
                      <div className="loader w-4 h-4" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4" />
                      <span>Resend OTP</span>
                    </>
                  )}
                </button>
              )}
              
              {resendCount > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Resends used: {resendCount}/{maxResends}
                </p>
              )}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerifyOTP}
              disabled={isLoading || otp.length !== 6}
              className="w-full btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="loader w-5 h-5 mr-2" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Verify Email
                </>
              )}
            </button>

            {/* Back to Signup */}
            <div className="text-center pt-4">
              <Link
                to="/signup"
                className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Signup
              </Link>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Didn't receive the OTP?</p>
            <ul className="text-xs space-y-1 text-yellow-700">
              <li>• Check your spam/junk folder</li>
              <li>• Make sure you entered the correct email address</li>
              <li>• Wait a few minutes for the email to arrive</li>
              <li>• Click "Resend OTP" if the timer expires</li>
            </ul>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            The verification code will expire in 10 minutes.
            Keep this page open to complete verification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
