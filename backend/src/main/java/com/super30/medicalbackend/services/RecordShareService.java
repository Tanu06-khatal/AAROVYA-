
package com.super30.medicalbackend.services;

import java.util.List;
import com.super30.medicalbackend.dto.RecordShareRequest;
import com.super30.medicalbackend.dto.RecordShareResponse;

public interface RecordShareService {
    RecordShareResponse request(Long ownerId, RecordShareRequest request);
    RecordShareResponse get(Long actorId, Long shareId);
    List<RecordShareResponse> byOwner(Long actorId, Long ownerId);
    List<RecordShareResponse> byReceiver(Long actorId, Long receiverId);
    RecordShareResponse accept(Long actorId, Long shareId);
    RecordShareResponse reject(Long actorId, Long shareId);
    RecordShareResponse revoke(Long actorId, Long shareId);
    boolean canAccess(Long actorId, Long timelineId);
    /** Compatibility aliases used by the existing timeline module. */
    List<RecordShareResponse> mine(Long actorId);
    List<RecordShareResponse> received(Long actorId);
}
