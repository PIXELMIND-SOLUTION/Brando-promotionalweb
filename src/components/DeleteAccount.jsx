import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle, Shield, Loader2, Phone, MessageSquare, AlertCircle, ArrowLeft } from 'lucide-react';

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
    { id: 'privacy', label: 'Privacy concerns', icon: Shield },
    { id: 'notifications', label: 'Too many notifications', icon: MessageSquare },
    { id: 'alternative', label: 'Found a better alternative', icon: AlertCircle },
    { id: 'security', label: 'Account security issues', icon: AlertTriangle },
    { id: 'temporary', label: 'Temporary account closure', icon: Clock },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 px-6 py-6 sm:px-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Delete Account</h2>
              <p className="text-red-100 text-sm mt-0.5">This action is irreversible</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-red-800">Error</h4>
                  <p className="text-sm text-red-700 mt-0.5">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-green-800">Success</h4>
                  <p className="text-sm text-green-700 mt-0.5">{success}</p>
                </div>
              </div>
            </div>
          )}

          {step === 'request' ? (
            <form onSubmit={handleDeleteRequest} className="space-y-6">
              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                    disabled={!!propMobileNumber}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-200 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Reason Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Reason for Deletion <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {predefinedReasons.map((r) => {
                    const Icon = r.icon;
                    return (
                      <label
                        key={r.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          reason === r.label
                            ? 'border-red-500 bg-red-50 shadow-md'
                            : 'border-gray-200 hover:border-red-300 hover:bg-red-50/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="reason"
                          value={r.label}
                          checked={reason === r.label}
                          onChange={() => handleReasonChange(r.label)}
                          className="w-4 h-4 text-red-600 focus:ring-red-500"
                        />
                        <Icon className={`w-4 h-4 ${reason === r.label ? 'text-red-600' : 'text-gray-500'}`} />
                        <span className={`text-sm ${reason === r.label ? 'text-red-900 font-medium' : 'text-gray-700'}`}>
                          {r.label}
                        </span>
                      </label>
                    );
                  })}
                  <label
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      reason === 'Other'
                        ? 'border-red-500 bg-red-50 shadow-md'
                        : 'border-gray-200 hover:border-red-300 hover:bg-red-50/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reason"
                      value="Other"
                      checked={reason === 'Other'}
                      onChange={() => handleReasonChange('Other')}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <MessageSquare className={`w-4 h-4 ${reason === 'Other' ? 'text-red-600' : 'text-gray-500'}`} />
                    <span className={`text-sm ${reason === 'Other' ? 'text-red-900 font-medium' : 'text-gray-700'}`}>
                      Other
                    </span>
                  </label>
                </div>
              </div>

              {/* Custom Reason */}
              {reason === 'Other' && (
                <div className="animate-in fade-in duration-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Please specify <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Tell us why you want to delete your account..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-200 resize-none"
                  />
                </div>
              )}

              {/* Warning Message */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-200">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-800">Permanent Deletion Warning</h4>
                    <p className="text-xs text-red-600 mt-1 leading-relaxed">
                      Your account will be permanently deleted. All your data, including messages, files, and personal information, will be removed and cannot be recovered.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Verification Code...
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyAndDelete} className="space-y-6">
              {/* Verified Mobile Display */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-800">Verification Sent</p>
                    <p className="text-sm text-green-700">
                      Code sent to {mobileNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* OTP Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                  Enter Verification Code
                </label>
                <div className="flex gap-2 sm:gap-4 justify-center">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-200"
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Enter the 4-digit code sent to your mobile number
                </p>
              </div>

              {/* Final Warning */}
              <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-4 border-2 border-red-300">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-red-200 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-800">⚠️ Confirmation Required</h4>
                    <p className="text-xs text-red-700 mt-1 leading-relaxed font-medium">
                      This action is permanent and cannot be undone. Clicking the delete button will immediately remove all your data from our servers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep('request');
                    setOtp(['', '', '', '']);
                    setError('');
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
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

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-in-from-bottom-4 {
          from {
            transform: translateY(1rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slide-in-from-top-2 {
          from {
            transform: translateY(-0.5rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-in {
          animation-duration: 0.3s;
          animation-fill-mode: both;
        }
        
        .fade-in {
          animation-name: fade-in;
        }
        
        .slide-in-from-bottom-4 {
          animation-name: slide-in-from-bottom-4;
        }
        
        .slide-in-from-top-2 {
          animation-name: slide-in-from-top-2;
        }
      `}</style>
    </div>
  );
};

// Missing Clock icon component
const Clock = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default DeleteAccount;