require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');
const tasksRoute = require('./routes/tasks');
const adminRoute = require('./routes/admin');


const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 4000;


async function start() {
try {
await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Connected to MongoDB');


// Public route
app.get('/', (req, res) => res.json({ status: 'ok' }));


// Protected: verify token for below routes
app.use('/tasks', auth, tasksRoute);
app.use('/admin', auth, adminRoute);


app.listen(PORT, () => console.log(`Server running on ${PORT}`));
} catch (err) {
console.error('Failed to start', err);
process.exit(1);
}
}


start();