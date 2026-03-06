# Stage 1: Build the Vite Client
FROM node:20-alpine AS client-build
WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client .
RUN npm run build

# Stage 2: Build the Quarkus Backend
FROM maven:3.9.6-eclipse-temurin-17 AS server-build
WORKDIR /app/api

# Copy backend pom and resolve dependencies
COPY api/pom.xml .
RUN mvn dependency:go-offline -B

# Copy backend source
COPY api/src ./src

# Create the META-INF/resources directory and copy the built client files into it
RUN mkdir -p src/main/resources/META-INF/resources
COPY --from=client-build /app/client/dist/ ./src/main/resources/META-INF/resources/

# Build the Quarkus application
RUN mvn package -DskipTests

# Stage 3: Runtime Environment
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

ENV LANGUAGE='en_US:en'

# Copy the Quarkus layered build output
COPY --from=server-build /app/api/target/quarkus-app/lib/ /app/lib/
COPY --from=server-build /app/api/target/quarkus-app/*.jar /app/
COPY --from=server-build /app/api/target/quarkus-app/app/ /app/app/
COPY --from=server-build /app/api/target/quarkus-app/quarkus/ /app/quarkus/

EXPOSE 8080

CMD ["java", "-jar", "/app/quarkus-run.jar"]
