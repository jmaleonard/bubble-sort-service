FROM tarampampam/node:alpine
LABEL MAINTAINER 'Jared Leonard <jmaleonard@github.com>'
RUN git clone https://github.com/jmaleonard/bubble-sort-service.git
RUN cd bubble-sort-service && yarn
EXPOSE 8000 443
COPY files/startscript.sh /root/startscript.sh
RUN chmod +x /root/startscript.sh 
ENTRYPOINT ["bash", "/root/startscript.sh"]
