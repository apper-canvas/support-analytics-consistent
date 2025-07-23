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
}

export default new LogEntriesService();