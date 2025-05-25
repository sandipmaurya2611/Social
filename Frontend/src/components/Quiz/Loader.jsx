import React from 'react';

const Loader = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="text-2xl font-bold mb-4">Analyzing your responses...</div>
    <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-gray-600">Our AI is finding the perfect causes that match your passion...</p>
  </div>
);

export default Loader;
