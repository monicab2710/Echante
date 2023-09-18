FROM eclipse-temurin:17-jdk-alpine

LABEL authors="Enchante"

ARG JAR_FILE=target/api-reservations-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} reservations.jar

ENTRYPOINT ["java","-jar","reservations.jar"]

EXPOSE 8087