import logEntriesData from "@/services/mockData/logEntries.json";

class LogEntriesService {
  constructor() {
    this.logs = [...logEntriesData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 350));
    return [...this.logs];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const log = this.logs.find(log => log.Id === parseInt(id));
    if (!log) {
      throw new Error(`Log entry with ID ${id} not found`);
    }
    return { ...log };
  }

  async create(logData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newLog = {
      ...logData,
      Id: Math.max(...this.logs.map(log => log.Id)) + 1,
      timestamp: new Date().toISOString()
    };
    this.logs.push(newLog);
    return { ...newLog };
  }

  async update(id, logData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = this.logs.findIndex(log => log.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Log entry with ID ${id} not found`);
    }
    this.logs[index] = { ...this.logs[index], ...logData };
    return { ...this.logs[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = this.logs.findIndex(log => log.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Log entry with ID ${id} not found`);
    }
    const deletedLog = this.logs.splice(index, 1)[0];
    return { ...deletedLog };
  }

async getByLevel(level) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.logs.filter(log => log.level.toLowerCase() === level.toLowerCase());
  }

  // Analytics Methods
  async getSentimentTrends() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      timeRanges: ['Last 7 days', 'Last 30 days', 'Last 90 days'],
      data: [
        { period: 'Week 1', positive: 65, neutral: 25, negative: 10 },
        { period: 'Week 2', positive: 72, neutral: 20, negative: 8 },
        { period: 'Week 3', positive: 58, neutral: 30, negative: 12 },
        { period: 'Week 4', positive: 68, neutral: 22, negative: 10 }
      ]
    };
  }

  async getChatAnalysisStatusDistribution() {
    await new Promise(resolve => setTimeout(resolve, 350));
    return {
      categories: ['E-commerce', 'SaaS', 'Healthcare', 'Finance', 'Education'],
      userPlans: ['Free', 'Pro', 'Enterprise'],
      data: [
        { category: 'E-commerce', status: 'Resolved', count: 45, plan: 'Pro' },
        { category: 'E-commerce', status: 'In Progress', count: 23, plan: 'Enterprise' },
        { category: 'SaaS', status: 'Resolved', count: 67, plan: 'Enterprise' },
        { category: 'SaaS', status: 'Pending', count: 12, plan: 'Free' },
        { category: 'Healthcare', status: 'Escalated', count: 8, plan: 'Pro' },
        { category: 'Finance', status: 'Resolved', count: 34, plan: 'Enterprise' }
      ]
    };
  }

  async getFrustrationHeatmap() {
    await new Promise(resolve => setTimeout(resolve, 320));
    return {
      timeSlots: ['9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [
        { day: 'Mon', time: '9 AM', intensity: 3.2 },
        { day: 'Mon', time: '12 PM', intensity: 4.1 },
        { day: 'Mon', time: '3 PM', intensity: 2.8 },
        { day: 'Tue', time: '9 AM', intensity: 3.7 },
        { day: 'Tue', time: '12 PM', intensity: 4.5 },
        { day: 'Wed', time: '3 PM', intensity: 2.1 },
        { day: 'Thu', time: '6 PM', intensity: 4.8 },
        { day: 'Fri', time: '9 AM', intensity: 3.9 }
      ]
    };
  }

  async getComplexityHeatmap() {
    await new Promise(resolve => setTimeout(resolve, 380));
    return {
      categories: ['Technical', 'Billing', 'Account', 'Feature Request', 'Bug Report'],
      complexityLevels: ['Low', 'Medium', 'High', 'Critical'],
      data: [
        { category: 'Technical', complexity: 'High', count: 28 },
        { category: 'Technical', complexity: 'Critical', count: 12 },
        { category: 'Billing', complexity: 'Low', count: 45 },
        { category: 'Billing', complexity: 'Medium', count: 23 },
        { category: 'Account', complexity: 'Medium', count: 34 },
        { category: 'Feature Request', complexity: 'High', count: 19 },
        { category: 'Bug Report', complexity: 'Critical', count: 15 }
      ]
    };
  }

  async getUserEngagementPatterns() {
    await new Promise(resolve => setTimeout(resolve, 420));
    return {
      stages: ['Initial Contact', 'Information Gathering', 'Problem Solving', 'Resolution', 'Follow-up'],
      data: [
        { stage: 'Initial Contact', users: 1000, dropOff: 5 },
        { stage: 'Information Gathering', users: 950, dropOff: 12 },
        { stage: 'Problem Solving', users: 836, dropOff: 18 },
        { stage: 'Resolution', users: 685, dropOff: 8 },
        { stage: 'Follow-up', users: 630, dropOff: 3 }
      ],
      averageSessionTime: '8.5 minutes',
      peakEngagementHours: ['10 AM - 12 PM', '2 PM - 4 PM']
    };
  }
}

export default new LogEntriesService();