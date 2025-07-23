import appsData from "@/services/mockData/apps.json";

class AppsService {
  constructor() {
    this.apps = [...appsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.apps];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const app = this.apps.find(app => app.Id === parseInt(id));
    if (!app) {
      throw new Error(`App with ID ${id} not found`);
    }
    return { ...app };
  }

  async create(appData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newApp = {
      ...appData,
      Id: Math.max(...this.apps.map(app => app.Id)) + 1,
      lastActivity: new Date().toISOString()
    };
    this.apps.push(newApp);
    return { ...newApp };
  }

  async update(id, appData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = this.apps.findIndex(app => app.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`App with ID ${id} not found`);
    }
    this.apps[index] = { ...this.apps[index], ...appData };
    return { ...this.apps[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = this.apps.findIndex(app => app.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`App with ID ${id} not found`);
    }
    const deletedApp = this.apps.splice(index, 1)[0];
    return { ...deletedApp };
  }

  async getStats() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      totalApps: this.apps.length,
      activeUsers: this.apps.filter(app => {
        const lastActivity = new Date(app.lastActivity);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return lastActivity > yesterday;
      }).length,
      totalMessages: this.apps.reduce((sum, app) => sum + app.messagesCount, 0),
      avgResponseTime: Math.round(this.apps.reduce((sum, app) => sum + (app.messagesCount * 0.1), 0) / this.apps.length * 10) / 10
    };
  }
}

export default new AppsService();