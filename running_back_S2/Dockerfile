FROM eclipse-temurin:21-jdk
ARG JAR_FILE=target/*.jar
ARG PROFILE
WORKDIR /app
COPY ../../../asd/deploy-study1/running_back_S2/upload /app/upload
COPY ${JAR_FILE} /app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=${PROFILE}", "-jar", "/app.jar"]
