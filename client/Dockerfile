FROM node:16-alpine3.11
WORKDIR /usr/src/app
COPY client/package*.json ./
ADD client/package.json /usr/src/app/package.json
RUN npm install
RUN npm install react-scripts@4.0.3 -g
COPY client/ .
EXPOSE 80
CMD ["npm ","start"];

#FROM node:16-alpine3.11 as builder
#WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH
#COPY client/package.json ./
#COPY client/package-lock.json ./
#RUN npm ci --silent
#RUN npm install react-scripts@4.0.3 -g --silent
#COPY client/ ./
#RUN npm run build

# production environment
#FROM nginx:stable-alpine
#COPY --from=builder /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]   
