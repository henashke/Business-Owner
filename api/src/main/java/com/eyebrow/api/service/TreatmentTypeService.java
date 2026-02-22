package com.eyebrow.api.service;

import com.eyebrow.api.dao.AppointmentDAO;
import com.eyebrow.api.dao.LeadDAO;
import com.eyebrow.api.dao.TreatmentTypeDAO;
import com.eyebrow.api.dto.TreatmentTypeDTO;
import com.eyebrow.api.entity.TreatmentType;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Slf4j
public class TreatmentTypeService {

    @Inject
    TreatmentTypeDAO treatmentTypeDAO;

    @Inject
    AppointmentDAO appointmentDAO;

    @Inject
    LeadDAO leadDAO;

    @Transactional
    public TreatmentTypeDTO createTreatmentType(TreatmentTypeDTO dto) {
        log.info("Creating new TreatmentType: {}", dto.getName());

        if (treatmentTypeDAO.existsByName(dto.getName())) {
            throw new IllegalArgumentException("TreatmentType already exists with name: " + dto.getName());
        }

        TreatmentType treatmentType = TreatmentType.builder()
                .name(dto.getName())
                .price(dto.getPrice())
                .durationMinutes(dto.getDurationMinutes())
                .build();

        treatmentTypeDAO.persist(treatmentType);
        return mapToDTO(treatmentType);
    }

    public TreatmentTypeDTO getById(Long id) {
        log.info("Fetching TreatmentType with id: {}", id);
        TreatmentType treatmentType = treatmentTypeDAO.findById(id);
        if (treatmentType == null) {
            throw new IllegalArgumentException("TreatmentType not found with id: " + id);
        }
        return mapToDTO(treatmentType);
    }

    public List<TreatmentTypeDTO> getAll() {
        log.info("Fetching all TreatmentTypes");
        return treatmentTypeDAO.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public TreatmentTypeDTO updateTreatmentType(Long id, TreatmentTypeDTO dto) {
        log.info("Updating TreatmentType with id: {}", id);

        TreatmentType treatmentType = treatmentTypeDAO.findById(id);
        if (treatmentType == null) {
            throw new IllegalArgumentException("TreatmentType not found with id: " + id);
        }

        if (!treatmentType.getName().equals(dto.getName()) && treatmentTypeDAO.existsByName(dto.getName())) {
            throw new IllegalArgumentException("Another TreatmentType already exists with name: " + dto.getName());
        }

        treatmentType.setName(dto.getName());
        treatmentType.setPrice(dto.getPrice());
        treatmentType.setDurationMinutes(dto.getDurationMinutes());

        treatmentTypeDAO.persist(treatmentType);
        return mapToDTO(treatmentType);
    }

    @Transactional
    public void deleteTreatmentType(Long id) {
        log.info("Deleting TreatmentType with id: {}", id);

        TreatmentType treatmentType = treatmentTypeDAO.findById(id);
        if (treatmentType == null) {
            throw new IllegalArgumentException("TreatmentType not found with id: " + id);
        }

        // Prevent deletion if referenced by Appointment or Lead
        long appointmentCount = appointmentDAO.count("treatmentType.id", id);
        if (appointmentCount > 0) {
            throw new IllegalStateException("Cannot delete TreatmentType because it is referenced by one or more appointments.");
        }

        long leadCount = leadDAO.count("treatmentType.id", id);
        if (leadCount > 0) {
            throw new IllegalStateException("Cannot delete TreatmentType because it is referenced by one or more leads.");
        }

        treatmentTypeDAO.deleteById(id);
    }

    private TreatmentTypeDTO mapToDTO(TreatmentType treatmentType) {
        return TreatmentTypeDTO.builder()
                .id(treatmentType.id)
                .name(treatmentType.getName())
                .price(treatmentType.getPrice())
                .durationMinutes(treatmentType.getDurationMinutes())
                .build();
    }
}
