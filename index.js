require('dotenv').config();
const connectDB = require('./config/database');
connectDB();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const authRouter   = require('./routes/auth');
const MainRouter  = require('./routes/main');

app.use(express.json());

app.use('/auth',  authRouter);  
app.use('/api', MainRouter);  

app.get('/', (req, res) => res.send('HR Management System API'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));