import { useState, useEffect } from "react";
import appsService from "@/services/api/appsService";

export const useApps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApps = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await appsService.getAll();
      setApps(data);
    } catch (err) {
      setError(err.message || "Failed to load apps");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApps();
  }, []);

  return {
    apps,
    loading,
    error,
    refetch: loadApps
  };
};