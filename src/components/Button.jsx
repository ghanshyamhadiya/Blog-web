import React from 'react';

function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  isLoading = false,
  ...props
}) {
  return (
    <button 
      className={`
        px-6 py-3 rounded-lg font-medium relative overflow-hidden
        transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
        ${bgColor} ${textColor} 
        hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed
        ${className}
      `} 
      type={type} 
      disabled={isLoading}
      {...props}
    >
      <div className="relative z-10 flex items-center justify-center">
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </div>
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
    </button>
  );
}

export default Button;