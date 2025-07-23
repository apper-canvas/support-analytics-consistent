import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import FilterSelect from "@/components/molecules/FilterSelect";

const Reports = () => {
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [format, setFormat] = useState("pdf");
  const [generating, setGenerating] = useState(false);

  const reportTypes = [
    { label: "Apps Overview Report", value: "apps-overview" },
    { label: "User Analytics Report", value: "user-analytics" },
    { label: "System Logs Report", value: "system-logs" },
    { label: "Performance Report", value: "performance" },
    { label: "Security Report", value: "security" }
  ];

  const dateRanges = [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 90 days", value: "90d" },
    { label: "Last 6 months", value: "6m" },
    { label: "Last year", value: "1y" },
    { label: "Custom range", value: "custom" }
  ];

  const formatOptions = [
    { label: "PDF", value: "pdf" },
    { label: "Excel", value: "xlsx" },
    { label: "CSV", value: "csv" },
    { label: "JSON", value: "json" }
  ];

  const handleGenerateReport = async () => {
    if (!reportType || !dateRange) {
      toast.error("Please select report type and date range");
      return;
    }

    setGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setGenerating(false);
      toast.success("Report generated successfully!");
    }, 2000);
  };

  const quickReports = [
    {
      title: "Daily Summary",
      description: "Quick overview of today's activity",
      icon: "Calendar",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Weekly Performance",
      description: "Last 7 days performance metrics",
      icon: "TrendingUp",
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Error Analysis",
      description: "Recent errors and issues",
      icon: "AlertTriangle",
      gradient: "from-red-500 to-red-600"
    },
    {
      title: "User Activity",
      description: "User engagement summary",
      icon: "Users",
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  const scheduledReports = [
    {
      id: 1,
      name: "Weekly Apps Report",
      frequency: "Weekly",
      nextRun: "2024-01-22T09:00:00Z",
      status: "Active"
    },
    {
      id: 2,
      name: "Monthly Analytics",
      frequency: "Monthly",
      nextRun: "2024-02-01T00:00:00Z",
      status: "Active"
    },
    {
      id: 3,
      name: "Security Audit",
      frequency: "Daily",
      nextRun: "2024-01-16T06:00:00Z",
      status: "Paused"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Quick Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="premium-card rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Reports</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickReports.map((report, index) => (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${report.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <ApperIcon name={report.icon} className="h-5 w-5 text-white" />
                </div>
                <ApperIcon name="Download" className="h-4 w-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-1">{report.title}</h3>
              <p className="text-sm text-gray-600">{report.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Custom Report Generator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="premium-card rounded-xl p-6"
      >
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-3">
            <ApperIcon name="FileText" className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Generate Custom Report</h2>
            <p className="text-gray-600 text-sm">Create detailed reports with custom parameters</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <FilterSelect
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              options={reportTypes}
              placeholder="Select report type"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <FilterSelect
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              options={dateRanges}
              placeholder="Select date range"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <FilterSelect
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              options={formatOptions}
              placeholder="Select format"
            />
          </div>
          
          <div className="flex items-end">
            <Button
              onClick={handleGenerateReport}
              disabled={generating || !reportType || !dateRange}
              className="w-full"
            >
              {generating ? (
                <>
                  <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <ApperIcon name="Download" className="h-4 w-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>

        {dateRange === "custom" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <Input type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <Input type="date" />
            </div>
          </div>
        )}
      </motion.div>

      {/* Scheduled Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="premium-card rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Scheduled Reports</h2>
            <p className="text-gray-600 text-sm">Manage automated report generation</p>
          </div>
          <Button variant="secondary" size="sm">
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            Add Schedule
          </Button>
        </div>

        <div className="space-y-4">
          {scheduledReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Clock" className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-600">
                    {report.frequency} • Next: {new Date(report.nextRun).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  report.status === "Active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {report.status}
                </span>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="Settings" className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="MoreHorizontal" className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Reports;