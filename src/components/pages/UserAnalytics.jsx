import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import userAnalyticsService from "@/services/api/userAnalyticsService";

const UserAnalytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await userAnalyticsService.getAll();
      setAnalytics(data);
    } catch (err) {
      setError(err.message || "Failed to load user analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadAnalytics} />;
  }

  if (analytics.length === 0) {
    return (
      <Empty
        title="No analytics data"
        description="User analytics data is not available at the moment."
        action={loadAnalytics}
        actionLabel="Refresh Data"
        icon="BarChart3"
      />
    );
  }

  const chartOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: false
      }
    },
    colors: ["#4F46E5", "#10B981", "#F59E0B"],
    stroke: {
      curve: "smooth",
      width: 3
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1
      }
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px"
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px"
        }
      }
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4
    },
    legend: {
      position: "top",
      horizontalAlign: "right"
    }
  };

  const chartSeries = analytics.map((item, index) => ({
    name: `User ${index + 1}`,
    data: item.dailyActiveUsers
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analytics.map((item, index) => (
          <motion.div
            key={item.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="premium-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">User {index + 1}</h3>
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="User" className="h-5 w-5 text-white" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg Session</span>
                <span className="text-lg font-bold text-gray-900">{item.avgSessionDuration}min</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Daily Users</span>
                <span className="text-lg font-bold text-primary-500">
                  {Math.max(...item.dailyActiveUsers)}
                </span>
              </div>
              
              <div>
                <span className="text-sm text-gray-600">Top Features</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.topFeatures.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="premium-card rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Daily Active Users</h2>
            <p className="text-gray-600 text-sm">User activity over the past week</p>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="TrendingUp" className="h-5 w-5 text-success-500" />
            <span className="text-sm font-medium text-success-600">+12% vs last week</span>
          </div>
        </div>
        
        <div className="h-80">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height="100%"
          />
        </div>
      </motion.div>

      {/* Feature Usage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="premium-card rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analytics.flatMap(item => item.topFeatures)
            .reduce((acc, feature) => {
              acc[feature] = (acc[feature] || 0) + 1;
              return acc;
            }, {})
            && Object.entries(
              analytics.flatMap(item => item.topFeatures)
                .reduce((acc, feature) => {
                  acc[feature] = (acc[feature] || 0) + 1;
                  return acc;
                }, {})
            )
            .sort(([,a], [,b]) => b - a)
            .slice(0, 6)
            .map(([feature, count], index) => (
              <div key={feature} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">{count}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{feature}</p>
                  <p className="text-sm text-gray-600">Used by {count} users</p>
                </div>
              </div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserAnalytics;