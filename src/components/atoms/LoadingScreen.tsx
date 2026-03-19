import React from 'react';
import { RefreshCw } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <RefreshCw className="w-8 h-8 animate-spin text-primary-500 mb-4" />
      <p className="text-gray-500 dark:text-gray-400">加载中...</p>
    </div>
  );
};

export default LoadingScreen;