import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import StatsCards from "@/components/organisms/StatsCards";
import TableFilters from "@/components/organisms/TableFilters";
import AppsTable from "@/components/organisms/AppsTable";
import AppDetailsModal from "@/components/organisms/AppDetailsModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { useApps } from "@/hooks/useApps";
import { useStats } from "@/hooks/useStats";

const AppsOverview = () => {
  const { apps, loading: appsLoading, error: appsError, refetch: refetchApps } = useApps();
  const { stats, loading: statsLoading, error: statsError, refetch: refetchStats } = useStats();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);

  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      const matchesSearch = !searchTerm || 
        app.appName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !categoryFilter || app.category === categoryFilter;
      const matchesPlan = !planFilter || app.plan === planFilter;
      
      return matchesSearch && matchesCategory && matchesPlan;
    });
  }, [apps, searchTerm, categoryFilter, planFilter]);

  const handleRefresh = async () => {
    try {
      await Promise.all([refetchApps(), refetchStats()]);
      toast.success("Data refreshed successfully!");
    } catch (error) {
      toast.error("Failed to refresh data");
    }
  };

  const loading = appsLoading || statsLoading;
  const error = appsError || statsError;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={handleRefresh} />;
  }

  if (apps.length === 0) {
    return (
      <Empty
        title="No apps found"
        description="There are no applications in your dashboard yet."
        action={handleRefresh}
        actionLabel="Refresh Data"
        icon="Smartphone"
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
      <StatsCards stats={stats} />
      
      <TableFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        planFilter={planFilter}
        onPlanChange={setPlanFilter}
        onRefresh={handleRefresh}
      />

      {filteredApps.length === 0 ? (
        <Empty
          title="No matching apps"
          description="No applications match your current filters. Try adjusting your search criteria."
          action={() => {
            setSearchTerm("");
            setCategoryFilter("");
            setPlanFilter("");
          }}
          actionLabel="Clear Filters"
          icon="Filter"
        />
) : (
        <AppsTable apps={filteredApps} loading={appsLoading} onRowClick={setSelectedApp} />
      )}

      {selectedApp && (
        <AppDetailsModal app={selectedApp} onClose={() => setSelectedApp(null)} />
      )}
    </motion.div>
  );
};

export default AppsOverview;