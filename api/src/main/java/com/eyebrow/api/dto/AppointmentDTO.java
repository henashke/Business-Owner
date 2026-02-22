package com.eyebrow.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentDTO {
    private Long id;
    private Long customerId;
    private OffsetDateTime startTime;
    private OffsetDateTime endTime;
    private Long treatmentTypeId;
    private String treatmentTypeName;
    private BigDecimal treatmentPrice;
    private Integer treatmentDurationMinutes;
    private String notes;
}

