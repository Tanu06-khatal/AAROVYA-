
package com.aarovya.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aarovya.entities.RecordCategory;
import com.aarovya.repository.RecordCategoryRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/record-categories")
@RequiredArgsConstructor
public class RecordCategoryController {

    private final RecordCategoryRepository categoryRepository;

    @GetMapping
    public List<RecordCategory> getActiveCategories() {
        return categoryRepository.findByActiveTrue();
    }
}
