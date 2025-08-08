import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-luxury-dark text-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-luxury font-bold text-white mb-6">Privacy Policy</h1>
        <p className="mb-4">We value your privacy. This page outlines how we collect, use, and protect your personal information.</p>
        <h2 className="text-2xl font-bold text-white mt-8 mb-3">Information We Collect</h2>
        <p className="mb-4">Contact details and project preferences submitted via our forms.</p>
        <h2 className="text-2xl font-bold text-white mt-8 mb-3">How We Use Information</h2>
        <p className="mb-4">To respond to inquiries, provide personalized recommendations, and improve our services.</p>
        <h2 className="text-2xl font-bold text-white mt-8 mb-3">Contact</h2>
        <p>If you have questions, contact us at info@benluxuryagency.com.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;