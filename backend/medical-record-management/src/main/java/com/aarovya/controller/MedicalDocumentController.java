
package com.aarovya.controller;

import java.util.List;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

import com.aarovya.dto.response.MedicalDocumentResponse;
import com.aarovya.service.MedicalDocumentService;

@RestController
@RequestMapping("/api/medical-documents")
@RequiredArgsConstructor
public class MedicalDocumentController {

    private final MedicalDocumentService documentService;

    @PostMapping(
        value = "/upload/{recordId}",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<MedicalDocumentResponse> uploadDocument(
            @PathVariable Long recordId,
            @RequestParam("file") MultipartFile file) {

        return ResponseEntity.ok(
                documentService.uploadDocument(recordId, file));
    }

    @GetMapping("/record/{recordId}")
    public ResponseEntity<List<MedicalDocumentResponse>> getDocuments(
            @PathVariable Long recordId) {

        return ResponseEntity.ok(
                documentService.getDocumentsByRecordId(recordId));
    }

    @GetMapping("/{documentId}/download")
    public ResponseEntity<ByteArrayResource> downloadDocument(
            @PathVariable Long documentId) {

        byte[] data = documentService.downloadDocument(documentId);

        ByteArrayResource resource = new ByteArrayResource(data);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"document-" + documentId + "\"")
                .contentLength(data.length)
                .body(resource);
    }
}
