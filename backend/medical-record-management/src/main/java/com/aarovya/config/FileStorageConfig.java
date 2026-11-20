
package com.aarovya.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FileStorageConfig {

    @Bean
    public Path fileStorageLocation(
            @Value("${file.upload-dir:uploads/medical-documents}") String uploadDir) {

        return Paths.get(uploadDir)
                .toAbsolutePath()
                .normalize();
    }
}
