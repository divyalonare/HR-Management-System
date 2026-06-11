const User = require('../models/User');
const getSummary = async (req, res) => {
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
  };

  module.exports = getSummary;