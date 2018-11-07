FROM kthse/kth-nodejs-web:2.4

COPY package.json package.json

RUN [ "npm", "install" ]

COPY ["schemas", "schemas"]
COPY ["config", "config"]
COPY ["modules", "modules"]
COPY ["server.js", "server.js"]
COPY ["validation.js", "validation.js"]

ENTRYPOINT [ "npm", "run", "start" ]