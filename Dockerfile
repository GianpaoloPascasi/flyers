FROM node:15.0.1
WORKDIR /usr/src/app
COPY ./backend/package*.json ./
COPY ./backend/prod_build ./prod_build
COPY ./backend/static ./static
COPY ./backend/data ./data
RUN npm install
CMD [ "node", "prod_build/app.js" ]

EXPOSE 8080