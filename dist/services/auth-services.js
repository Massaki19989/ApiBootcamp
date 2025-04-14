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
exports.login = login;
exports.register = register;
const auth_repository_1 = require("../repository/auth-repository");
function login(data) {
    return true;
}
function register(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateCpf = yield (0, auth_repository_1.getByCpf)(data.cpf);
        const validateEmail = yield (0, auth_repository_1.getByEmail)(data.email);
        if (validateCpf) {
            throw new Error("Ocorreu um erro!");
        }
        if (validateEmail) {
            throw new Error("Ocorreu um erro!");
        }
        try {
            const registro = yield (0, auth_repository_1.registerUser)(data);
            return registro;
        }
        catch (err) {
            throw new Error("Ocorreu um erro!");
        }
    });
}
