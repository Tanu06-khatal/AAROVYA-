package com.super30.medicalbackend.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.super30.medicalbackend.dto.ConsentRequest;
import com.super30.medicalbackend.dto.ConsentResponse;
import com.super30.medicalbackend.exception.UnauthorizedAccessException;
import com.super30.medicalbackend.security.AuthenticatedUser;
import com.super30.medicalbackend.services.ConsentService;
import com.super30.medicalbackend.util.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/consents")
public class ConsentController {

    private final ConsentService service;

    public ConsentController(ConsentService service) {
        this.service = service;
    }

    @GetMapping
    public ApiResponse<List<ConsentResponse>> list(Principal principal) {
        Long actorId = AuthenticatedUser.id(principal);
        return ApiResponse.ok("Consents retrieved", service.byPatient(actorId, actorId));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ConsentResponse> grant(Principal principal,
                                              @Valid @RequestBody ConsentRequest request) {
        return ApiResponse.ok("Consent granted",
                service.grant(AuthenticatedUser.id(principal), request));
    }

    @GetMapping("/{consentId}")
    public ApiResponse<ConsentResponse> get(Principal principal, @PathVariable Long consentId) {
        return ApiResponse.ok("Consent retrieved", service.get(AuthenticatedUser.id(principal), consentId));
    }

    @GetMapping("/patient/{patientId}")
    public ApiResponse<List<ConsentResponse>> byPatient(Principal principal, @PathVariable Long patientId) {
        return ApiResponse.ok("Patient consents retrieved",
                service.byPatient(AuthenticatedUser.id(principal), patientId));
    }

    @GetMapping("/recipient/{userId}")
    public ApiResponse<List<ConsentResponse>> byRecipient(Principal principal, @PathVariable Long userId) {
        return ApiResponse.ok("Recipient consents retrieved",
                service.byRecipient(AuthenticatedUser.id(principal), userId));
    }

    @RequestMapping(value = "/{consentId}/revoke", method = {RequestMethod.POST, RequestMethod.PUT})
    public ApiResponse<ConsentResponse> revoke(Principal principal, @PathVariable Long consentId) {
        return ApiResponse.ok("Consent revoked",
                service.revoke(AuthenticatedUser.id(principal), consentId));
    }

    @GetMapping("/check")
    public ApiResponse<Boolean> check(Principal principal,
                                      @RequestParam Long patientId,
                                      @RequestParam Long userId,
                                      @RequestParam(required = false) Long timelineId) {
        Long actorId = AuthenticatedUser.id(principal);
        if (!actorId.equals(patientId) && !actorId.equals(userId)) {
            throw new UnauthorizedAccessException("Only the patient or recipient may check this consent");
        }
        return ApiResponse.ok("Consent check completed",
                service.hasValidConsent(patientId, userId, timelineId));
    }
}
