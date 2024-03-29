FROM node:16
WORKDIR /usr/src/app
COPY . .
RUN npm rebuild
RUN yarn install
RUN npm install 
RUN npm run build
CMD npm run start
