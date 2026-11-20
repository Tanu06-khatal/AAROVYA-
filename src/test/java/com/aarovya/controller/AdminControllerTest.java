package com.aarovya.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import com.aarovya.security.CustomAuthenticationEntryPoint;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import com.aarovya.config.SecurityConfig;
import com.aarovya.security.CustomUserDetailsService;
import com.aarovya.security.JwtService;
import com.aarovya.services.AdminService;

@WebMvcTest(AdminController.class)
@Import({SecurityConfig.class, CustomAuthenticationEntryPoint.class})
class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AdminService adminService;

    @MockBean
    private CustomUserDetailsService userDetailsService;

    @MockBean
    private JwtService jwtService;

    @Test
    @WithMockUser(roles = "ADMIN")
    void adminCanAccessDoctorVerificationEndpoint() throws Exception {

        mockMvc.perform(patch("/api/admin/doctors/1/verify"))
                .andExpect(status().isOk());

        verify(adminService).verifyDoctor(1L);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void adminCanAccessLaboratoryVerificationEndpoint() throws Exception {

        mockMvc.perform(patch("/api/admin/laboratories/1/verify"))
                .andExpect(status().isOk());

        verify(adminService).verifyLaboratory(1L);
    }

    @Test
    @WithMockUser(roles = "PATIENT")
    void patientCannotAccessDoctorVerificationEndpoint() throws Exception {

        mockMvc.perform(patch("/api/admin/doctors/1/verify"))
                .andExpect(status().isForbidden());

        verifyNoInteractions(adminService);
    }

    @Test
    @WithMockUser(roles = "DOCTOR")
    void doctorCannotAccessLaboratoryVerificationEndpoint() throws Exception {

        mockMvc.perform(patch("/api/admin/laboratories/1/verify"))
                .andExpect(status().isForbidden());

        verifyNoInteractions(adminService);
    }

    @Test
    void unauthenticatedUserCannotAccessAdminEndpoint() throws Exception {

        mockMvc.perform(patch("/api/admin/doctors/1/verify"))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminService);
    }
}