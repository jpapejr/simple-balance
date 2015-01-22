FROM dockerfile/nodejs
MAINTAINER jpapejr@icloud.com
ADD . /data
WORKDIR /data
RUN npm install
CMD ["node", "/data/test-balance.js"]