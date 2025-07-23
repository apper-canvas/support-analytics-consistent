import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Apps",
      value: stats.totalApps,
      change: "+12%",
      changeType: "positive",
      icon: "Smartphone",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      change: "+8%",
      changeType: "positive",
      icon: "Users",
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Total Messages",
      value: stats.totalMessages,
      change: "-2%",
      changeType: "negative",
      icon: "MessageSquare",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Response Time",
      value: `${stats.avgResponseTime}h`,
      change: "-15%",
      changeType: "positive",
      icon: "Clock",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="premium-card rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {card.value}
              </p>
              <div className="flex items-center mt-2">
                <ApperIcon 
                  name={card.changeType === "positive" ? "TrendingUp" : "TrendingDown"} 
                  className={`h-4 w-4 mr-1 ${
                    card.changeType === "positive" ? "text-green-500" : "text-red-500"
                  }`} 
                />
                <span className={`text-sm font-medium ${
                  card.changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}>
                  {card.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center`}>
              <ApperIcon name={card.icon} className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;