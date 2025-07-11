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
exports.createEmployee = void 0;
const dbSchema_1 = require("../../db/dbSchema");
const employeeValidation_1 = require("../../validations/employeeValidation");
const createEmployee = (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
    try {
        // Validate input with Zod
        const validationResult = employeeValidation_1.createEmployeeInputSchema.safeParse({ input });
        if (!validationResult.success) {
            const errors = (0, employeeValidation_1.formatZodError)(validationResult.error);
            throw new Error(`Validation failed: error`);
        }
        const validatedInput = validationResult.data.input;
        // Check if employee name already exists
        const existingEmployee = yield dbSchema_1.Employee.findOne({ name: validatedInput.name });
        if (existingEmployee) {
            throw new Error(`Employee with name '${validatedInput.name}' already exists, name must be unique`);
        }
        // Create the employee with the department enum value
        const employee = new dbSchema_1.Employee({
            name: validatedInput.name,
            position: validatedInput.position,
            salary: validatedInput.salary,
            department: validatedInput.department
        });
        yield employee.save();
        // Return the employee
        return {
            id: employee._id,
            name: employee.name,
            position: employee.position,
            salary: employee.salary.toString(),
            department: employee.department,
            departmentId: employee._id // Since department is now a string, we'll use employee ID as departmentId
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new Error(`Failed to create employee: ${errorMessage}`);
    }
});
exports.createEmployee = createEmployee;
