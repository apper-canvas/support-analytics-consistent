import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const MobileSidebar = ({ isOpen, onClose }) => {
  const navigation = [
    { name: "Apps Overview", to: "/", icon: "LayoutDashboard" },
    { name: "User Analytics", to: "/user-analytics", icon: "Users" },
    { name: "AI Log Analysis", to: "/ai-logs", icon: "Brain" },
    { name: "Reports", to: "/reports", icon: "FileText" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 w-64 h-full bg-gray-900 z-50 lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="BarChart3" className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg">Support Analytics</h1>
                  <p className="text-gray-400 text-xs">Dashboard</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1"
              >
                <ApperIcon name="X" className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                      isActive
                        ? "bg-primary-500 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <ApperIcon 
                        name={item.icon} 
                        className={cn(
                          "h-5 w-5 mr-3 transition-colors duration-200",
                          isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                        )} 
                      />
                      {item.name}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                  <ApperIcon name="User" className="h-4 w-4 text-gray-300" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Support Team</p>
                  <p className="text-gray-400 text-xs">Administrator</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;