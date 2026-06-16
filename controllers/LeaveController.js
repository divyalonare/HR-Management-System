const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const LeaveRequest = require('../models/leaveRequest');

const applyLeaveValidation = [
    body('leaveType').isIn(['sick Leave', 'Casual Leave', 'Earned Leave']).withMessage('Invalid leave type'),
    body('startDate').isISO8601().withMessage('startDate must be a valid date').toDate(),
    body('endDate').isISO8601().withMessage('endDate must be a valid date').toDate(),
    body('reason').trim().notEmpty().withMessage('Reason is required').isLength({ max:300 }).withMessage('Reason too long')
];

const applyLeave = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!error.isEmpty()) {
            return res.status(400).json({ error:errors.array() });
        }

        const { leaveType,  startDate, endDate, reason} = req.body;

        if (new Date(endDate) < new Date(startDate)){
            return res.status(400).json({ error:'endDate cannot be before startDate' });
        }

        const leave = await LeaveRequest.create({
            employee: req.user._id,
            leaveType,
            startDate,
            endDate,
            reason
        });
        res.status(201).json({ message: 'Leave applied', leave });
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
};

const getMyLeaves = async (req, res) => {
    try {
        const leaves = await LeaveRequest.find({ employee: req.user._id }).sort({ createdAt: -1});
        return res.json({ leaves});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllLeaves = async (req, res) => {
    try {
        const leaves = await LeaveRequest.find()
        .populate('employee', 'employeeId name role')
        .sort({ createdAt: -1});

        return res.json({ leaves });
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
};

const updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['Approved','Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status'});
        }

        const leave = await LeaveRequest.findOneAndUpdate(
            { _id: id },
            { status },
            { new: true }
        ).populate('employee', 'employeeId name');

        if (!leave) {
            return res.status(404).json({ error: 'Leave request not found'});
        }

        return res.json({ message: `Leave ${status}`, leave});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    applyLeave,
    applyLeaveValidation,
    getMyLeaves,
    getAllLeaves,
    updateLeaveStatus
};