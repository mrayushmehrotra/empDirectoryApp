FROM ubuntu:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 8000
CMD ["npm", "start"] 