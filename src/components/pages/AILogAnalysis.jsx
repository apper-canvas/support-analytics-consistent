import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import logEntriesService from "@/services/api/logEntriesService";

const AILogAnalysis = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const loadLogs = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await logEntriesService.getAll();
      setLogs(data);
    } catch (err) {
      setError(err.message || "Failed to load log entries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const getLevelBadgeVariant = (level) => {
    switch (level.toLowerCase()) {
      case "error": return "error";
      case "warn": return "warning";
      case "info": return "info";
      case "debug": return "default";
      default: return "default";
    }
  };

  const getLevelIcon = (level) => {
    switch (level.toLowerCase()) {
      case "error": return "AlertCircle";
      case "warn": return "AlertTriangle";
      case "info": return "Info";
      case "debug": return "Bug";
      default: return "FileText";
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };

  const filteredLogs = selectedLevel 
    ? logs.filter(log => log.level.toLowerCase() === selectedLevel.toLowerCase())
    : logs;

  const levelCounts = logs.reduce((acc, log) => {
    acc[log.level] = (acc[log.level] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadLogs} />;
  }

  if (logs.length === 0) {
    return (
      <Empty
        title="No log entries"
        description="There are no log entries to analyze at the moment."
        action={loadLogs}
        actionLabel="Refresh Logs"
        icon="FileText"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="premium-card rounded-xl p-6"
      >
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <ApperIcon name="Brain" className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI-Powered Insights</h2>
            <p className="text-gray-600 text-sm">Automated analysis of system logs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Critical Issues</p>
                <p className="text-2xl font-bold text-red-900">{levelCounts.ERROR || 0}</p>
              </div>
              <ApperIcon name="AlertCircle" className="h-8 w-8 text-red-500" />
            </div>
            <p className="text-xs text-red-600 mt-2">Requires immediate attention</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Warnings</p>
                <p className="text-2xl font-bold text-yellow-900">{levelCounts.WARN || 0}</p>
              </div>
              <ApperIcon name="AlertTriangle" className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="text-xs text-yellow-600 mt-2">Monitor closely</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">System Health</p>
                <p className="text-2xl font-bold text-green-900">Good</p>
              </div>
              <ApperIcon name="CheckCircle" className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-green-600 mt-2">All systems operational</p>
          </div>
        </div>
      </motion.div>

      {/* Log Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="premium-card rounded-xl p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Log Entries</h3>
            <p className="text-sm text-gray-600">Filter and analyze system logs</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={selectedLevel === "" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setSelectedLevel("")}
            >
              All ({logs.length})
            </Button>
            {Object.entries(levelCounts).map(([level, count]) => (
              <Button
                key={level}
                variant={selectedLevel === level ? "primary" : "ghost"}
                size="sm"
                onClick={() => setSelectedLevel(level)}
              >
                {level} ({count})
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Log Entries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="premium-card rounded-xl overflow-hidden"
      >
        <div className="divide-y divide-gray-200">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center">
              <ApperIcon name="Filter" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No logs match the selected filter.</p>
            </div>
          ) : (
            filteredLogs.map((log, index) => (
              <motion.div
                key={log.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <ApperIcon 
                        name={getLevelIcon(log.level)} 
                        className={`h-5 w-5 ${
                          log.level === "ERROR" ? "text-red-500" :
                          log.level === "WARN" ? "text-yellow-500" :
                          log.level === "INFO" ? "text-blue-500" :
                          "text-gray-500"
                        }`}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant={getLevelBadgeVariant(log.level)}>
                          {log.level}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {formatTimestamp(log.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        {log.message}
                      </p>
                      
                      {log.metadata && (
                        <div className="bg-gray-50 rounded-lg p-3 text-xs">
                          <pre className="text-gray-700 whitespace-pre-wrap">
                            {JSON.stringify(log.metadata, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <ApperIcon name="MoreHorizontal" className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AILogAnalysis;