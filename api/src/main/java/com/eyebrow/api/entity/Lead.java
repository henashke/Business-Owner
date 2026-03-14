package com.eyebrow.api.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;

import java.time.LocalDate;

@Entity
@Table(
        name = "leads",
        indexes = {
                @Index(name = "idx_leads_status", columnList = "status"),
                @Index(name = "idx_leads_follow_up_date", columnList = "follow_up_date")
        }
)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString(callSuper = true)
public class Lead extends PanacheEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "initial_interest_date", nullable = false)
    private LocalDate initialInterestDate;

    @Column(name = "contact_info", nullable = false)
    private String contactInfo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "treatment_type_id")
    private TreatmentType treatmentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private LeadStatus status;

    @Column(name = "follow_up_date")
    private LocalDate followUpDate;

    @Column(name = "notes", columnDefinition = "text")
    private String notes;
}
