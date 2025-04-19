module.exports = {
  Chart: jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
    update: jest.fn(),
  })),
  registerables: [],
  register: jest.fn(),
}; 