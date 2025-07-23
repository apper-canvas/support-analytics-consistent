import "@/index.css";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
const AppDetailsModal = ({ app, onClose }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getPlanBadgeVariant = (plan) => {
    switch (plan.toLowerCase()) {
      case "enterprise": return "primary";
      case "pro": return "success";
      case "basic": return "warning";
      case "free": return "default";
      default: return "default";
    }
  };

  const getChatAnalysisStatusVariant = (status) => {
    switch (status) {
      case "smooth_progress": return "success";
      case "needs_guidance": return "info";
      case "frustrated": return "warning";
      case "stuck": return "warning";
      case "abandonment_risk": return "error";
      default: return "default";
    }
  };

const formatChatAnalysisStatus = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

const getLastActivityColor = (lastActivity) => {
  const date = new Date(lastActivity);
  const now = new Date();
  const diffHours = (now - date) / (1000 * 60 * 60);
  
  if (diffHours < 1) return "text-green-600";
  if (diffHours < 24) return "text-yellow-600";
  return "text-red-600";
};
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatShortDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Generate mock activity timeline
  const generateActivityTimeline = () => {
    const activities = [
      { type: "message", description: "User sent message", time: app.lastActivity },
      { type: "analysis", description: "Chat analysis completed", time: new Date(new Date(app.lastActivity).getTime() - 2 * 60 * 60 * 1000).toISOString() },
      { type: "connection", description: "Database connected", time: new Date(new Date(app.lastActivity).getTime() - 4 * 60 * 60 * 1000).toISOString() },
      { type: "created", description: "App created", time: new Date(new Date(app.lastActivity).getTime() - 24 * 60 * 60 * 1000).toISOString() }
    ];
    return activities;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "message": return "MessageSquare";
      case "analysis": return "Brain";
      case "connection": return "Database";
      case "created": return "Plus";
      default: return "Clock";
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "message": return "bg-blue-100 text-blue-600";
      case "analysis": return "bg-purple-100 text-purple-600";
      case "connection": return "bg-green-100 text-green-600";
      case "created": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="Smartphone" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{app.appName}</h2>
                <p className="text-sm text-gray-600">ID: {app.Id}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ApperIcon name="X" className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* User Details */}
                <div className="premium-card p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <ApperIcon name="User" className="h-5 w-5 mr-2 text-primary-500" />
                    User Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Email:</span>
                      <span className="text-sm text-gray-900">{app.userEmail}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Plan:</span>
                      <Badge variant={getPlanBadgeVariant(app.plan)}>{app.plan}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Category:</span>
                      <Badge variant="default">{app.category}</Badge>
                    </div>
                  </div>
                </div>

                {/* App Description */}
                <div className="premium-card p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <ApperIcon name="FileText" className="h-5 w-5 mr-2 text-primary-500" />
                    App Description
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    This {app.category.toLowerCase()} application serves as a comprehensive solution for user engagement and support. 
                    Built with modern architecture and integrated with our advanced chat analysis system, it provides real-time 
                    insights into user behavior and satisfaction levels.
                  </p>
                </div>

                {/* Chat Analysis */}
                <div className="premium-card p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <ApperIcon name="Brain" className="h-5 w-5 mr-2 text-primary-500" />
                    Chat Analysis Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Current Status:</span>
                      <Badge variant={getChatAnalysisStatusVariant(app.chatAnalysisStatus)}>
                        {formatChatAnalysisStatus(app.chatAnalysisStatus)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Total Messages:</span>
                      <div className="flex items-center">
                        <ApperIcon name="MessageSquare" className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-semibold text-gray-900">{app.messagesCount}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Database:</span>
                      <div className="flex items-center">
                        {app.dbConnected ? (
                          <>
                            <ApperIcon name="Check" className="h-4 w-4 text-green-600 mr-2" />
                            <span className="text-sm font-medium text-green-600">Connected</span>
                          </>
                        ) : (
                          <>
                            <ApperIcon name="X" className="h-4 w-4 text-red-600 mr-2" />
                            <span className="text-sm font-medium text-red-600">Disconnected</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Recent Activity Timeline */}
                <div className="premium-card p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <ApperIcon name="Clock" className="h-5 w-5 mr-2 text-primary-500" />
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {generateActivityTimeline().map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                          getActivityColor(activity.type)
                        )}>
                          <ApperIcon name={getActivityIcon(activity.type)} className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                          <p className="text-xs text-gray-500">{formatShortDate(activity.time)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message History Summary */}
                <div className="premium-card p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <ApperIcon name="MessageCircle" className="h-5 w-5 mr-2 text-primary-500" />
                    Message History Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Total Messages</p>
                        <p className="text-xs text-gray-600">All time</p>
                      </div>
                      <span className="text-2xl font-bold text-primary-600">{app.messagesCount}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <p className="text-sm font-medium text-blue-900">This Week</p>
                        <p className="text-lg font-bold text-blue-600">{Math.floor(app.messagesCount * 0.3)}</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg text-center">
                        <p className="text-sm font-medium text-green-900">This Month</p>
                        <p className="text-lg font-bold text-green-600">{Math.floor(app.messagesCount * 0.7)}</p>
</div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Last Activity:</span>
                        <span className={cn("font-medium", getLastActivityColor(app.lastActivity))}>
                          {formatDate(app.lastActivity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary">
              <ApperIcon name="MessageSquare" className="h-4 w-4 mr-2" />
              View Messages
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AppDetailsModal;