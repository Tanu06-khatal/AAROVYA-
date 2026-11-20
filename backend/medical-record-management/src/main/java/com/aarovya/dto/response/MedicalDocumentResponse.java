
package com.aarovya.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MedicalDocumentResponse {

    private Long medicalDocumentId;

    private String fileName;

    private String originalFileName;

    private String contentType;

    private Long fileSize;

    private Long medicalRecordId;

    private LocalDateTime uploadedAt;
}
