FROM node

# Create app directory
WORKDIR /usr/src/app
ENV PATH /usr/src/app/client/node_modules/.bin:$PATH
ENV PATH /usr/src/app/client/node_modules/:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY client/ /usr/src/app/client/

WORKDIR /usr/src/app/client/
RUN npm install


EXPOSE 8000

ENTRYPOINT ["npm", "start"]
