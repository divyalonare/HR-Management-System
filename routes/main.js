const express  = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticate');
const authorizeRoles = require('../middleware/authorize');
const {
    applyLeave,
    getMyLeaves,
    getAllLeaves,
    updateLeaveStatus,
    applyLeaveValidation,
} = require('../controllers/LeaveController');
const getSummary = require('../controllers/adminController')
const employeeRouter = require('../routes/employee');

router.use(authenticateToken);

//get summary 

router.get('/getSummary',authorizeRoles('admin', 'hr'),getSummary);

router.use('/employees', employeeRouter);

//leave controller routes

router.post('/apply', applyLeaveValidation,applyLeave);
router.get('/my', getMyLeaves);

router.get('/all', authorizeRoles('admin', 'hr'), getAllLeaves);
router.patch('/status/:id', authorizeRoles('admin', 'hr'), updateLeaveStatus);

module.exports = router;