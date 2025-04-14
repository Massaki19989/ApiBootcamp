import {z} from "zod"

export const registerValidation = z.object({
    name: z.string().min(3, {message: "O nome precisa ter no minimo 3 caracteres!"}),
    email: z.string().email({message: "Email inválido!"}),
    cpf: z.string().length(11, {message: "O cpf precisa ter exatamente 11 caracteres!"}),
    password: z.string().min(6, {message: "A senha deve ter pelo menos 6 caracteres!"})
})