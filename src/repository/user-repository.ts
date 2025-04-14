import prisma from "../prisma/prisma-client";
import avatarData from "../validations/avatar-update-type";

export async function definePreferenceUser(userId: string, typeId: string){
    return await prisma.preferences.create({
        data: {
            userId,
            typeID: typeId
        }
    })
}

export async function getPreferenceById(typeId: string){
    return await prisma.preferences.findUnique({
        where: {
            id: typeId
        }
    })
}

export async function updateUser(idUser: string, avatar: string) {
    return await prisma.users.update({
        where: {
            id: idUser
        },
        data: {
            avatar
        }
    })
}

export async function updateUserDb(idUser: string, name: string, password: string) {

    if(password && name){
        return await prisma.users.update({
            where: {
                id: idUser
            },
            data: {
                name,
                password
            }
        })
    }else if(name){
        return await prisma.users.update({
            where: {
                id: idUser
            },
            data: {
                name
            }
        })
    }else if(password){
        return await prisma.users.update({
            where: {
                id: idUser
            },
            data: {
                password
            }
        })
    }

}

export async function desactiveUser(id: string, date: Date) {
    return await prisma.users.update({
        where: {
            id
        },
        data: {
            deletedAt: date
        }
    })
}