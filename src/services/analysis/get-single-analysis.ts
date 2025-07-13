import HttpError from '../../error/error.ts';
import prisma from '../../prisma/client.ts';
import type { Analysis } from '../../types/analysis.ts';

export async function getSingleAnalysis(
    userId: string,
    analysisId: string
): Promise<Analysis> {
    const analysis = await prisma.analyses.findFirst({
        where: {
            userId,
            id: analysisId,
        },
    });
    if (!analysis) {
        throw new HttpError(404, 'No Analysis found with that ID');
    }
    return analysis;
}
