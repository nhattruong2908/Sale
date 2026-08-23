FROM node:18-alpine

WORKDIR /app

COPY ./frontend/package*.json ./
RUN npm install

EXPOSE 5173

# Run Vite dev server with hot reload; source is bind-mounted in docker-compose.yml
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
