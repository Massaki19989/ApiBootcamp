import { Express, Router } from "express";
import { authMiddleware, AuthRequest } from "../middlewares/auth-middleware";
import { desactive, preferenceDefine, profile, update, updateAvatar } from "../services/user-services";
import { uploadAvatar } from "../multer/avatar-multer";
import jwt from "jsonwebtoken"
import tokenGenerate from "../validations/new-token";

export function UserController(app: Express){
    const router = Router()
    router.use(authMiddleware)

    router.get('/', async (req: AuthRequest, res)=>{
        try{
            const user = await profile(req.user)
            res.status(200).send(user)
        }catch(err: any){
            res.status(400).send("Ocorreu um erro!")
        }
        
    })

    router.post('/preferences', async (req: AuthRequest, res)=>{
        try{
            const preference = await preferenceDefine(req.user.id, req.body.type)
            res.send(200).send(preference)
        }catch(err: any){
            res.send(400).send("Erro!")
        }
    })

    router.put('/avatar', uploadAvatar.single('avatar'), async (req: AuthRequest, res)=>{

        if(!req.file){
            res.status(400).send("Nenhum arquivo foi enviado!")
        }

        try{

            if(req.file?.filename){
                const update = await updateAvatar(req.user.id, req.file.filename, req.user.avatar)

                const data = await tokenGenerate(update, res)

                res.status(201).send(data)
                
            }else{
                res.status(500).send('Ocorreu um erro!')
            }

        }catch(err: any){
            res.status(400).send(err.message)
        }
  
    })

    router.put('/update', async (req: AuthRequest, res)=>{
        try{
            const userUpdated = await update(req.user.id, req.body.name, req.body.password)

            if(userUpdated){
                const data = await tokenGenerate(userUpdated, res)
                res.status(201).send(data)  
            }else{
                res.status(400).send("Erro ao atualizar o usuario!")
            }
        }catch(err: any){
            res.status(400).send("Erro ao atualizar o usuario!")
        }
    })

    router.delete('/deactivate', async (req: AuthRequest, res)=>{

        try{
            await desactive(req.user.id)

            res.status(200).send("Deactivate!")
        }catch(err: any){
            res.status(400).send(err.message)
        }
    })

    app.use('/user', router)
}