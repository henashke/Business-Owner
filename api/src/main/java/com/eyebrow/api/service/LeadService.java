package com.eyebrow.api.service;

import com.eyebrow.api.dao.LeadDAO;
import com.eyebrow.api.dto.LeadDTO;
import com.eyebrow.api.entity.Lead;
import com.eyebrow.api.entity.LeadStatus;
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

    @Transactional
    public LeadDTO createLead(LeadDTO dto) {
        log.info("Creating new lead: {}", dto.getName());

        Lead lead = Lead.builder()
                .name(dto.getName())
                .initialInterestDate(dto.getInitialInterestDate())
                .contactInfo(dto.getContactInfo())
                .treatmentType(dto.getTreatmentType())
                .status(dto.getStatus() != null ? dto.getStatus() : LeadStatus.COLD)
                .followUpDate(dto.getFollowUpDate())
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

        lead.setName(dto.getName());
        lead.setInitialInterestDate(dto.getInitialInterestDate());
        lead.setContactInfo(dto.getContactInfo());
        lead.setTreatmentType(dto.getTreatmentType());
        lead.setStatus(dto.getStatus());
        lead.setFollowUpDate(dto.getFollowUpDate());

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
                .treatmentType(lead.getTreatmentType())
                .status(lead.getStatus())
                .followUpDate(lead.getFollowUpDate())
                .build();
    }
}
