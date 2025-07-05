FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

ENV PORT=3000
ENV DATABASE_URL='postgresql://resumeai-DB_owner:npg_3lKZI7koYuJz@ep-black-voice-a4vb5kiz-pooler.us-east-1.aws.neon.tech/resumeai-DB?sslmode=require&channel_binding=require'
ENV GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyCTyHJeHieTgIUDa1LlFY_Zus8OYP4Uwrc
ENV JWT_SECRET=1313GALO
EXPOSE 3000

RUN npm run build && \
npx prisma generate

CMD [ "npm", "start" ]