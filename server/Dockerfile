FROM maven:3.5-jdk-8-alpine
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN mvn clean package

FROM openjdk:8-jdk-alpine
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/target/dictionary-0.1.0.jar /usr/src/app
ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar dictionary-0.1.0.jar