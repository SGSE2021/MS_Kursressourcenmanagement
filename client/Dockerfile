#FROM node as build

# Create app directory
#WORKDIR /usr/src/app
#ENV PATH /usr/src/app/client/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY client/ /usr/src/app/client/

#WORKDIR /usr/src/app/client/
#RUN npm install
#RUN npm run build


#FROM nginx:alpine
#COPY client/default.conf /etc/nginx/conf.d/default.conf
#RUN apk update && apk add bash

#EXPOSE 80

#COPY --from=build /usr/src/app/client/build /usr/share/nginx/html


FROM node:13.12.0-alpine as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY client/package.json ./
COPY client/package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY client/ ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]   
