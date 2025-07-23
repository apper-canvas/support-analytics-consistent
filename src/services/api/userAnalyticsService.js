import userAnalyticsData from "@/services/mockData/userAnalytics.json";

class UserAnalyticsService {
  constructor() {
    this.analytics = [...userAnalyticsData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [...this.analytics];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const analytics = this.analytics.find(item => item.Id === parseInt(id));
    if (!analytics) {
      throw new Error(`Analytics with ID ${id} not found`);
    }
    return { ...analytics };
  }

  async create(analyticsData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newAnalytics = {
      ...analyticsData,
      Id: Math.max(...this.analytics.map(item => item.Id)) + 1
    };
    this.analytics.push(newAnalytics);
    return { ...newAnalytics };
  }

  async update(id, analyticsData) {
    await new Promise(resolve => setTimeout(resolve, 450));
    const index = this.analytics.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Analytics with ID ${id} not found`);
    }
    this.analytics[index] = { ...this.analytics[index], ...analyticsData };
    return { ...this.analytics[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.analytics.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Analytics with ID ${id} not found`);
    }
    const deletedAnalytics = this.analytics.splice(index, 1)[0];
    return { ...deletedAnalytics };
  }
}

export default new UserAnalyticsService();