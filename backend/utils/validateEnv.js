module.exports = function validateEnv() {
const required = ['MONGO_URI', 'FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'];
const missing = required.filter(k => !process.env[k]);
if (missing.length) {
console.warn('Warning: missing env vars:', missing);
// do not throw — allow using service account path alternative
}
};