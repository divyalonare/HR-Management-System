require('dotenv').config();
const connectDB = require('./config/database');
connectDB();

const User = require('./models/User');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const { router: authRouter, authenticateToken, authorizeRoles } = require('./routes/auth');  

app.use(express.json());
app.use('/auth', authRouter);

app.get('/', (req, res) =>{
    res.send('HR management system API');
});

app.get(
  '/admin/summary', authenticateToken, authorizeRoles('admin','hr'), async (req, res) => {
    try {
      // const total = await User.countDocuments();
      // const admins = await User.countDocuments({ role: 'admin' });
      // const hrs = await User.countDocuments({ role: 'hr' });
      // const employees = await User.countDocuments({ role: 'employee' });
      
      if (req.user.role === 'hr') {
        const total = await User.countDocuments({ role: { $in: ['hr', 'employee'] } });
        const hrs = await User.countDocuments({ role: 'hr' });
        const employees = await User.countDocuments({ role: 'employee' });
        return res.json({
          total,
          hrs,
          employees,
          message: 'HR summary'
        });
      }
      if (req.user.role === 'admin') {
        const total = await User.countDocuments();
        const admins = await User.countDocuments({ role: 'admin' });
        const hrs = await User.countDocuments({ role: 'hr' });
        const employees = await User.countDocuments({ role: 'employee' });
        return res.json({
        total,
        admins,
        hrs,
        employees,
        message: 'Admin summary'
      });
      }
      return res.status(403).json({ error: 'Forbidden: You do not have access to this resource' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});