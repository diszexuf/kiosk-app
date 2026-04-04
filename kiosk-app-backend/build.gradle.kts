plugins {
    java
    id("org.springframework.boot") version "4.0.5"
    id("io.spring.dependency-management") version "1.1.7"
    id("org.openapi.generator") version "7.18.0"
}

group = "com.diszexuf"
version = "0.0.1-SNAPSHOT"
description = "kiosk-app-backend"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(25)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.swagger.core.v3:swagger-annotations:2.2.20")
    implementation("org.openapitools:jackson-databind-nullable:0.2.6")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("jakarta.validation:jakarta.validation-api:3.0.2")

    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-liquibase")
    implementation("org.springframework.boot:spring-boot-starter-webmvc")
    implementation("org.springframework.boot:spring-boot-starter-actuator")

    implementation("org.mapstruct:mapstruct:1.5.5.Final")
    annotationProcessor("org.mapstruct:mapstruct-processor:1.5.5.Final")

    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok-mapstruct-binding:0.2.0")

    developmentOnly("org.springframework.boot:spring-boot-devtools")
    runtimeOnly("org.postgresql:postgresql")

    testImplementation("org.springframework.boot:spring-boot-starter-data-jpa-test")
    testImplementation("org.springframework.boot:spring-boot-starter-liquibase-test")
    testImplementation("org.springframework.boot:spring-boot-starter-webmvc-test")
    testCompileOnly("org.projectlombok:lombok")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    testAnnotationProcessor("org.projectlombok:lombok")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

openApiGenerate {
    generatorName.set("spring")
    inputSpec.set("$rootDir/../api-contract/openapi.yml")
    outputDir.set("$projectDir/build/generated")

    configOptions.set(mapOf(
        "interfaceOnly" to "true",
        "useOptional" to "false",
        "skipDefaultInterface" to "true",
        "useTags" to "true",
        "useSpringBoot3" to "true",
        "library" to "spring-boot",
        "useJakartaEe" to "true",
        "serializableModel" to "true",
        "dateLibrary" to "java8",
        "useBeanValidation" to "true",
        "performBeanValidation" to "true"
    ))

    globalProperties.set(mapOf(
        "apis" to "",
        "models" to "",
        "supportingFiles" to "false"
    ))
}

tasks.register("cleanOpenApiGenerate", Delete::class) {
    delete("$projectDir/build/generated")
}

tasks.named("openApiGenerate") {
    dependsOn("cleanOpenApiGenerate")
}

tasks.named("compileJava") {
    dependsOn("openApiGenerate")
}

sourceSets {
    main {
        java {
            srcDir("$projectDir/build/generated/src/main/java")
        }
    }
}
