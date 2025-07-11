export const schema = `#graphql 

input CreateEmployeeInput {
  name: String!
  position: String!
  salary: Int!
  department: String!
  floor: Int
}

type Employee{
id: ID!
name: String 
position: String 
salary: String 
department: String 
departmentId: ID!
}

type Query {
Employee: [Employee]
getEmployeeDetails(id: ID!): Employee
getEmployeesByDepartment(department: String!): [Employee]
}

type Mutation {
  createEmployee(input: CreateEmployeeInput!): Employee!
}

`;
