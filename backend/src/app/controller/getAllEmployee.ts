import { getEmployee } from "../../db/dbOperations"

export const getAllEmp = async () => {
  const Employee = getEmployee();
  const users = await Employee.findMany();
  return users.map(user => ({
    id: user._id,
    name: user.name,
    position: user.position,
    salary: user.salary.toString(),
    department: user.department,
    departmentId: user._id
  }));
};
