import { definePreferenceUser, desactiveUser, getPreferenceById, updateUser, updateUserDb } from "../repository/user-repository";
import path from "path"
import fs from "fs"

export async function profile(user: any) {

    if(!user){
        throw new Error("Erro de usuario!")
    }

    const dataUser = {
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        avatar: user.avatar,
        xp: user.xp,
        level: user.level
    }

    return dataUser
    
}

export async function preferenceDefine(userId: string, typeId: string) {
    
    const searchPreference = await getPreferenceById(typeId)

    if(searchPreference){
        return await definePreferenceUser(userId, typeId)
    }else{
        throw new Error("Esta preferencia nao foi encontrada!")
    }
}


export async function updateAvatar(idUser: string, avatar: string, oldAvatar: string) {

    if(oldAvatar){
        const avatarPath = path.join(__dirname, '../', 'images', 'avatar', oldAvatar)

        if(fs.existsSync(avatarPath)){
            fs.unlink(avatarPath, (err)=>{
                if(err){
                    console.log(err)
                }
            })
        }
    }

    if(avatar){
        return await updateUser(idUser, avatar)
    }else{
        throw new Error("A imagem não foi enviada!")
    }
    
}

export async function update(userId: string, name: string, password: string) {
    return await updateUserDb(userId, name, password)
}

export async function desactive(id: string) {
    const date = new Date()
    const desactived = await desactiveUser(id, date)
    if(desactived){
        return "Desativado"
    }else{
        throw new Error("Ocorreu um erro ao tentar desativar o usuario!")
    }
}