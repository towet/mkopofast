import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, ArrowRight, ArrowLeft } from 'lucide-react';

interface MpesaPaymentProps {
  onNext: () => void;
  onBack: () => void;
  amount: number;
  loanAmount: number;
}

const MPESA_TILL_NUMBER = "5619610";

const MpesaPayment: React.FC<MpesaPaymentProps> = ({ onNext, onBack, amount, loanAmount }) => {
  const [step, setStep] = useState<'instructions' | 'verification'>('instructions');
  const [verificationCode, setVerificationCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const copyTillNumber = () => {
    navigator.clipboard.writeText(MPESA_TILL_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateTransactionCode = (code: string) => {
    // Must start with 'T' or 't' and be at least 10 characters long
    const isValid = /^[Tt].{9,}$/.test(code);
    if (!isValid) {
      setError('Invalid transaction code');
    } else {
      setError('');
    }
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateTransactionCode(verificationCode)) {
      onNext();
    }
  };

  const steps = [
    {
      title: "Open M-PESA",
      description: "Go to M-PESA menu on your phone",
      icon: <ArrowRight className="w-6 h-6" />
    },
    {
      title: "Select Lipa na M-PESA",
      description: "Choose the Lipa na M-PESA option",
      icon: <ArrowRight className="w-6 h-6" />
    },
    {
      title: "Buy Goods and Services",
      description: "Select Buy Goods and Services",
      icon: <ArrowRight className="w-6 h-6" />
    },
    {
      title: "Enter Till Number",
      description: `Input Till Number: ${MPESA_TILL_NUMBER}`,
      icon: <Copy className="w-6 h-6" />
    }
  ];

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">M-PESA Payment</h2>
        <p className="text-gray-600">Follow the steps below to complete your payment</p>
      </div>

      {step === 'instructions' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {/* Steps */}
          <div className="space-y-6 mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-[#1a8d46]/10 rounded-full flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Till Number Section */}
          <div className="bg-[#1a8d46]/5 p-6 rounded-xl mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Till Number</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm text-[#1a8d46] hover:text-[#1a8d46]/80"
                onClick={copyTillNumber}
              >
                {copied ? (
                  <span className="text-green-500">Copied!</span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Copy className="w-4 h-4" /> Copy
                  </span>
                )}
              </motion.button>
            </div>
            <div className="text-3xl font-bold font-mono text-[#1a8d46]">{MPESA_TILL_NUMBER}</div>
          </div>

          {/* Amount Section */}
          <div className="bg-[#1a8d46]/5 p-6 rounded-xl mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#1a8d46] font-medium">Savings Amount to Deposit</span>
              <span className="text-2xl font-bold text-[#1a8d46]">KES {amount}</span>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              For loan amount: KES {loanAmount.toLocaleString()}
            </div>
          </div>

          <motion.button
            onClick={() => setStep('verification')}
            className="w-full bg-[#1a8d46] text-white p-4 rounded-xl font-medium hover:bg-[#1a8d46]/90 transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            I've Made the Payment
          </motion.button>

          <button
            onClick={onBack}
            className="w-full mt-4 text-gray-600 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter M-PESA Transaction Code
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(e.target.value.toUpperCase());
                if (error || e.target.value.length > 0) {
                  validateTransactionCode(e.target.value);
                }
              }}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a8d46] focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter M-PESA transaction code"
              required
              minLength={10}
              pattern="^[Tt].{9,}$"
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>

          <motion.button
            type="submit"
            className="w-full bg-[#1a8d46] text-white p-4 rounded-xl font-medium hover:bg-[#1a8d46]/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!!error}
          >
            Verify Payment
          </motion.button>

          <button
            type="button"
            onClick={() => setStep('instructions')}
            className="w-full text-gray-600 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Instructions
          </button>
        </motion.form>
      )}
    </div>
  );
};

export default MpesaPayment;
