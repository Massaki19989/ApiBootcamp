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
exports.default = AuthController;
const express_1 = require("express");
const auth_services_1 = require("../services/auth-services");
const request_body_validator_1 = __importDefault(require("../middlewares/request-body-validator"));
const register_validation_1 = require("../validations/register-validation");
const login_validation_1 = require("../validations/login-validation");
function AuthController(app) {
    const router = (0, express_1.Router)();
    router.post('/register', (0, request_body_validator_1.default)(register_validation_1.registerValidation), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const data = {
                name: req.body.name,
                email: req.body.email,
                cpf: req.body.cpf,
                password: req.body.password
            };
            const user = yield (0, auth_services_1.register)(data);
            res.status(200).send(data);
        }
        catch (err) {
            res.status(400).send('teste');
        }
    }));
    router.post('/login', (0, request_body_validator_1.default)(login_validation_1.loginValidation), (req, res) => {
        try {
            const data = {
                name: req.body.name,
                email: req.body.email,
                cpf: req.body.cpf,
                password: req.body.password
            };
            const user = (0, auth_services_1.register)(data);
            res.status(200).send(data);
        }
        catch (err) {
            res.status(400).send(err.message);
        }
    });
    app.use('/auth', router);
}
