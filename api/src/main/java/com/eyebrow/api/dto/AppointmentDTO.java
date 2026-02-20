package com.eyebrow.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentDTO {
    private Long id;
    private Long customerId;
    private OffsetDateTime startTime;
    private OffsetDateTime endTime;
    private String title;
    private String notes;
}

