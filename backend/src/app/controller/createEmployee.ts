import { Employee, Department } from "../../db/dbSchema";
import { createEmployeeInputSchema, formatZodError } from "../../validations/employeeValidation";

interface CreateEmployeeInput {
  name: string;
  position: string;
  salary: number;
  department: string;
  floor?: number;
}

interface ResolverArgs {
  input: CreateEmployeeInput;
}

export const createEmployee = async (_: any, { input }: ResolverArgs) => {
  try {
    // Validate input with Zod
    const validationResult = createEmployeeInputSchema.safeParse({ input });
    
    if (!validationResult.success) {
      const errors = formatZodError(validationResult.error);
      throw new Error(`Validation failed: error`);
    }

    const validatedInput = validationResult.data.input;

    // Check if employee name already exists
    const existingEmployee = await Employee.findOne({ name: validatedInput.name });
    if (existingEmployee) {
      throw new Error(`Employee with name '${validatedInput.name}' already exists, name must be unique`);
    }

    // Create the employee with the department enum value
    const employee = new Employee({
      name: validatedInput.name,
      position: validatedInput.position,
      salary: validatedInput.salary,
      department: validatedInput.department
    });

    await employee.save();

    // Return the employee
    return {
      id: employee._id,
      name: employee.name,
      position: employee.position,
      salary: employee.salary.toString(),
      department: employee.department,
      departmentId: employee._id // Since department is now a string, we'll use employee ID as departmentId
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to create employee: ${errorMessage}`);
  }
}; 