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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserServices_1 = __importDefault(require("../services/UserServices"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userServices = new UserServices_1.default();
            const users = userServices.getUsers();
            console.log('deu certo ');
            res.json(users);
        });
    },
    CreateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userServices = new UserServices_1.default();
                const users = userServices.getUsers();
                const createUser = yield prisma.user.create({
                    data: users
                });
                console.log('create', createUser);
                return res.json(createUser);
            }
            catch (error) {
                return console.log("erro ao criar", error);
            }
        });
    }
};
