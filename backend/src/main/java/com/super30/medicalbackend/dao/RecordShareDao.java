package com.super30.medicalbackend.dao;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.super30.medicalbackend.enums.ShareStatus;

import com.super30.medicalbackend.entities.RecordShare;
public interface RecordShareDao extends JpaRepository<RecordShare, Long> {
 List<RecordShare> findByOwnerIdOrderByRequestedAtDesc(Long ownerId);
 List<RecordShare> findByReceiverIdOrderByRequestedAtDesc(Long receiverId);
 List<RecordShare> findByTimelineIdOrderByRequestedAtDesc(Long timelineId);
 List<RecordShare> findByTimelineIdAndStatus(Long timelineId, ShareStatus status);
 List<RecordShare> findByStatus(ShareStatus status);
 Optional<RecordShare> findByTimelineIdAndReceiverId(Long timelineId, Long receiverId);
 boolean existsByTimelineIdAndReceiverIdAndStatusIn(Long timelineId, Long receiverId, java.util.Collection<ShareStatus> statuses);
 boolean existsByTimelineIdAndReceiverIdAndStatusAndRespondedAtIsNotNull(Long timelineId, Long receiverId, ShareStatus status);

 /** Compatibility query used by the consent module. */
 @Query("select s from RecordShare s where s.timelineId = :recordId and s.receiverId = :granteeUserId")
 Optional<RecordShare> findByRecordIdAndGranteeUserId(@Param("recordId") Long recordId,
        @Param("granteeUserId") Long granteeUserId);
}
