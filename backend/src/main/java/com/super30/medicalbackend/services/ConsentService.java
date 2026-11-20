
package com.super30.medicalbackend.services;
import java.util.List;

import com.super30.medicalbackend.dto.ConsentRequest;
import com.super30.medicalbackend.dto.ConsentResponse;
public interface ConsentService {
    ConsentResponse grant(Long actorId, ConsentRequest request);
    ConsentResponse get(Long actorId, Long consentId);
    List<ConsentResponse> byPatient(Long actorId, Long patientId);
    List<ConsentResponse> byRecipient(Long actorId, Long userId);
    ConsentResponse revoke(Long actorId, Long consentId);
    boolean hasValidConsent(Long patientId, Long userId, Long timelineId);

    /** Compatibility methods retained for existing callers. */
    default ConsentResponse grant(Long actorId, Long timelineId, Long granteeId) {
        return grant(actorId, new ConsentRequest(granteeId, timelineId, "Medical record access", null));
    }
    ConsentResponse revoke(Long actorId, Long timelineId, Long granteeId);
    List<ConsentResponse> forRecord(Long actorId, Long timelineId);
}
