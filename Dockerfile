FROM kthse/kth-nodejs-web:2.4

COPY package.json package.json

RUN [ "npm", "install" ]

ADD schemas schemas
ADD server.js server.js

ENTRYPOINT [ "npm", "run", "start" ]