import { getEmployee } from "../../db/dbOperations";
import { z, formatZodError } from "../../validations/employeeValidation";

// Department validation schema for query
const departmentQuerySchema = z.object({
  department: z.enum(["Sales", "Marketing", "Engineering", "Human Resources", "Finance"])
});

interface GetEmployeesByDepartmentArgs {
  department: string;
}

export const getEmployeesByDepartment = async (_: any, { department }: GetEmployeesByDepartmentArgs) => {
  try {
    // Validate department input
    const validation = departmentQuerySchema.safeParse({ department });
    if (!validation.success) {
      const errors = formatZodError(validation.error);
      throw new Error(`Invalid department: ${errors}`);
    }

    const Employee = getEmployee();
    const employees = await Employee.findByDepartment(department);
    
    if (!employees || employees.length === 0) {
      return []; // Return empty array if no employees found in department
    }

    return employees.map((employee: any) => ({
      id: employee._id,
      name: employee.name,
      position: employee.position,
      salary: employee.salary.toString(),
      department: employee.department,
      departmentId: employee._id
    }));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to get employees by department: ${errorMessage}`);
  }
}; 