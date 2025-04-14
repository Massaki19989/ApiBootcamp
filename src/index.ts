import express, {json} from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import AuthController from './controllers/auth-controller'
import { UserController } from './controllers/user-controller'
import ActivitiesController from './controllers/activities-controller'

const app = express()
const port = process.env.PORT

app.use(json())
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}))
app.use(cookieParser())

AuthController(app)
UserController(app)
ActivitiesController(app)

app.listen(port, ()=>{
    console.log('rodando')
})