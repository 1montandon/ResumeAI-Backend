import HttpError from "../../error/error.ts";
import prisma from "../../prisma/client.ts";
import type { Analysis } from "../../types/analysis.ts";

export async function getAnalyses(userId: string): Promise<Analysis[]> {
    const analyses = await prisma.analyses.findMany({
        where: {
            userId
        }
    })
    return analyses
}