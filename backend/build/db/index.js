"use strict";
const mongoose = require('mongoose');
// Department Schema
const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    floor: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});
// Employee Schema
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Makes name unique like username
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});
// Create and export models
const Department = mongoose.model('Department', departmentSchema);
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = {
    Department,
    Employee
};
