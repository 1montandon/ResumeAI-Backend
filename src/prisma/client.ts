import{ PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log:['info', 'error', 'warn']
})

prisma.$connect().then(() => console.log("Prisma conectado com sucesso")).catch(()=> console.log("Falha ao conectar com prisma "))

export default prisma