package com.aarovya.config;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import com.aarovya.dao.RoleDao;
import com.aarovya.dao.UserDao;
import com.aarovya.entities.Role;
import com.aarovya.entities.User;

@Configuration
public class RoleDataInitializer {

    private static final Logger logger =
            LoggerFactory.getLogger(RoleDataInitializer.class);

    @Bean
    public CommandLineRunner initializeRolesAndAdmin(
            RoleDao roleDao,
            UserDao userDao,
            PasswordEncoder passwordEncoder,
            Environment environment,
            PlatformTransactionManager transactionManager) {

        TransactionTemplate transactionTemplate =
                new TransactionTemplate(transactionManager);

        return args -> transactionTemplate.executeWithoutResult(status -> {

            // Create default roles
            List<String> defaultRoles = List.of(
                    "PATIENT",
                    "DOCTOR",
                    "LABORATORY",
                    "ADMIN"
            );

            for (String roleName : defaultRoles) {

                if (!roleDao.existsByRoleName(roleName)) {

                    Role newRole = new Role();
                    newRole.setRoleName(roleName);

                    roleDao.save(newRole);

                    logger.info("Default role created: {}", roleName);
                }
            }

            // Read initial ADMIN details from environment variables
            String adminName =
                    environment.getProperty("AAROVYA_ADMIN_FULL_NAME");

            String adminEmail =
                    environment.getProperty("AAROVYA_ADMIN_EMAIL");

            String adminMobile =
                    environment.getProperty("AAROVYA_ADMIN_MOBILE");

            String adminPassword =
                    environment.getProperty("AAROVYA_ADMIN_PASSWORD");

            boolean allMissing =
                    isBlank(adminName)
                    && isBlank(adminEmail)
                    && isBlank(adminMobile)
                    && isBlank(adminPassword);

            if (allMissing) {
                logger.warn(
                        "Initial ADMIN not created. "
                        + "ADMIN environment variables are not configured.");
                return;
            }

            boolean anyMissing =
                    isBlank(adminName)
                    || isBlank(adminEmail)
                    || isBlank(adminMobile)
                    || isBlank(adminPassword);

            if (anyMissing) {
                throw new IllegalStateException(
                        "All four AAROVYA_ADMIN environment variables "
                        + "must be configured to create the initial ADMIN.");
            }

            // Check if ADMIN email already exists
            var existingAdmin = userDao.findByEmail(adminEmail);

            if (existingAdmin.isPresent()) {

                boolean alreadyAdmin = existingAdmin.get()
                        .getRoles()
                        .stream()
                        .anyMatch(role ->
                                "ADMIN".equals(role.getRoleName()));

                if (!alreadyAdmin) {
                    throw new IllegalStateException(
                            "Configured ADMIN email already belongs "
                            + "to a non-ADMIN account.");
                }

                logger.info("Initial ADMIN account already exists.");
                return;
            }

            // Find ADMIN role
            Role adminRole = roleDao
                    .findByRoleName("ADMIN")
                    .orElseThrow(() -> new IllegalStateException(
                            "ADMIN role was not initialized."));

            // Create initial ADMIN account
            User admin = new User();

            admin.setFullName(adminName);
            admin.setEmail(adminEmail);
            admin.setMobileNumber(adminMobile);

            admin.setPassword(
                    passwordEncoder.encode(adminPassword));

            admin.setRoles(
                    new HashSet<>(Set.of(adminRole)));

            admin.setEnabled(true);

            userDao.save(admin);

            logger.info("Initial ADMIN account created successfully.");
        });
    }

    private static boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}