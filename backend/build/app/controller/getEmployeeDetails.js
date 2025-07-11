"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeDetails = void 0;
const dbOperations_1 = require("../../db/dbOperations");
const employeeValidation_1 = require("../../validations/employeeValidation");
const getEmployeeDetails = (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
    try {
        // Validate ID input
        const validation = employeeValidation_1.idSchema.safeParse({ id });
        if (!validation.success) {
            const errors = (0, employeeValidation_1.formatZodError)(validation.error);
            throw new Error(`Invalid ID: ${errors}`);
        }
        const Employee = (0, dbOperations_1.getEmployee)();
        const employee = yield Employee.findById(id);
        if (!employee) {
            throw new Error(`Employee with ID '${id}' not found`);
        }
        return {
            id: employee._id,
            name: employee.name,
            position: employee.position,
            salary: employee.salary.toString(),
            department: employee.department,
            departmentId: employee._id
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new Error(`Failed to get employee details: ${errorMessage}`);
    }
});
exports.getEmployeeDetails = getEmployeeDetails;
