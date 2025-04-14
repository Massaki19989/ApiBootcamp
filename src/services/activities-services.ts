import { listFilter, listTypesDb } from "../repository/activities-repository";

export async function listActivities(filter: string | null, skip: number) {
    const take: number = skip * 10
    
    const list = await listFilter(filter, take, skip)
    
    if(list){
        return list
    }else{
        return {
            id: "0",
            title: "Nenhuma atividade carregada!",
            description: "Não encontramos atividades!",
            typeId: "0",
            image: null,
            creatorId: "0"
        }
    }
}

export async function  listTypes() {
    return await listTypesDb()
}