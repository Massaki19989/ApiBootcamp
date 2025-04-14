import jwt from "jsonwebtoken"
import { Response } from "express"

export default async function tokenGenerate(data: any, res:Response){

    data.password = ''

    if(process.env.SECRET_KEY){
        const newToken = jwt.sign(data, process.env.SECRET_KEY, {expiresIn: "1d"})

        res.cookie("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000*60*60*24
        })

        return data
    }else{
        throw new Error("Erro ao criar o token!")
    }

    
}