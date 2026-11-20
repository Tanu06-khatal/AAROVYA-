
package com.super30.medicalbackend.entities;
import java.time.LocalDateTime;

import com.super30.medicalbackend.enums.AuditAction;

import jakarta.persistence.*;
/** Stores metadata only. Callers must never include clinical content in description. */
@Entity @Table(name="audit_logs")
public class AuditLog {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long auditId;
 @Column(name="actor_user_id",nullable=false) private Long userId;
 @Enumerated(EnumType.STRING) @Column(nullable=false,length=32) private AuditAction action;
 @Column(length=64) private String entityType;
 @Column(name="entity_id") private Long entityId;
 @Column(nullable=false,length=240) private String description;
 @Column(name="ip_address",length=45) private String ipAddress;
 @Column(name="occurred_at",nullable=false,updatable=false) private LocalDateTime timestamp;
 protected AuditLog() {}
 public AuditLog(Long userId,AuditAction action,String entityType,Long entityId,String description,String ipAddress){this.userId=userId;this.action=action;this.entityType=entityType;this.entityId=entityId;this.description=description;this.ipAddress=ipAddress;this.timestamp=LocalDateTime.now();}
 /** Compatibility constructor retained for internal callers using the previous audit contract. */
 public AuditLog(Long userId,AuditAction action,String description){this(userId,action,"APPLICATION",null,description,null);}
 @PrePersist protected void onCreate(){if(timestamp==null)timestamp=LocalDateTime.now();}
 public Long getAuditId(){return auditId;} public Long getUserId(){return userId;} public Long getActorUserId(){return userId;} public AuditAction getAction(){return action;} public String getEntityType(){return entityType;} public Long getEntityId(){return entityId;} public String getDescription(){return description;} public String getIpAddress(){return ipAddress;} public LocalDateTime getTimestamp(){return timestamp;} public LocalDateTime getOccurredAt(){return timestamp;}
}
