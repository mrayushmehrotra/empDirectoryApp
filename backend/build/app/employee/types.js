"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql 

input CreateEmployeeData {

    id           String    
    name         String
    position     String
    salary       Int
    department   Department
    departmentId String    
}

type EmployeeType {
id: ID!
name: String 
position String 
salary String 
department String 
departmentId ID!
}
`;
