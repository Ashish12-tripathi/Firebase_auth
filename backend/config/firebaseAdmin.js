const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Function to initialize Firebase Admin
function initializeFirebase() {
  // Option 1: Use service account JSON file
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (serviceAccountPath) {
    const fullPath = path.resolve(serviceAccountPath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(
        `Firebase service account file not found at path: ${fullPath}`
      );
    }

    const serviceAccount = require(fullPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin initialized using JSON file.');
    return admin;
  }

  // Option 2: Use environment variables for service account
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
    process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error(
      'FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY env vars are required'
    );
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Fix newline issues
    }),
  });
  console.log('Firebase Admin initialized using environment variables.');
  return admin;
}

// Initialize Firebase
initializeFirebase();

module.exports = admin;
