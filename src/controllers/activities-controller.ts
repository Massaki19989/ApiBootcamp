import { AuthRequest, authMiddleware } from "../middlewares/auth-middleware";
import { Express, Router } from "express";
import { listActivities, listTypes } from "../services/activities-services";

export default function ActivitiesController(app: Express){

    const router = Router()
    router.use(authMiddleware)

    router.get("/", async (req: AuthRequest, res)=>{
        try{

            let skip: number = 0
            if(req.query.pg){
                skip = Number(req.query.pg)
            }
            
            if(req.query.filter){
                const filter = String(req.query.filter)
                const list = await listActivities(filter, skip)
                res.status(200).send(list)
            }else{
                const list = await listActivities(null, skip)
                res.status(200).send(list)
            }


        }catch(err: any){
            res.status(400).send(err.message)
        }
    })

    router.get("/types", async (req, res)=>{
        try{
            const typesList = await listTypes()
            res.status(200).send(typesList)
        }catch(err: any){
            res.status(400).send("Erro ao carregar os tipos!")
        }
    })

    router.get("/all", (req, res)=>{
        
    })

    app.use('/activities', router)
}