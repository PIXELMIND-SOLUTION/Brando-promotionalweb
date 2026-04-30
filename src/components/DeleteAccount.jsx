import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle, Shield, Loader2 } from 'lucide-react';



const DeleteAccount = ({ onClose, onSuccess, mobileNumber: propMobileNumber }) => {
  const [step, setStep] = useState('request');
  const [mobileNumber, setMobileNumber] = useState(propMobileNumber || '');
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const predefinedReasons = [
    'Privacy concerns',
    'Too many notifications',
    'Found a better alternative',
    'Account security issues',
    'Temporary account closure',
  ];

  const handleReasonChange = (selectedReason) => {
    setReason(selectedReason);
    if (selectedReason !== 'Other') {
      setCustomReason('');
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleDeleteRequest = async (e) => {
    e.preventDefault();
    
    if (!mobileNumber) {
      setError('Mobile number is required');
      return;
    }

    if (!reason && !customReason) {
      setError('Please select or provide a reason for deletion');
      return;
    }

    setLoading(true);
    setError('');

    const finalReason = reason === 'Other' ? customReason : reason;

    try {
      const response = await fetch('https://api.brando.org.in/api/auth/delete-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber,
          reason: finalReason,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Verification code sent to your mobile number');
        setStep('verify');
        setError('');
      } else {
        setError(data.message || 'Failed to send verification code');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndDelete = async (e) => {
    e.preventDefault();
    
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      setError('Please enter the complete 4-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.brando.org.in/api/auth/verify-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber,
          otp: otpString,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account deleted successfully');
        setTimeout(() => {
          if (onSuccess) onSuccess();
          if (onClose) onClose();
        }, 2000);
        window.refresh();
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-600 to-red-700 px-6 py-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Delete Account</h2>
          </div>
          <p className="text-red-100 text-sm mt-2 ml-12">
            This action is permanent and cannot be undone
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-green-700">{success}</span>
            </div>
          )}

          {step === 'request' ? (
            <form onSubmit={handleDeleteRequest} className="space-y-5">
              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter your mobile number"
                  disabled={!!propMobileNumber}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-gray-900 disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>

              {/* Reason Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Reason for Deletion <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {predefinedReasons.map((r) => (
                    <label key={r} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="reason"
                        value={r}
                        checked={reason === r}
                        onChange={() => handleReasonChange(r)}
                        className="w-4 h-4 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-gray-700">{r}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="reason"
                      value="Other"
                      checked={reason === 'Other'}
                      onChange={() => handleReasonChange('Other')}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-gray-700">Other</span>
                  </label>
                </div>
              </div>

              {/* Custom Reason */}
              {reason === 'Other' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Please specify <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Tell us why you want to delete your account..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all resize-none"
                  />
                </div>
              )}

              {/* Warning Message */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <Shield className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-600">
                  Your account will be permanently deleted. All your data, including messages and files, will be removed and cannot be recovered.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Code...
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyAndDelete} className="space-y-5">
              {/* Verified Mobile Display */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-700">
                  Verification code sent to {mobileNumber}
                </span>
              </div>

              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Verification Code
                </label>
                <div className="flex gap-3 justify-center">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-14 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Enter the 4-digit code sent to your mobile
                </p>
              </div>

              {/* Final Warning */}
              <div className="bg-red-100 border border-red-300 rounded-lg p-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-700 font-medium">
                  CONFIRMATION: This will permanently delete your account. Clicking below will immediately remove all your data.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep('request');
                    setOtp(['', '', '', '']);
                    setError('');
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Permanently Delete'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;