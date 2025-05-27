import prisma from "../../prisma/client";

export async function getAnalyzes(userId: string) {
    console.log("service")
    const analyses = await prisma.analyses.findMany({
        where: {
            userId
        }
    })
    if(!analyses){
    }
    console.log(analyses)
    return analyses
}