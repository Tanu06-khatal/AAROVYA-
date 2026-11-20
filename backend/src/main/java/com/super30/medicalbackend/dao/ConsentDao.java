package com.super30.medicalbackend.dao;
import java.util.Optional;
import java.util.List;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.super30.medicalbackend.entities.Consent;
public interface ConsentDao extends JpaRepository<Consent, Long> {
 List<Consent> findByPatientIdOrderByGrantedAtDesc(Long patientId);
 List<Consent> findByGrantedToUserIdOrderByGrantedAtDesc(Long grantedToUserId);
 List<Consent> findByPatientIdAndGrantedToUserId(Long patientId, Long grantedToUserId);
 List<Consent> findByTimelineId(Long timelineId);

 @Query("select case when count(c) > 0 then true else false end from Consent c "
        + "where c.patientId = :patientId and c.grantedToUserId = :grantedToUserId "
        + "and c.status = com.super30.medicalbackend.enums.ConsentStatus.GRANTED "
        + "and ((:timelineId is null and c.timelineId is null) or c.timelineId = :timelineId) "
        + "and (c.expiresAt is null or c.expiresAt > :now)")
 boolean existsValidConsentForScope(@Param("patientId") Long patientId,
        @Param("grantedToUserId") Long grantedToUserId,
        @Param("timelineId") Long timelineId, @Param("now") LocalDateTime now);

 @Query("select case when count(c) > 0 then true else false end from Consent c "
        + "where c.patientId = :patientId and c.grantedToUserId = :grantedToUserId "
        + "and c.status = com.super30.medicalbackend.enums.ConsentStatus.GRANTED "
        + "and (c.timelineId is null or c.timelineId = :timelineId) "
        + "and (c.expiresAt is null or c.expiresAt > :now)")
 boolean hasValidConsentForRecord(@Param("patientId") Long patientId,
        @Param("grantedToUserId") Long grantedToUserId,
        @Param("timelineId") Long timelineId, @Param("now") LocalDateTime now);

 /** Compatibility lookup retained for older integrations. */
 @Query("select c from Consent c where c.timelineId = :recordId and c.grantedToUserId = :granteeUserId")
 Optional<Consent> findByRecordIdAndGranteeUserId(@Param("recordId") Long recordId,
        @Param("granteeUserId") Long granteeUserId);

 @Query("select c from Consent c where c.timelineId = :recordId")
 List<Consent> findByRecordId(@Param("recordId") Long recordId);
}
