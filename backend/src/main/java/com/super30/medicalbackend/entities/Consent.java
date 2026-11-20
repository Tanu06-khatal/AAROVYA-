
package com.super30.medicalbackend.entities;
import java.time.LocalDateTime;

import com.super30.medicalbackend.enums.ConsentStatus;

import jakarta.persistence.*;
@Entity @Table(name="record_consents", uniqueConstraints=@UniqueConstraint(name="uk_record_consent_active_scope", columnNames={"owner_user_id","grantee_user_id","active_scope_key"}))
public class Consent {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long consentId;
 @Column(name="owner_user_id",nullable=false) private Long patientId;
 @Column(name="grantee_user_id",nullable=false) private Long grantedToUserId;
 @Column(name="record_id") private Long timelineId;
 @Column(name="active_scope_key") private Long activeScopeKey;
 @Column(nullable=false,length=300) private String purpose;
 @Enumerated(EnumType.STRING) @Column(nullable=false,length=16) private ConsentStatus status;
 @Column(nullable=false) private LocalDateTime grantedAt;
 private LocalDateTime expiresAt;
 private LocalDateTime revokedAt;
 @Column(nullable=false,updatable=false) private LocalDateTime createdAt;
 @Column(nullable=false) private LocalDateTime updatedAt;
 protected Consent() {}
 public Consent(Long patientId,Long grantedToUserId,Long timelineId,String purpose,LocalDateTime expiresAt){this.patientId=patientId;this.grantedToUserId=grantedToUserId;this.timelineId=timelineId;this.activeScopeKey=timelineId==null?0L:timelineId;this.purpose=purpose;this.expiresAt=expiresAt;this.status=ConsentStatus.GRANTED;this.grantedAt=LocalDateTime.now();this.createdAt=this.grantedAt;this.updatedAt=this.grantedAt;}
 /** Compatibility constructor retained for existing consent fixtures/integrations. */
 public Consent(Long timelineId,Long patientId,Long grantedToUserId){this(patientId,grantedToUserId,timelineId,"Medical record access",null);}
 @PrePersist protected void onCreate(){LocalDateTime now=LocalDateTime.now();if(grantedAt==null)grantedAt=now;if(createdAt==null)createdAt=now;updatedAt=now;}
 @PreUpdate protected void onUpdate(){updatedAt=LocalDateTime.now();}
 public Long getConsentId(){return consentId;} public Long getPatientId(){return patientId;} public Long getGrantedToUserId(){return grantedToUserId;} public Long getTimelineId(){return timelineId;} public String getPurpose(){return purpose;} public ConsentStatus getStatus(){return status;} public LocalDateTime getGrantedAt(){return grantedAt;} public LocalDateTime getExpiresAt(){return expiresAt;} public LocalDateTime getRevokedAt(){return revokedAt;} public LocalDateTime getCreatedAt(){return createdAt;} public LocalDateTime getUpdatedAt(){return updatedAt;}
 public void revoke(){status=ConsentStatus.REVOKED;activeScopeKey=null;revokedAt=LocalDateTime.now();}
 public boolean isValidAt(LocalDateTime now){return status==ConsentStatus.GRANTED&&(expiresAt==null||expiresAt.isAfter(now));}
 public boolean expireIfNeeded(LocalDateTime now){if(status==ConsentStatus.GRANTED&&expiresAt!=null&&!expiresAt.isAfter(now)){status=ConsentStatus.EXPIRED;activeScopeKey=null;return true;}return false;}
}
