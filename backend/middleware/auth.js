// Verifies Firebase ID token and attaches user info + role from DB
const admin = require('../config/firebaseAdmin');
const User = require('../models/User');


module.exports = async function auth(req, res, next) {
try {
const authHeader = req.headers.authorization || '';
if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing or invalid Authorization header' });


const idToken = authHeader.split(' ')[1];
const decoded = await admin.auth().verifyIdToken(idToken);
// decoded contains uid and other claims
req.user = { uid: decoded.uid, email: decoded.email };


// fetch role from DB
let user = await User.findOne({ uid: decoded.uid });
if (!user) {
// create user with default role 'user'
user = await User.create({ uid: decoded.uid, email: decoded.email, role: 'user' });
}
req.user.role = user.role;
next();
} catch (err) {
console.error('auth error', err?.message || err);
return res.status(401).json({ error: 'Unauthorized' });
}
};