FROM java

#Install Liquibase
COPY lib/liquibase-3.2.2-bin.tar.gz /tmp/liquibase-3.2.2-bin.tar.gz
RUN mkdir /opt/liquibase
RUN tar -xzf /tmp/liquibase-3.2.2-bin.tar.gz -C /opt/liquibase
RUN chmod +x /opt/liquibase/liquibase
RUN ln -s /opt/liquibase/liquibase /usr/local/bin/
COPY lib/mysql-connector-java-5.1.44-bin.jar /opt/jdbc_drivers/
COPY lib/snakeyaml-1.19.jar /opt/jdbc_drivers/
RUN ln -s /opt/jdbc_drivers/mysql-connector-java-5.1.44-bin.jar /usr/local/bin/
RUN ln -s /opt/jdbc_drivers/snakeyaml-1.19.jar.jar /usr/local/bin/

#Install mysql-client
RUN apt-get update && apt-get install -y \
    mysql-client \
&& rm -rf /var/lib/apt/lists/*

COPY ./changelog /changelog

COPY ./entrypoint.sh /
CMD ["bash", "/entrypoint.sh"]
