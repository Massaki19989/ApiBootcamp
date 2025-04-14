import prisma from "../prisma/prisma-client";
import registerData from "../types/register-type";

export async function registerUser(data: registerData){
    return await prisma.users.create({
        data: data
    })
}

export async function getByEmail(email: string) {
    return await prisma.users.findUnique({
        where: {
            email
        }
    })
}

export async function getByCpf(cpf: string) {
    return await prisma.users.findUnique({
        where: {
            cpf
        }
    })
}