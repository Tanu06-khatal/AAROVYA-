
package com.aarovya.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "patient_profiles")
public class PatientProfile {

    @Id
    private Long patientProfileId;

    public Long getPatientProfileId() {
        return patientProfileId;
    }

    public void setPatientProfileId(Long patientProfileId) {
        this.patientProfileId = patientProfileId;
    }
}
