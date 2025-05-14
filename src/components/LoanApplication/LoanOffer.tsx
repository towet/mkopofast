import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface LoanOfferProps {
  onNext: (amount: number, savingsDeposit: number) => void;
  onBack: () => void;
}

const loanOptions = [
  { amount: 3000, savingsDeposit: 100 },
  { amount: 5000, savingsDeposit: 150 },
  { amount: 7000, savingsDeposit: 200 },
  { amount: 10000, savingsDeposit: 250 },
  { amount: 12000, savingsDeposit: 275 },
  { amount: 14000, savingsDeposit: 300 }
];

const INTEREST_RATE = 0.10; // 10% interest rate

const LoanOffer: React.FC<LoanOfferProps> = ({ onNext, onBack }) => {
  const [selectedAmount, setSelectedAmount] = useState(loanOptions[0].amount);
  const [qualifyingAmount, setQualifyingAmount] = useState(0);
  const selectedOption = loanOptions.find(option => option.amount === selectedAmount) || loanOptions[0];

  // Calculate interest and total repayment
  const interestAmount = selectedAmount * INTEREST_RATE;
  const totalRepayment = selectedAmount + interestAmount;

  useEffect(() => {
    // Set qualifying amount only once when component mounts
    // Ensure qualifying loan amount is less than 15,000 KES
    const validOptions = loanOptions.filter(option => option.amount < 15000);
    const randomIndex = Math.floor(Math.random() * validOptions.length);
    setQualifyingAmount(validOptions[randomIndex].amount);
  }, []); // Empty dependency array means this runs only once on mount

  const handleNext = () => {
    onNext(selectedAmount, selectedOption.savingsDeposit);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Select Loan Amount</h2>
      
      <div className="bg-[#1a8d46]/5 p-6 rounded-xl mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[#1a8d46] font-medium">Qualifying Amount</span>
          <motion.span 
            key={qualifyingAmount}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-[#1a8d46]"
          >
            KES {qualifyingAmount.toLocaleString()}
          </motion.span>
        </div>
        <p className="text-sm text-gray-600">
          This is your qualifying loan amount based on our assessment
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {loanOptions.map((option) => (
          <motion.button
            key={option.amount}
            onClick={() => setSelectedAmount(option.amount)}
            className={`w-full p-4 rounded-xl flex justify-between items-center border-2 transition-colors ${
              selectedAmount === option.amount 
                ? 'border-[#1a8d46] bg-[#1a8d46]/5' 
                : 'border-gray-200 hover:border-[#1a8d46]/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div>
              <div className="font-medium">KES {option.amount.toLocaleString()}</div>
              <div className="text-sm text-gray-600">
                Savings Deposit: KES {option.savingsDeposit.toLocaleString()}
              </div>
            </div>
            {selectedAmount === option.amount && (
              <div className="w-4 h-4 rounded-full bg-[#1a8d46]" />
            )}
          </motion.button>
        ))}
      </div>

      <div className="bg-[#1a8d46]/5 p-6 rounded-xl mb-8">
        <h3 className="font-semibold mb-4">Loan Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Loan Amount</span>
            <span className="font-medium">KES {selectedAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Interest (10%)</span>
            <span className="font-medium">KES {interestAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Savings Deposit</span>
            <span className="font-medium">KES {selectedOption.savingsDeposit.toLocaleString()}</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between font-semibold">
              <span>Total to Repay</span>
              <span>KES {totalRepayment.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <motion.button
          onClick={handleNext}
          className="flex-1 bg-[#1a8d46] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1a8d46]/90 transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LoanOffer;