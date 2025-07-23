import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";
import userAnalyticsService from "@/services/api/userAnalyticsService";

const UserAnalytics = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortField, setSortField] = useState("userEmail");
  const [sortDirection, setSortDirection] = useState("asc");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await userAnalyticsService.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Failed to load user analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "signupDate" || sortField === "lastActivity") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const calculateSummaryStats = () => {
    const totalUsers = users.length;
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const activeUsersThisWeek = users.filter(user => 
      new Date(user.lastActivity) >= weekAgo
    ).length;
    
    const avgAppsPerUser = users.length > 0 
      ? Math.round(users.reduce((sum, user) => sum + user.totalApps, 0) / users.length * 10) / 10
      : 0;

    return { totalUsers, activeUsersThisWeek, avgAppsPerUser };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getPlanBadgeVariant = (plan) => {
    switch (plan) {
      case "Enterprise":
        return "success";
      case "Pro":
        return "primary";
      case "Basic":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getActivityColor = (lastActivity) => {
    const now = new Date();
    const activityDate = new Date(lastActivity);
    const diffDays = Math.floor((now - activityDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return "text-success-500";
    if (diffDays <= 7) return "text-warning-500";
    return "text-gray-500";
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors duration-200"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <div className="flex flex-col">
          <ApperIcon 
            name="ChevronUp" 
            size={12}
            className={cn(
              "transition-colors duration-200",
              sortField === field && sortDirection === "asc" 
                ? "text-primary-500" 
                : "text-gray-300"
            )}
          />
          <ApperIcon 
            name="ChevronDown" 
            size={12}
            className={cn(
              "-mt-1 transition-colors duration-200",
              sortField === field && sortDirection === "desc" 
                ? "text-primary-500" 
                : "text-gray-300"
            )}
          />
        </div>
      </div>
    </th>
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadUsers} />;
  }

  if (users.length === 0) {
    return (
      <Empty
        title="No user data"
        description="User analytics data is not available at the moment."
        action={loadUsers}
        actionLabel="Refresh Data"
        icon="Users"
      />
    );
  }

  const { totalUsers, activeUsersThisWeek, avgAppsPerUser } = calculateSummaryStats();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="premium-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Users" className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-bold text-gray-900">{totalUsers}</span>
            <span className="text-sm text-gray-600 mb-1">registered</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="premium-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active This Week</h3>
            <div className="w-10 h-10 bg-gradient-to-br from-success-500 to-success-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Activity" className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-bold text-gray-900">{activeUsersThisWeek}</span>
            <span className="text-sm text-gray-600 mb-1">users</span>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-success-600 font-medium">
              {totalUsers > 0 ? Math.round((activeUsersThisWeek / totalUsers) * 100) : 0}% of total
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="premium-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Avg Apps per User</h3>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Smartphone" className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-bold text-gray-900">{avgAppsPerUser}</span>
            <span className="text-sm text-gray-600 mb-1">apps</span>
          </div>
        </motion.div>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="premium-card rounded-xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">User Analytics</h2>
          <p className="text-gray-600 text-sm mt-1">Detailed user information and activity metrics</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <SortableHeader field="userEmail">User Email</SortableHeader>
                <SortableHeader field="company">Company</SortableHeader>
                <SortableHeader field="planType">Plan Type</SortableHeader>
                <SortableHeader field="totalApps">Total Apps</SortableHeader>
                <SortableHeader field="creditsUsed">Credits Used</SortableHeader>
                <SortableHeader field="signupDate">Signup Date</SortableHeader>
                <SortableHeader field="lastActivity">Last Activity</SortableHeader>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedUsers.map((user, index) => (
                <motion.tr
                  key={user.Id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">
                          {user.userEmail.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{user.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getPlanBadgeVariant(user.planType)}>
                      {user.planType}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.totalApps}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.creditsUsed.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(user.signupDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={cn("text-sm font-medium", getActivityColor(user.lastActivity))}>
                      {formatDate(user.lastActivity)}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserAnalytics;