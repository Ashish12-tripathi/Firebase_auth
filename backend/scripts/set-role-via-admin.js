/**
 * Usage:
 * 1. Ensure backend/.env is set (including FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_* envs and MONGO_URI)
 * 2. From backend folder run:
 *    node scripts/set-role-via-admin.js <firebase-uid> admin
 *
 * This will upsert the user in MongoDB with the role provided.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const admin = require('../config/firebaseAdmin'); // will initialize admin SDK
const User = require('../models/User');

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node set-role-via-admin.js <uid> <role>');
    process.exit(1);
  }
  const [uid, role] = args;
  if (!['user', 'admin'].includes(role)) {
    console.error('Role must be "user" or "admin"');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const existing = await User.findOneAndUpdate({ uid }, { role }, { upsert: true, new: true });
    console.log('Updated user:', existing);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();

