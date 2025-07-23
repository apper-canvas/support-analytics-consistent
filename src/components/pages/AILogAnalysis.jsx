import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import logEntriesService from "@/services/api/logEntriesService";

const AILogAnalysis = () => {
  const [sentimentTrends, setSentimentTrends] = useState(null);
  const [statusDistribution, setStatusDistribution] = useState(null);
  const [frustrationHeatmap, setFrustrationHeatmap] = useState(null);
  const [complexityHeatmap, setComplexityHeatmap] = useState(null);
  const [engagementPatterns, setEngagementPatterns] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("Last 30 days");

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [
        sentimentData,
        statusData,
        frustrationData,
        complexityData,
        engagementData
      ] = await Promise.all([
        logEntriesService.getSentimentTrends(),
        logEntriesService.getChatAnalysisStatusDistribution(),
        logEntriesService.getFrustrationHeatmap(),
        logEntriesService.getComplexityHeatmap(),
        logEntriesService.getUserEngagementPatterns()
      ]);

      setSentimentTrends(sentimentData);
      setStatusDistribution(statusData);
      setFrustrationHeatmap(frustrationData);
      setComplexityHeatmap(complexityData);
      setEngagementPatterns(engagementData);
    } catch (err) {
      setError(err.message || "Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const getIntensityColor = (intensity) => {
    if (intensity >= 4) return "bg-red-500";
    if (intensity >= 3) return "bg-orange-400";
    if (intensity >= 2) return "bg-yellow-400";
    return "bg-green-400";
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case "Critical": return "bg-red-600";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-400";
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadAnalytics} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="premium-card rounded-xl p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <ApperIcon name="BarChart3" className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Log Analysis Dashboard</h2>
              <p className="text-gray-600 text-sm">Advanced analytics and insights</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {sentimentTrends?.timeRanges.map((period) => (
              <Button
                key={period}
                variant={selectedTimePeriod === period ? "primary" : "ghost"}
                size="sm"
                onClick={() => setSelectedTimePeriod(period)}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sentiment Analysis Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="premium-card rounded-xl p-6"
      >
        <div className="flex items-center mb-6">
          <ApperIcon name="TrendingUp" className="h-6 w-6 text-blue-500 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Sentiment Analysis Trends</h3>
            <p className="text-sm text-gray-600">Across time periods</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sentimentTrends?.data.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">{item.period}</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600">Positive</span>
                  <span className="font-semibold text-green-700">{item.positive}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: `${item.positive}%`}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Neutral</span>
                  <span className="font-semibold text-gray-700">{item.neutral}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-400 h-2 rounded-full" style={{width: `${item.neutral}%`}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-600">Negative</span>
                  <span className="font-semibold text-red-700">{item.negative}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{width: `${item.negative}%`}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ChatAnalysisStatus Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="premium-card rounded-xl p-6"
      >
        <div className="flex items-center mb-6">
          <ApperIcon name="PieChart" className="h-6 w-6 text-purple-500 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Chat Analysis Status Distribution</h3>
            <p className="text-sm text-gray-600">By app category, user plan, and time period</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">By Category & Status</h4>
            <div className="space-y-3">
              {statusDistribution?.data.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'Resolved' ? 'bg-green-500' :
                      item.status === 'In Progress' ? 'bg-blue-500' :
                      item.status === 'Pending' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-900">{item.category}</span>
                    <span className="text-xs text-gray-500">({item.status})</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">{item.count}</span>
                    <span className="text-xs text-gray-500 ml-2">{item.plan}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">User Plan Distribution</h4>
            <div className="space-y-3">
              {statusDistribution?.userPlans.map((plan, index) => {
                const planData = statusDistribution.data.filter(item => item.plan === plan);
                const totalCount = planData.reduce((sum, item) => sum + item.count, 0);
                return (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{plan}</span>
                      <span className="font-semibold text-gray-900">{totalCount}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {planData.length} categories
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Heatmaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Frustration Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="premium-card rounded-xl p-6"
        >
          <div className="flex items-center mb-6">
            <ApperIcon name="Thermometer" className="h-6 w-6 text-red-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Frustration Heatmap</h3>
              <p className="text-sm text-gray-600">Peak frustration times</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-gray-600 px-2">
              <span>Time</span>
              <span>Intensity</span>
            </div>
            {frustrationHeatmap?.data.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900 w-12">{item.day}</span>
                  <span className="text-sm text-gray-600">{item.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded ${getIntensityColor(item.intensity)}`}></div>
                  <span className="text-sm font-semibold text-gray-900">{item.intensity}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Complexity Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="premium-card rounded-xl p-6"
        >
          <div className="flex items-center mb-6">
            <ApperIcon name="Layers" className="h-6 w-6 text-orange-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Complexity Heatmap</h3>
              <p className="text-sm text-gray-600">Issue complexity by category</p>
            </div>
          </div>

          <div className="space-y-3">
            {complexityHeatmap?.data.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded ${getComplexityColor(item.complexity)}`}></div>
                  <span className="text-sm font-medium text-gray-900">{item.category}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-gray-900">{item.count}</span>
                  <span className="text-xs text-gray-500 ml-2">{item.complexity}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* User Engagement Patterns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="premium-card rounded-xl p-6"
      >
        <div className="flex items-center mb-6">
          <ApperIcon name="Users" className="h-6 w-6 text-green-500 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">User Engagement Patterns</h3>
            <p className="text-sm text-gray-600">Drop-off points and engagement metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h4 className="font-medium text-gray-900 mb-4">Engagement Funnel</h4>
            <div className="space-y-3">
              {engagementPatterns?.data.map((stage, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                      <span className="text-xs text-red-600">-{stage.dropOff}%</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stage.users}</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{width: `${(stage.users / 1000) * 100}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Key Metrics</h4>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-800">Avg. Session Time</span>
                  <ApperIcon name="Clock" className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-xl font-bold text-blue-900 mt-1">
                  {engagementPatterns?.averageSessionTime}
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-800">Peak Hours</span>
                  <ApperIcon name="Activity" className="h-4 w-4 text-green-500" />
                </div>
                <div className="mt-2 space-y-1">
                  {engagementPatterns?.peakEngagementHours.map((hour, index) => (
                    <p key={index} className="text-sm font-medium text-green-900">{hour}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AILogAnalysis;