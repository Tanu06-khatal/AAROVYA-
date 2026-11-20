
package com.aarovya.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateMedicalRecordRequest {

    @NotBlank(message = "Record title is required")
    @Size(max = 150)
    private String recordTitle;

    @Size(max = 1000)
    private String description;

    @NotNull(message = "Record date is required")
    private LocalDate recordDate;

    @Size(max = 100)
    private String doctorName;

    @Size(max = 150)
    private String hospitalName;

    private Long categoryId;
}

