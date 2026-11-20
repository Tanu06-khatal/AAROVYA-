package com.super30.medicalbackend.entities;

import java.time.LocalDateTime;

import com.super30.medicalbackend.enums.ShareStatus;

import jakarta.persistence.*;

@Entity
@Table(
    name = "record_shares",
    uniqueConstraints = @UniqueConstraint(
        name = "uk_record_share_record_receiver",
        columnNames = {"record_id", "grantee_user_id"}
    )
)
public class RecordShare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "share_id")
    private Long shareId;

    @Column(name = "record_id", nullable = false)
    private Long timelineId;

    @Column(name = "owner_user_id", nullable = false)
    private Long ownerId;

    @Column(name = "grantee_user_id", nullable = false)
    private Long receiverId;

    @Column(name = "purpose", length = 300)
    private String purpose;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 16)
    private ShareStatus status;

    @Column(name = "requested_at", nullable = false)
    private LocalDateTime requestedAt;

    @Column(name = "responded_at")
    private LocalDateTime respondedAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "revoked_at")
    private LocalDateTime revokedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    protected RecordShare() {}

    public RecordShare(Long ownerId, Long receiverId, Long timelineId, String purpose, LocalDateTime expiresAt) {
        this.timelineId = timelineId;
        this.ownerId = ownerId;
        this.receiverId = receiverId;
        this.purpose = purpose != null && !purpose.isBlank() ? purpose.trim() : "Medical record sharing";
        this.expiresAt = expiresAt;
        this.status = ShareStatus.PENDING;
        this.requestedAt = LocalDateTime.now();
        this.createdAt = this.requestedAt;
        this.updatedAt = this.requestedAt;
    }

    public RecordShare(Long ownerId, Long receiverId, Long timelineId, LocalDateTime expiresAt) {
        this(ownerId, receiverId, timelineId, "Medical record sharing", expiresAt);
    }

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        if (requestedAt == null) requestedAt = now;
        if (createdAt == null) createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getShareId() { return shareId; }
    public void setShareId(Long shareId) { this.shareId = shareId; }
    public Long getTimelineId() { return timelineId; }
    public Long getOwnerId() { return ownerId; }
    public Long getReceiverId() { return receiverId; }
    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    public ShareStatus getStatus() { return status; }
    public LocalDateTime getRequestedAt() { return requestedAt; }
    public LocalDateTime getRespondedAt() { return respondedAt; }
    public LocalDateTime getExpiresAt() { return expiresAt; }
    public LocalDateTime getRevokedAt() { return revokedAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void activate() { status = ShareStatus.ACTIVE; }
    public void accept() {
        status = ShareStatus.ACTIVE;
        respondedAt = LocalDateTime.now();
    }
    public void reject() {
        status = ShareStatus.REJECTED;
        respondedAt = LocalDateTime.now();
    }
    public void revoke() {
        status = ShareStatus.REVOKED;
        revokedAt = LocalDateTime.now();
    }
    public boolean isExpired() {
        return expiresAt != null && !expiresAt.isAfter(LocalDateTime.now());
    }
    public void markExpired() {
        status = ShareStatus.EXPIRED;
    }
    public void requestAgain(LocalDateTime newExpiry) {
        status = ShareStatus.PENDING;
        requestedAt = LocalDateTime.now();
        respondedAt = null;
        expiresAt = newExpiry;
        revokedAt = null;
    }
}
