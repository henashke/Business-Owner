package com.eyebrow.api.service;

import com.eyebrow.api.dao.LeadDAO;
import com.eyebrow.api.dao.TreatmentTypeDAO;
import com.eyebrow.api.dto.LeadDTO;
import com.eyebrow.api.entity.Lead;
import com.eyebrow.api.entity.LeadStatus;
import com.eyebrow.api.entity.TreatmentType;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Slf4j
public class LeadService {

    @Inject
    LeadDAO leadDAO;

    @Inject
    TreatmentTypeDAO treatmentTypeDAO;

    @Transactional
    public LeadDTO createLead(LeadDTO dto) {
        log.info("Creating new lead: {}", dto.getName());

        TreatmentType treatmentType = treatmentTypeDAO.findById(dto.getTreatmentTypeId());
        if (treatmentType == null) {
            throw new IllegalArgumentException("TreatmentType not found with id: " + dto.getTreatmentTypeId());
        }

        Lead lead = Lead.builder()
                .name(dto.getName())
                .initialInterestDate(dto.getInitialInterestDate())
                .contactInfo(dto.getContactInfo())
                .treatmentType(treatmentType)
                .status(dto.getStatus() != null ? dto.getStatus() : LeadStatus.COLD)
                .followUpDate(dto.getFollowUpDate())
                .notes(dto.getNotes())
                .build();

        leadDAO.persist(lead);
        return mapToDTO(lead);
    }

    public LeadDTO getLead(Long id) {
        log.info("Fetching lead with id: {}", id);
        Lead lead = leadDAO.findById(id);
        if (lead == null) {
            throw new IllegalArgumentException("Lead not found with id: " + id);
        }
        return mapToDTO(lead);
    }

    public List<LeadDTO> getAllLeads() {
        log.info("Fetching all leads");
        return leadDAO.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<LeadDTO> getLeadsByStatus(LeadStatus status) {
        log.info("Fetching leads by status: {}", status);
        return leadDAO.findByStatus(status).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<LeadDTO> getOverdueLeads() {
        log.info("Fetching overdue leads");
        return leadDAO.findOverdue(LocalDate.now()).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<LeadDTO> getLeadsByFollowUpDateBefore(LocalDate date) {
        log.info("Fetching leads with follow-up date before: {}", date);
        return leadDAO.findOverdue(date).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public LeadDTO updateLead(Long id, LeadDTO dto) {
        log.info("Updating lead with id: {}", id);

        Lead lead = leadDAO.findById(id);
        if (lead == null) {
            throw new IllegalArgumentException("Lead not found with id: " + id);
        }

        TreatmentType treatmentType = treatmentTypeDAO.findById(dto.getTreatmentTypeId());
        if (treatmentType == null) {
            throw new IllegalArgumentException("TreatmentType not found with id: " + dto.getTreatmentTypeId());
        }

        lead.setName(dto.getName());
        lead.setInitialInterestDate(dto.getInitialInterestDate());
        lead.setContactInfo(dto.getContactInfo());
        lead.setTreatmentType(treatmentType);
        lead.setStatus(dto.getStatus());
        lead.setFollowUpDate(dto.getFollowUpDate());
        lead.setNotes(dto.getNotes());

        leadDAO.persist(lead);
        return mapToDTO(lead);
    }

    @Transactional
    public void deleteLead(Long id) {
        log.info("Deleting lead with id: {}", id);

        Lead lead = leadDAO.findById(id);
        if (lead == null) {
            throw new IllegalArgumentException("Lead not found with id: " + id);
        }

        leadDAO.deleteById(id);
    }

    private LeadDTO mapToDTO(Lead lead) {
        return LeadDTO.builder()
                .id(lead.id)
                .name(lead.getName())
                .initialInterestDate(lead.getInitialInterestDate())
                .contactInfo(lead.getContactInfo())
                .treatmentTypeId(lead.getTreatmentType() != null ? lead.getTreatmentType().id : null)
                .treatmentTypeName(lead.getTreatmentType() != null ? lead.getTreatmentType().getName() : null)
                .status(lead.getStatus())
                .followUpDate(lead.getFollowUpDate())
                .notes(lead.getNotes())
                .build();
    }
}
