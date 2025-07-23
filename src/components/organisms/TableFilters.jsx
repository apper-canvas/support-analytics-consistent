import React from "react";
import SearchBar from "@/components/molecules/SearchBar";
import FilterSelect from "@/components/molecules/FilterSelect";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TableFilters = ({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  planFilter,
  onPlanChange,
  onRefresh
}) => {
  const categoryOptions = [
    { label: "E-commerce", value: "E-commerce" },
    { label: "Social Media", value: "Social Media" },
    { label: "Productivity", value: "Productivity" },
    { label: "Finance", value: "Finance" },
    { label: "Health", value: "Health" },
    { label: "Education", value: "Education" }
  ];

  const planOptions = [
    { label: "Free", value: "Free" },
    { label: "Basic", value: "Basic" },
    { label: "Pro", value: "Pro" },
    { label: "Enterprise", value: "Enterprise" }
  ];

  return (
    <div className="premium-card rounded-xl p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <SearchBar
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search apps, users, or emails..."
            className="flex-1 min-w-[200px]"
          />
          <FilterSelect
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            options={categoryOptions}
            placeholder="All Categories"
            className="w-full sm:w-48"
          />
          <FilterSelect
            value={planFilter}
            onChange={(e) => onPlanChange(e.target.value)}
            options={planOptions}
            placeholder="All Plans"
            className="w-full sm:w-48"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onRefresh}>
            <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="secondary" size="sm">
            <ApperIcon name="Download" className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableFilters;