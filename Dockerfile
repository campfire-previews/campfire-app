# base image for app
FROM node:20-alpine

# set a directory for the app
WORKDIR /fi

# copy all the files to the container
COPY . .

# install dependencies
RUN npm install

# expose port for container
EXPOSE 5173

# run the app
CMD ["npm", "start"]
