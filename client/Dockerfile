FROM node as build

# Create app directory
WORKDIR /usr/src/app
ENV PATH /usr/src/app/client/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY client/ /usr/src/app/client/

WORKDIR /usr/src/app/client/
RUN npm install
RUN npm run build


FROM nginx:alpine
COPY client/default.conf /etc/nginx/conf.d/default.conf
RUN apk update && apk add bash

EXPOSE 80

COPY --from=build /usr/src/app/client/build /usr/share/nginx/html
