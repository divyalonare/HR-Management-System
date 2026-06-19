const { body, validationResult } = require('express-validator');
const User = require('../models/User');


const createEmployeeValidation = [
    body('employeeId').trim().notEmpty().withMessage('Employee ID is required'),
    body('name').trim().withMessage('Name is required'),
    body('password').isLength({ min:6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['admin','hr','employee']).withMessage('Invalid role')
];

const createEmployee = async (req,res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { employeeId, name, password, role } = req.body;
        const requestedRole = role || 'employee';
        
        // only admin can create hr or other admin accounts
        if (req.user.role === 'hr' && requestedRole!== 'employee') {
            return res.status(403).json({ error: 'HR can only create employee accounts'});
        }

        const existing = await User.findOne({ employeeId: employeeId.toUpperCase() });
        if (existing) {
            return res.status(409).json({ error: 'Employee ID already exists' });
        }

        const newUser = await User.create({
            employeeId: employeeId.toUpperCase(),
            name,
            passwordHash: password,
            role: requestedRole,
            createdBy: req.user.employeeId
        });

        return res.status(201).json({
            message: 'Employee created',
            employee: {
                employeeId: newUser.employeeId,
                name: newUser.name,
                role: newUser.role,
                createdBy: newUser.createdBy
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message  });
    }
};

const getEmployees = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.role) filter.role = req.query.role;
        if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true';
        if (req.query.search){
            filter.$or = [
                { name: { $regex: req.query.search, $options: 'i' } },
                { employeeId: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        const [employees, total] = await Promise.all([
            User.find(filter).select('-passwordHash').skip(skip).limit(limit).sort({ createdAt: -1 }),
            User.countDocuments(filter)
        ]);

        return res.json({
            employees,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id).select('-passwordHash');
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found'});
        }
        return res.json({ employee });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { name, role, isActive } = req.body;

        const target = await User.findById(req.params.id);
        if (!target) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Hr can't edit admin/ hr acc or promote anyone to admin/ hr
        if (req.user.role === 'hr') {
            if (target.role !== 'employee'){
                return res.status(403).json({ eror: 'HR cannot modify HR or admin accounts' });
            }
            if (role && role !== 'employee') {
                return res.status(403).json({ error: 'HR cannot assign this role' });
            }
        }

        if (name !== undefined) target.name = name;
        if (role !== undefined) target.role = role;
        if (isActive !== undefined) target.isActive = isActive;

        await target.save();

        return res.json({
            message: 'Employee updated',
            employee: {
                employeeId: target.employeeId,
                name: target.name,
                role: target.role,
                isActive: target.isActive
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deactivateEmployee = async (req, res) => {
    try {
        const target = await User.findById(req.params.id);
        if (!target) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        if (req.user.role === 'hr' && target.role !== 'employee') {
            return res.status(403).json({ error: 'HR cannot deactivate HR or admin accounts' });
        }

        target.isActive = false;
        await target.save();

        return res.json({ message: 'Employee deactivated', employeeId: target.employeeId });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEmployee,
    createEmployeeValidation,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deactivateEmployee
};