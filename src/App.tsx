import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Clock, CreditCard, Smartphone, FileCheck, UserCheck, ArrowRight } from 'lucide-react';
import Navbar from './components/Navbar';
import LoanApplication from './components/LoanApplication';
import { ModernForm } from './components/ModernForm';
import LoanApprovalToast from './components/LoanApprovalToast';
import PrivateRoute from './components/PrivateRoute';
import AuthModal from './components/AuthModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function HomePage() {
  const navigate = useNavigate();
  const { user, setShowAuthModal } = useAuth();

  const handleButtonClick = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      navigate('/apply');
    }
  };

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure Process",
      description: "Bank-level security protocols to protect your data"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Quick Approval",
      description: "Get approved in minutes, not days"
    },
    {
      icon: <CreditCard className="w-6 h-6 text-primary" />,
      title: "Flexible Terms",
      description: "Customizable loan terms that fit your needs"
    }
  ];

  const quickFeatures = [
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "No CRB Check",
      description: "Get approved regardless of your credit history"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "No Guarantors",
      description: "Quick loans without the need for guarantors"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "MPESA Disbursement",
      description: "Instant money transfer to your MPESA"
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "No Paperwork",
      description: "100% digital application process"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50/30 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 max-w-xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Quick & Easy
                <span className="text-primary block">Financial Solutions</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Get instant loans up to KES 100,000 directly to your M-PESA. No paperwork, no guarantor needed.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleButtonClick}
                  className="bg-[#4052FF] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#4052FF]/90 transition-colors flex items-center gap-2"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={handleButtonClick}
                  className="border-2 border-[#4052FF] text-[#4052FF] px-8 py-3 rounded-lg font-medium hover:bg-[#4052FF] hover:text-white transition-colors"
                >
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex-1 relative"
            >
              <div className="relative">
                {/* Main Floating Image */}
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [-2, 2, -2]
                  }}
                  transition={{ 
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity
                  }}
                  className="relative z-10"
                >
                  <img
                    src="/homeimage.jpg"
                    alt="MKOPO FAST LOAN"
                    className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl"
                  />
                  
                  {/* Decorative Gradient Overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#FF6B00]/10 to-transparent pointer-events-none" />
                  
                  {/* Decorative Circles */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      duration: 8,
                      ease: "easeInOut",
                      repeat: Infinity
                    }}
                    className="absolute -z-10 -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#FF6B00]/20 to-transparent blur-xl"
                  />
                  <motion.div
                    animate={{ scale: [1.2, 1, 1.2] }}
                    transition={{ 
                      duration: 8,
                      ease: "easeInOut",
                      repeat: Infinity
                    }}
                    className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-tr from-[#FF6B00]/20 to-transparent blur-xl"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Background Decorations */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity
              }}
              className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent -z-10"
            />
          </div>
        </div>
      </section>

      {/* Quick Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-secondary-dark mb-4">
              Quick Loan Features
            </h2>
            <p className="text-xl text-secondary-dark/80">
              Experience hassle-free borrowing with our streamlined process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {quickFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:bg-primary hover:text-white group transition-all duration-300 cursor-pointer"
              >
                <div className="text-primary group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                <p className="text-secondary-dark/70 group-hover:text-white/90 transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-secondary-dark mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-secondary-dark/80">
              Experience the future of lending with our innovative platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center hover:shadow-2xl transition-all duration-300"
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-lg text-secondary-dark/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section with Modern Form */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-secondary-dark mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-secondary-dark/80">
              Have questions? We're here to help
            </p>
          </motion.div>
          <ModernForm />
        </div>
      </section>
    </div>
  );
}

function AppContent() {
  const { showAuthModal, setShowAuthModal, handleAuthSuccess } = useAuth();
  const navigate = useNavigate();

  const onAuthSuccess = () => {
    handleAuthSuccess();
    navigate('/apply');
  };

  return (
    <div className="relative">
      <Navbar />
      <LoanApprovalToast />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/apply"
            element={
              <PrivateRoute>
                <LoanApplication />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={onAuthSuccess}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;