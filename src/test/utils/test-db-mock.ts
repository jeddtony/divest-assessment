// Mock the database connection for tests
jest.mock('@database', () => ({
  DB: {
    Users: {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    },
    Books: {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      create: jest.fn(),
    },
    sequelize: {
      sync: jest.fn().mockResolvedValue(undefined),
      authenticate: jest.fn().mockResolvedValue(undefined),
      transaction: jest.fn().mockImplementation(async callback => {
        const mockTransaction = {
          commit: jest.fn(),
          rollback: jest.fn(),
        };

        if (callback) {
          await callback(mockTransaction);
        }

        return mockTransaction;
      }),
    },
  },
}));

// Helper function to get the mocked DB instance
export const getMockedDB = () => {
  const { DB } = require('@database');
  return DB;
};
