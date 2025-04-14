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
exports.registerUser = registerUser;
exports.getByEmail = getByEmail;
exports.getByCpf = getByCpf;
const prisma_client_1 = __importDefault(require("../prisma/prisma-client"));
function registerUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_client_1.default.users.create({
            data: data
        });
    });
}
function getByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_client_1.default.users.findUnique({
            where: {
                email
            }
        });
    });
}
function getByCpf(cpf) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_client_1.default.users.findUnique({
            where: {
                cpf
            }
        });
    });
}
