package com.eyebrow.api.dto;

import com.eyebrow.api.entity.LeadStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeadDTO {

    private Long id;
    private String name;
    private LocalDate initialInterestDate;
    private String contactInfo;
    private Long treatmentTypeId;
    private String treatmentTypeName;
    private LeadStatus status;
    private LocalDate followUpDate;
}
