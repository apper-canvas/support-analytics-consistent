import salesCommentsData from '@/services/mockData/salesComments.json';

let comments = [...salesCommentsData];
let nextId = Math.max(...comments.map(c => c.Id || 0)) + 1;

// Simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const salesCommentsService = {
  async getAll(appId) {
    await delay();
    return comments.filter(comment => comment.appId === appId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getById(id) {
    await delay();
    const comment = comments.find(c => c.Id === parseInt(id));
    if (!comment) {
      throw new Error('Sales comment not found');
    }
    return { ...comment };
  },

  async create(commentData) {
    await delay();
    const newComment = {
      ...commentData,
      Id: nextId++,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    comments.push(newComment);
    return { ...newComment };
  },

  async update(id, commentData) {
    await delay();
    const index = comments.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Sales comment not found');
    }
    
    const updatedComment = {
      ...comments[index],
      ...commentData,
      Id: parseInt(id), // Preserve original ID
      updatedAt: new Date().toISOString()
    };
    
    comments[index] = updatedComment;
    return { ...updatedComment };
  },

  async delete(id) {
    await delay();
    const index = comments.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Sales comment not found');
    }
    
    const deletedComment = { ...comments[index] };
    comments.splice(index, 1);
    return deletedComment;
  }
};

export default salesCommentsService;