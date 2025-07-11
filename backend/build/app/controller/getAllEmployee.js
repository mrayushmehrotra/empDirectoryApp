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
exports.getAllEmp = void 0;
const dbOperations_1 = require("../../db/dbOperations");
const getAllEmp = () => __awaiter(void 0, void 0, void 0, function* () {
    const Employee = (0, dbOperations_1.getEmployee)();
    const users = yield Employee.findMany();
    return users.map(user => ({
        id: user._id,
        name: user.name,
        position: user.position,
        salary: user.salary.toString(),
        department: user.department,
        departmentId: user._id
    }));
});
exports.getAllEmp = getAllEmp;
