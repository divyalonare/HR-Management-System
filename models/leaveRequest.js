const mongoose = require('mongoose');

const LeaveRequestSchema = new mongoose.Schema({
     employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    leaveType: {
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
    status: {   
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    reason: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
},

}, { timestamps: true })

module.exports = mongoose.model('LeaveRequest', LeaveRequestSchema);