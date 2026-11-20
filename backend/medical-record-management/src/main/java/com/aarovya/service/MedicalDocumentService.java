
package com.aarovya.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.aarovya.dto.response.MedicalDocumentResponse;

public interface MedicalDocumentService {

    MedicalDocumentResponse uploadDocument(
            Long recordId,
            MultipartFile file
    );

    List<MedicalDocumentResponse> getDocumentsByRecordId(Long recordId);

    byte[] downloadDocument(Long documentId);
}
