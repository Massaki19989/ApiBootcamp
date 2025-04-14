"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
const zod_1 = require("zod");
exports.registerValidation = zod_1.z.object({
    name: zod_1.z.string().min(3, { message: "O nome precisa ter no minimo 3 caracteres!" }),
    email: zod_1.z.string().email({ message: "Email inválido!" }),
    cpf: zod_1.z.string().length(11, { message: "O cpf precisa ter exatamente 11 caracteres!" }),
    password: zod_1.z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres!" })
});
