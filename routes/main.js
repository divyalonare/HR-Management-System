const express  = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorize');
const {
    applyLeave,
    getMyLeaves,
    getAllLeaves,
    updateLeaveStatus,
} = require('../controllers/LeaveController');
const getSummary = require('../controllers/adminController')

router.use(authenticateToken);

//get summary 

router.get('/getSummary',authorizeRoles('admin', 'hr'),getSummary);

//leave controller routes

router.post('/apply', applyLeave);
router.get('/my', getMyLeaves);

router.get('/all', authorizeRoles('admin', 'hr'), getAllLeaves);
router.patch('/:id/status', authorizeRoles('admin', 'hr'), updateLeaveStatus);

module.exports = router;