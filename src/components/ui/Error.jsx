import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="premium-card rounded-2xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-gradient-to-r from-error-100 to-red-100 p-3">
            <ApperIcon name="AlertTriangle" className="h-8 w-8 text-error-500" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {onRetry && (
          <Button onClick={onRetry} variant="primary" className="w-full">
            <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default Error;