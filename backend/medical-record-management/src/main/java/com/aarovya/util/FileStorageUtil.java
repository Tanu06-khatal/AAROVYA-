
package com.aarovya.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileStorageUtil {

    private final Path storageLocation;

    public FileStorageUtil(Path fileStorageLocation) {
        this.storageLocation = fileStorageLocation;

        try {
            Files.createDirectories(this.storageLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not create storage directory", e);
        }
    }

    public String storeFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        String originalFileName = Path.of(file.getOriginalFilename() == null
                ? "document"
                : file.getOriginalFilename()).getFileName().toString();

        String extension = "";

        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex >= 0) {
            extension = originalFileName.substring(dotIndex).toLowerCase();
        }

        String storedFileName = UUID.randomUUID() + extension;
        Path targetPath = storageLocation.resolve(storedFileName).normalize();

        if (!targetPath.startsWith(storageLocation)) {
            throw new IllegalArgumentException("Invalid file path");
        }

        try {
            Files.copy(file.getInputStream(), targetPath);
            return targetPath.toString();
        } catch (IOException e) {
            throw new RuntimeException("Could not store file", e);
        }
    }

    public byte[] loadFile(String storagePath) {

        try {
            Path filePath = Path.of(storagePath).toAbsolutePath().normalize();

            if (!filePath.startsWith(storageLocation) || !Files.exists(filePath)) {
                throw new IllegalArgumentException("File not found");
            }

            return Files.readAllBytes(filePath);

        } catch (IOException e) {
            throw new RuntimeException("Could not read file", e);
        }
    }
}
