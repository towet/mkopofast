import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalDetails from './PersonalDetails';
import AdditionalInfo from './AdditionalInfo';
import Guarantors from './Guarantors';
import LoanOffer from './LoanOffer';
import MpesaPayment from './MpesaPayment';
import Confirmation from './Confirmation';
import ProgressStepper from './ProgressStepper';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const LoanApplication: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [savingsFee, setSavingsFee] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleLoanOfferComplete = (amount: number, fee: number) => {
    setSelectedAmount(amount);
    setSavingsFee(fee);
    nextStep();
  };

  const steps = [
    { 
      title: 'Personal Details', 
      component: <PersonalDetails onNext={nextStep} /> 
    },
    { 
      title: 'Additional Info', 
      component: <AdditionalInfo onNext={nextStep} onBack={prevStep} /> 
    },
    { 
      title: 'Guarantors', 
      component: <Guarantors onNext={nextStep} onBack={prevStep} /> 
    },
    { 
      title: 'Loan Offer', 
      component: <LoanOffer onNext={handleLoanOfferComplete} onBack={prevStep} /> 
    },
    { 
      title: 'Payment', 
      component: <MpesaPayment 
        onNext={nextStep} 
        onBack={prevStep} 
        amount={savingsFee}
        loanAmount={selectedAmount}
      /> 
    },
    {
      title: 'Confirmation',
      component: <Confirmation />
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50/30">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProgressStepper steps={steps.map(step => step.title)} currentStep={currentStep} />
        </motion.div>
        
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {steps[currentStep].component}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;