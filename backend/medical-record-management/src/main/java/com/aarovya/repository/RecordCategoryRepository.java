package com.aarovya.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.aarovya.entities.RecordCategory;

public interface RecordCategoryRepository
        extends JpaRepository<RecordCategory, Long> {

    Optional<RecordCategory> findByCategoryName(String categoryName);

    List<RecordCategory> findByActiveTrue();

    boolean existsByCategoryName(String categoryName);
}