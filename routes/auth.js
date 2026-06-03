const express = require('express');
const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

const signToken = (user) => {
    return jwt.sign(
        {
            sub: user.employeeId,
            role: user.role,
            name: user.name
        },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );
}

router.post('/login', async (req, res) => {
    try {
        const { employeeId, password, name } = req.body;
        if (!employeeId || !password) {
            return res.status(400).json({ error: 'Employee ID and password are required' });
        }
        const user = await User.findOne({ employeeId: employeeId.toUpperCase() });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const validPassword = await user.comparePassword(password);
        if (!validPassword) {
            return res.status(401).json({ error : 'Invalid credentials' });
        }

        if (!user.name && name) {
            user.name = name;
            await user.save();
        } else if (user.name && name && user.name.toLowerCase() !== name.toLowerCase()) {
            return res.status(403).json({ error: 'Name does not match the registered name for this registered user' });
        }

        const token = signToken(user);
        return res.json({ 
            token,
            role: user.role,
            employeeId: user.employeeId,
            name: user.name
         });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            employeeId: payload.sub,
            role: payload.role,
            name: payload.name
        };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'not authenticated' });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'forbidden' });
        }
        next();
    };
};

module.exports = {
    router,
    authenticateToken,
    authorizeRoles
};