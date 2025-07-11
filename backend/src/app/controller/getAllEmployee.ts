import { Employee } from "../../db/dbSchema"
export const getAllEmp = async () => {
  const Users = await Employee.find({});
  return Users;
};
