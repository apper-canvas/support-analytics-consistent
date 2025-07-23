import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const AppsTable = ({ apps, loading, onRowClick }) => {
  const [sortField, setSortField] = useState("appName");
  const [sortDirection, setSortDirection] = useState("asc");
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedApps = [...apps].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === "string") {
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
  });

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

  const getActivityColor = (lastActivity) => {
    const date = new Date(lastActivity);
    const now = new Date();
    const diffHours = (now - date) / (1000 * 60 * 60);
    
    if (diffHours < 1) return "text-green-600";
    if (diffHours < 24) return "text-yellow-600";
    return "text-red-600";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-gray-900 transition-colors select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <div className="flex flex-col">
          <ApperIcon 
            name="ChevronUp" 
            className={cn(
              "h-3 w-3 transition-colors",
              sortField === field && sortDirection === "asc" 
                ? "text-primary-500" 
                : "text-gray-400"
            )} 
          />
          <ApperIcon 
            name="ChevronDown" 
            className={cn(
              "h-3 w-3 -mt-1 transition-colors",
              sortField === field && sortDirection === "desc" 
                ? "text-primary-500" 
                : "text-gray-400"
            )} 
          />
        </div>
      </div>
    </th>
  );

  return (
    <div className="premium-card rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
<SortableHeader field="appName">App Name</SortableHeader>
              <SortableHeader field="category">Category</SortableHeader>
              <SortableHeader field="userEmail">User Email</SortableHeader>
              <SortableHeader field="plan">Plan</SortableHeader>
              <SortableHeader field="messagesCount">Messages</SortableHeader>
              <SortableHeader field="chatAnalysisStatus">Chat Analysis Status</SortableHeader>
              <SortableHeader field="lastActivity">Last Activity</SortableHeader>
              <SortableHeader field="dbConnected">DB Connected</SortableHeader>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
{sortedApps.map((app, index) => (
              <motion.tr
                key={app.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                onClick={() => onRowClick && onRowClick(app)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-3">
                      <ApperIcon name="Smartphone" className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{app.appName}</div>
                      <div className="text-xs text-gray-500">ID: {app.Id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="default">{app.category}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{app.userEmail}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getPlanBadgeVariant(app.plan)}>{app.plan}</Badge>
                </td>
<td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <ApperIcon name="MessageSquare" className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{app.messagesCount}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getChatAnalysisStatusVariant(app.chatAnalysisStatus)}>
                    {formatChatAnalysisStatus(app.chatAnalysisStatus)}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={cn("text-sm font-medium", getActivityColor(app.lastActivity))}>
                    {formatDate(app.lastActivity)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {app.dbConnected ? (
                      <div className="flex items-center">
                        <ApperIcon name="Check" className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-600">Connected</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <ApperIcon name="X" className="h-4 w-4 text-red-600 mr-2" />
                        <span className="text-sm font-medium text-red-600">Disconnected</span>
                      </div>
                    )}
                  </div>
                </td>
<td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRowClick && onRowClick(app);
                      }}
                    >
                      <ApperIcon name="Eye" className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRowClick && onRowClick(app);
                      }}
                    >
                      <ApperIcon name="MoreHorizontal" className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppsTable;