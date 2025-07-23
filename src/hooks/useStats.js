import { useState, useEffect } from "react";
import appsService from "@/services/api/appsService";

export const useStats = () => {
  const [stats, setStats] = useState({
    totalApps: 0,
    activeUsers: 0,
    totalMessages: 0,
    avgResponseTime: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await appsService.getStats();
      setStats(data);
    } catch (err) {
      setError(err.message || "Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: loadStats
  };
};