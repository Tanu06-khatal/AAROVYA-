
package com.super30.medicalbackend.exception;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.ConstraintViolationException;

import com.super30.medicalbackend.util.ApiResponse;
@RestControllerAdvice
public class GlobalExceptionHandler {
 @ExceptionHandler(ResourceNotFoundException.class) ResponseEntity<ApiResponse<Void>> notFound(ResourceNotFoundException e){return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));}
 @ExceptionHandler(UnauthorizedAccessException.class) ResponseEntity<ApiResponse<Void>> forbidden(UnauthorizedAccessException e){return ResponseEntity.status(403).body(ApiResponse.error(e.getMessage()));}
 @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<ApiResponse<Map<String,String>>> invalid(MethodArgumentNotValidException e){Map<String,String> errors=new LinkedHashMap<>();e.getBindingResult().getFieldErrors().forEach(x->errors.put(x.getField(),x.getDefaultMessage()));return ResponseEntity.badRequest().body(new ApiResponse<>(false,"Validation failed",errors,java.time.Instant.now()));}
 @ExceptionHandler(ConstraintViolationException.class) ResponseEntity<ApiResponse<Void>> constraintViolation(ConstraintViolationException e){return ResponseEntity.badRequest().body(ApiResponse.error("Request parameter validation failed"));}
 @ExceptionHandler(IllegalArgumentException.class) ResponseEntity<ApiResponse<Void>> badRequest(IllegalArgumentException e){return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));}
 @ExceptionHandler({HttpMessageNotReadableException.class,MethodArgumentTypeMismatchException.class}) ResponseEntity<ApiResponse<Void>> malformedRequest(Exception e){return ResponseEntity.badRequest().body(ApiResponse.error("Request contains an invalid value"));}
 @ExceptionHandler(Exception.class) ResponseEntity<ApiResponse<Void>> internal(Exception e){return ResponseEntity.status(500).body(ApiResponse.error("Request could not be completed"));}
}
