FROM eclipse-temurin:17-jdk-alpine

LABEL authors="Enchante"

ARG JAR_FILE=target/api-users-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} users.jar

ENTRYPOINT ["java","-jar","users.jar"]

EXPOSE 8082