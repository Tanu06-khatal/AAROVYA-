
package com.aarovya.service.impl;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

import com.aarovya.dto.response.MedicalDocumentResponse;
import com.aarovya.entities.MedicalDocument;
import com.aarovya.entities.MedicalRecord;
import com.aarovya.exception.ResourceNotFoundException;
import com.aarovya.repository.MedicalDocumentRepository;
import com.aarovya.repository.MedicalRecordRepository;
import com.aarovya.service.MedicalDocumentService;
import com.aarovya.util.FileStorageUtil;

@Service
@RequiredArgsConstructor
@Transactional
public class MedicalDocumentServiceImpl implements MedicalDocumentService {

    private final MedicalDocumentRepository documentRepository;
    private final MedicalRecordRepository recordRepository;
    private final FileStorageUtil fileStorageUtil;

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

    private static final Set<String> ALLOWED_TYPES = Set.of(
            "application/pdf",
            "image/jpeg",
            "image/png"
    );

    @Override
    public MedicalDocumentResponse uploadDocument(
            Long recordId, MultipartFile file) {

        MedicalRecord record = recordRepository
                .findByMedicalRecordIdAndStatusNot(recordId, "DELETED")
                .orElseThrow(() ->
                        new ResourceNotFoundException("Medical record not found"));

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please select a file");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("Maximum file size is 10 MB");
        }

        String contentType = file.getContentType();

        if (contentType == null || !ALLOWED_TYPES.contains(contentType)) {
            throw new IllegalArgumentException(
                    "Only PDF, JPG and PNG files are allowed");
        }

        String originalName = file.getOriginalFilename() == null
                ? "document"
                : java.nio.file.Path.of(file.getOriginalFilename())
                        .getFileName().toString();

        String storagePath = fileStorageUtil.storeFile(file);

        MedicalDocument document = new MedicalDocument();
        document.setFileName(
                java.nio.file.Path.of(storagePath).getFileName().toString());
        document.setOriginalFileName(originalName);
        document.setContentType(contentType);
        document.setFileSize(file.getSize());
        document.setStoragePath(storagePath);
        document.setMedicalRecord(record);

        return toResponse(documentRepository.save(document));
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicalDocumentResponse> getDocumentsByRecordId(Long recordId) {

        if (!recordRepository.existsById(recordId)) {
            throw new ResourceNotFoundException("Medical record not found");
        }

        return documentRepository
                .findByMedicalRecord_MedicalRecordId(recordId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] downloadDocument(Long documentId) {

        MedicalDocument document = documentRepository.findById(documentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Document not found"));

        return fileStorageUtil.loadFile(document.getStoragePath());
    }

    private MedicalDocumentResponse toResponse(MedicalDocument document) {

        MedicalDocumentResponse response = new MedicalDocumentResponse();

        response.setMedicalDocumentId(document.getMedicalDocumentId());
        response.setFileName(document.getFileName());
        response.setOriginalFileName(document.getOriginalFileName());
        response.setContentType(document.getContentType());
        response.setFileSize(document.getFileSize());
        response.setMedicalRecordId(
                document.getMedicalRecord().getMedicalRecordId());
        response.setUploadedAt(document.getUploadedAt());

        return response;
    }
}
