
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request{
    user?: any
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction)=>{
    const token = req.cookies.token;

    if(!token){
        res.status(401).send("Usuario nao logado")
    }

    try{
        
        const secret = process.env.SECRET_KEY

        if(secret){
            const decoded = jwt.verify(token, secret)
            req.user = decoded;
            next()
        }else{
            throw new Error("Chave não definida!")
        }
        
        
    }catch(err: any){
        throw new Error("Não é possivel acessar!")
    }
}