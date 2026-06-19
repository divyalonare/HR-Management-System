const express = require('express');
const router = express.Router();
const authorizeRoles = require('../middleware/authorize');
const {
    createEmployee,
    createEmployeeValidation,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deactivateEmployee
} = require('../controllers/employeeController');

router.post('/', authorizeRoles('admin', 'hr'), createEmployeeValidation, createEmployee);
router.get('/', authorizeRoles('admin', 'hr'), getEmployees);
router.get('/:id', authorizeRoles('admin', 'hr'), getEmployeeById);
router.patch('/:id', authorizeRoles('admin', 'hr'), updateEmployee);
router.patch('/:id/deactivate', authorizeRoles('admin', 'hr'), deactivateEmployee);

module.exports = router;