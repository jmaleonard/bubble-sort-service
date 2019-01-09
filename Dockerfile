FROM tarampampam/node:alpine
LABEL MAINTAINER 'Jared Leonard <jmaleonard@github.com>'
RUN git clone git@github.com:jmaleonard/bubble-sort-service.git
RUN npm install forever -g
RUN cd bubble-sort-service
RUN yarn
EXPOSE 80 443
COPY files/startscript.sh /root/startscript.sh
RUN chmod +x /root/startscript.sh 
ENTRYPOINT ["bash", "/root/startscript.sh"]
