FROM gradle:jdk25-alpine AS build
WORKDIR /app

COPY kiosk-app-backend/build.gradle.kts ./build.gradle.kts
COPY kiosk-app-backend/settings.gradle.kts ./settings.gradle.kts
RUN gradle dependencies --no-daemon

COPY api-contract/openapi.yml /api-contract/openapi.yml
COPY kiosk-app-backend/src ./src
RUN gradle bootJar --no-daemon

FROM eclipse-temurin:25-jdk-alpine
WORKDIR /app
RUN apk add --no-cache curl
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]