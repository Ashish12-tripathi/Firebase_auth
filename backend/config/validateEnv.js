module.exports = function validateEnv() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI env var is required');
  }
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_PATH env var is required');
  }
};
