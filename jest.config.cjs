module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  setupFiles: ['./jest.setup.cjs'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
}
