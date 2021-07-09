FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY client/package*.json /usr/src/app/client/
COPY client/ /usr/src/app/client/

WORKDIR /usr/src/app/client/
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8000

ENTRYPOINT ["npm", "start"]
