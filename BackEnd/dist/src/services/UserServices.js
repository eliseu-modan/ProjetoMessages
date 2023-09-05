"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const client_1 = require("@prisma/client");
const faker_1 = __importDefault(require("faker"));
const prisma = new client_1.PrismaClient();
class UserServices {
    constructor() {
        this.users = {
            name: 'Modanesi Junior',
            email: 'EliseuModanesi@Seg.com'
        };
    }
    getUsers() {
        const randomName = faker_1.default.name.findName();
        const randomEmail = faker_1.default.internet.email();
        return {
            name: randomName,
            email: randomEmail
        };
    }
}
exports.UserServices = UserServices;
exports.default = UserServices;
