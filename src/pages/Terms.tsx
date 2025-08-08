import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-luxury-dark text-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-luxury font-bold text-white mb-6">Terms of Service</h1>
        <p className="mb-4">These terms govern your use of our website and services.</p>
        <h2 className="text-2xl font-bold text-white mt-8 mb-3">Use of the Site</h2>
        <p className="mb-4">You agree not to misuse the site or its content.</p>
        <h2 className="text-2xl font-bold text-white mt-8 mb-3">Liability</h2>
        <p className="mb-4">We make no warranties regarding completeness or accuracy of content.</p>
        <h2 className="text-2xl font-bold text-white mt-8 mb-3">Contact</h2>
        <p>For questions, contact info@benluxuryagency.com.</p>
      </div>
    </div>
  );
};

export default Terms;