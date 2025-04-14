import multer from "multer";
import path from 'path'

export const uploadAvatar = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback)=>{
            callback(null, path.resolve("src/images/avatar"))
        },
        filename: (req, file, callback)=>{
            const time = new Date().getTime()

            callback(null, `avatar-${time}_${file.originalname}`)
        }
    }),
    fileFilter: (req, file, callback)=>{
        const allowedTipes = ["image/png", "image/jpg", "image/jpeg", "image/webp"]
        if(allowedTipes.includes(file.mimetype)){
            callback(null, true)
        }else{
            callback(null, false)
        }
    }
})