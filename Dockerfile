# Java 21 imajı kullanın
FROM eclipse-temurin:21-jdk-alpine

# Çalışma dizinini ayarla
WORKDIR /app

# Maven wrapper ve pom.xml kopyala
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Maven bağımlılıklarını önceden indir
RUN ./mvnw dependency:go-offline -B

# Kaynak kodları kopyala
COPY src ./src

# Uygulamayı paketle
RUN ./mvnw package -DskipTests

# Gerekli portu dışa aç
EXPOSE 8082

# Uygulamayı başlat
CMD ["java", "-jar", "target/notesbackend-0.0.1-SNAPSHOT.jar"]
