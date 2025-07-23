import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No data found", 
  description = "There's nothing to display at the moment.", 
  action,
  actionLabel = "Refresh",
  icon = "FileX"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="premium-card rounded-2xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-gradient-to-r from-gray-100 to-gray-200 p-4">
            <ApperIcon name={icon} className="h-12 w-12 text-gray-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        {action && (
          <Button onClick={action} variant="primary" className="w-full">
            <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Empty;