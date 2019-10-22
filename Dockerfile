FROM kthse/kth-nodejs:12.0.0

COPY package.json package.json

RUN [ "npm", "install" ]

COPY ["schemas", "schemas"]
COPY ["config", "config"]
COPY ["modules", "modules"]
COPY ["server.js", "server.js"]
COPY ["validation.js", "validation.js"]

CMD [ "npm", "run", "start" ]