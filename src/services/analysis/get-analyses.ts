import { Analyses } from "@prisma/client";
import HttpError from "../../error/error";
import prisma from "../../prisma/client";
import { Analysis } from "../../types/analysis";

export async function getAnalyses(userId: string): Promise<Analysis[]> {
    const analyses = await prisma.analyses.findMany({
        where: {
            userId
        }
    })
    return analyses
}