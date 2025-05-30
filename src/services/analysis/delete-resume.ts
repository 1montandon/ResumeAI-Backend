import prisma from "../../prisma/client";
import HttpError from "../../error/error";
import { Analysis } from "../../types/analysis";

export async function deleteSingleAnalysis(userId: string, analysisId: string): Promise<Analysis> {
    const analysis = await prisma.analyses.delete({
        where: {
            userId,
            id: analysisId
        }
    })
    if(!analysis){
        throw new HttpError(404, "No Analysis found with that ID")
    }
    return analysis
}