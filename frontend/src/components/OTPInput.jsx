import React, { useState, useRef, useEffect } from 'react';

const OTPInput = ({ 
  length = 6, 
  onComplete, 
  disabled = false, 
  autoFocus = true,
  placeholder = '○'
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    // Call onComplete when all fields are filled
    const otpValue = otp.join('');
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  }, [otp, length, onComplete]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    const { key } = e;
    
    // Handle backspace
    if (key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      
      if (otp[index]) {
        // If current field has value, clear it
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // If current field is empty, move to previous and clear it
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
    
    // Handle arrow keys
    if (key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const pasteValue = pasteData.replace(/\D/g, ''); // Remove non-digits
    
    if (pasteValue) {
      const newOtp = [...otp];
      const pasteLength = Math.min(pasteValue.length, length);
      
      for (let i = 0; i < pasteLength; i++) {
        newOtp[i] = pasteValue[i];
      }
      
      setOtp(newOtp);
      
      // Focus the next empty input or the last input
      const nextIndex = Math.min(pasteLength, length - 1);
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          ref={(ref) => (inputRefs.current[index] = ref)}
          value={value}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onFocus={handleFocus}
          disabled={disabled}
          maxLength={1}
          className={`
            w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg
            transition-all duration-200
            ${value 
              ? 'border-green-500 bg-green-50 text-green-700' 
              : 'border-gray-300 bg-white text-gray-700'
            }
            ${disabled 
              ? 'bg-gray-100 cursor-not-allowed opacity-50' 
              : 'hover:border-green-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-20'
            }
          `}
          placeholder={!value ? placeholder : ''}
          autoComplete="off"
          inputMode="numeric"
          pattern="[0-9]*"
        />
      ))}
    </div>
  );
};

export default OTPInput;
