import { getEmployee } from "../../db/dbOperations";
import { idSchema, formatZodError } from "../../validations/employeeValidation";

interface GetEmployeeDetailsArgs {
  id: string;
}

export const getEmployeeDetails = async (_: any, { id }: GetEmployeeDetailsArgs) => {
  try {
    // Validate ID input
    const validation = idSchema.safeParse({ id });
    if (!validation.success) {
      const errors = formatZodError(validation.error);
      throw new Error(`Invalid ID: ${errors}`);
    }

    const Employee = getEmployee();
    const employee = await Employee.findById(id);
    
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
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to get employee details: ${errorMessage}`);
  }
}; 