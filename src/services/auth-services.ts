import registerData from "../types/register-type";
import { hash, genSalt, compare } from "bcrypt";
import { 
    registerUser,
    getByCpf,
    getByEmail
 } from "../repository/auth-repository";
import LoginData from "../types/login-type";
import jwt from "jsonwebtoken"

export async function login(data: LoginData){
    const getUser = await getByEmail(data.email)

    if(getUser){
        const validatePassword = await compare(data.password, getUser.password)
        if(validatePassword){
            if(!getUser.deletedAt){
                const secret = process.env.SECRET_KEY
                if(!secret){
                    throw new Error("Ocorreu um erro!")
                }

                getUser.password = ''

                const token = jwt.sign(getUser, secret, {expiresIn:"1d"})

                return token
            }else{
                throw new Error("Este usuario foi desativado!")
            }
        }else{
            throw new Error("Senha incorreta!")
        }
    }else{
        throw new Error("Este email não foi cadastrado!")
    }
}

export async function register(data: registerData){
    
    const validateCpf = await getByCpf(data.cpf)
    const validateEmail = await getByEmail(data.email)

 
    if(validateCpf){
        throw new Error("Este cpf ja está cadastrado!")
    }

    if(validateEmail){
        throw new Error("Este email ja está cadastrado!")
    }

    try{

        const salt = await genSalt(10)
        const passwordHash = await hash(data.password, salt)
        data.password = passwordHash
        const registro = await registerUser(data)
        return registro
    }catch(err: any){
        throw new Error("Ocorreu um erro!")
    }
        


}