FROM eclipse-temurin:17-jdk-alpine

LABEL authors="Enchante"

ARG JAR_FILE=target/api-products-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} products.jar

ENTRYPOINT ["java","-jar","products.jar"]

EXPOSE 8081