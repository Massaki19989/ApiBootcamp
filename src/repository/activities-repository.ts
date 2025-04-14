import prisma from "../prisma/prisma-client";

export async function listFilter(typeId: string | null, take: number | undefined, skip: number) {
    return await prisma.activities.findMany({
        where: {
            typeId: typeId ? typeId: undefined
        },
        orderBy: {
            createAt: "asc"
        },
        take,
        skip
    })
}

export async function listTypesDb(){
    return await prisma.activityTypes.findMany()
}