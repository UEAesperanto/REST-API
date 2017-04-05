FROM node:latest

WORKDIR /app

RUN apt-get update && apt-get install -y \
    mysql-client \
    postgresql-client \
&& rm -rf /var/lib/apt/lists/*

RUN npm install -g bower

EXPOSE 3000
CMD [ "sh", "-c", "npm install --unsafe-perm && npm start" ]

