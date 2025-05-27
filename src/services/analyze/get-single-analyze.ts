import prisma from "../../prisma/client";

export async function getSingleAnalyzes(userId: string, analyzeId: string) {
    const analyses = await prisma.analyses.findMany({
        where: {
            userId,
            id: analyzeId
        }
    })
    if(!analyses){
    }
    console.log(analyses)
    return analyses
}