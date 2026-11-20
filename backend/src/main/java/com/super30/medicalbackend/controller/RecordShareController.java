package com.super30.medicalbackend.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.super30.medicalbackend.dto.RecordShareRequest;
import com.super30.medicalbackend.dto.RecordShareResponse;
import com.super30.medicalbackend.security.AuthenticatedUser;
import com.super30.medicalbackend.services.RecordShareService;
import com.super30.medicalbackend.util.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping({"/api/record-shares", "/api/shares"})
public class RecordShareController {

    private final RecordShareService service;

    public RecordShareController(RecordShareService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<RecordShareResponse> request(Principal principal,
                                                    @Valid @RequestBody RecordShareRequest request) {
        return ApiResponse.ok("Share request created",
                service.request(AuthenticatedUser.id(principal), request));
    }

    @GetMapping("/sent")
    public ApiResponse<List<RecordShareResponse>> sent(Principal principal) {
        return ApiResponse.ok("Sent shares retrieved",
                service.mine(AuthenticatedUser.id(principal)));
    }

    @GetMapping("/received")
    public ApiResponse<List<RecordShareResponse>> received(Principal principal) {
        return ApiResponse.ok("Received shares retrieved",
                service.received(AuthenticatedUser.id(principal)));
    }

    @GetMapping("/{shareId}")
    public ApiResponse<RecordShareResponse> get(Principal principal, @PathVariable Long shareId) {
        return ApiResponse.ok("Share retrieved", service.get(AuthenticatedUser.id(principal), shareId));
    }

    @GetMapping("/owner/{ownerId}")
    public ApiResponse<List<RecordShareResponse>> byOwner(Principal principal, @PathVariable Long ownerId) {
        return ApiResponse.ok("Owner shares retrieved",
                service.byOwner(AuthenticatedUser.id(principal), ownerId));
    }

    @GetMapping("/receiver/{receiverId}")
    public ApiResponse<List<RecordShareResponse>> byReceiver(Principal principal,
                                                             @PathVariable Long receiverId) {
        return ApiResponse.ok("Receiver shares retrieved",
                service.byReceiver(AuthenticatedUser.id(principal), receiverId));
    }

    @RequestMapping(value = "/{shareId}/accept", method = {RequestMethod.POST, RequestMethod.PUT})
    public ApiResponse<RecordShareResponse> accept(Principal principal, @PathVariable Long shareId) {
        return ApiResponse.ok("Share accepted", service.accept(AuthenticatedUser.id(principal), shareId));
    }

    @RequestMapping(value = "/{shareId}/reject", method = {RequestMethod.POST, RequestMethod.PUT})
    public ApiResponse<RecordShareResponse> reject(Principal principal, @PathVariable Long shareId) {
        return ApiResponse.ok("Share rejected", service.reject(AuthenticatedUser.id(principal), shareId));
    }

    @RequestMapping(value = "/{shareId}/revoke", method = {RequestMethod.POST, RequestMethod.PUT})
    public ApiResponse<RecordShareResponse> revoke(Principal principal, @PathVariable Long shareId) {
        return ApiResponse.ok("Share revoked", service.revoke(AuthenticatedUser.id(principal), shareId));
    }

    @GetMapping("/access/{timelineId}/{userId}")
    public ApiResponse<Boolean> access(Principal principal, @PathVariable Long timelineId,
                                       @PathVariable Long userId) {
        Long actorId = AuthenticatedUser.id(principal);
        if (!actorId.equals(userId)) {
            throw new com.super30.medicalbackend.exception.UnauthorizedAccessException(
                    "Path user ID must match the authenticated user");
        }
        return ApiResponse.ok("Access check completed", service.canAccess(actorId, timelineId));
    }
}
