import { Express, Router } from "express";
import { login, register } from "../services/auth-services";
import validateRequestBody from "../middlewares/request-body-validator";
import { registerValidation } from "../validations/register-validation";
import { loginValidation } from "../validations/login-validation";

export default function AuthController(app: Express){

    const router = Router()

    router.post('/register', validateRequestBody(registerValidation), async (req, res)=>{
        try{
            const data = {
                name: req.body.name,
                email: req.body.email,
                cpf: req.body.cpf,
                password: req.body.password
            }
            const user = await register(data)
            res.status(200).send(user)
        }catch(err: any){
            res.status(400).send(err.message)
        }
    })

    router.post('/login', validateRequestBody(loginValidation), async (req, res)=>{
        try{
            const data = {
                email: req.body.email,
                password: req.body.password
            }
            const token = await login(data)

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000*60*60*24
            })

            res.status(200).send("Sucesso")
        }catch(err: any){
            res.status(401).send(err.message)
        }
    })

    app.use('/auth', router)
}