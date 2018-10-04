FROM kthse/kth-nodejs-web:2.4

COPY package.json package.json

RUN [ "npm", "install" ]

COPY schemas schemas
COPY server.js server.js

ENTRYPOINT [ "npm", "run", "start" ]