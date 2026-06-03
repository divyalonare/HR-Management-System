const mongoose = require('mongoose');
const User = require('./models/User');

const leaverequestSchema = new mongoose.Schema({
    lr_ID: {
        type: Number,
        required: true,
        unique: true
    },
    User_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    leaveTYpe: {
        type: String,
        enum: ['Sick Leave', 'Casual Leave', 'Earned Leave'],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    Status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    }
})

module.exports = mongoose.model('LeaveRequest', LeaveRequestSchema);