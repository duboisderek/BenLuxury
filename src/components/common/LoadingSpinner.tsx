import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-4',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`animate-spin rounded-full border-t-transparent border-gold-400 ${sizeMap[size]}`} />
      {text && <span className="text-gray-500 text-sm">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;