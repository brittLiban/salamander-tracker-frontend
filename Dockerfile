FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install


COPY . .

# Allow build-time API URL configuration
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
