"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = exports.Department = void 0;
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
    timestamps: true
});
// Employee Schema
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
        type: String,
        enum: ["Sales", "Marketing", "Engineering", "Human Resources", "Finance"],
        required: true
    }
}, {
    timestamps: true
});
// Create and export models
const Department = mongoose.model('Department', departmentSchema);
exports.Department = Department;
const Employee = mongoose.model('Employee', employeeSchema);
exports.Employee = Employee;
