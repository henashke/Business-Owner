package com.eyebrow.api.service;

import com.eyebrow.api.dao.AppointmentDAO;
import com.eyebrow.api.dao.CustomerDAO;
import com.eyebrow.api.dao.TreatmentTypeDAO;
import com.eyebrow.api.dto.AppointmentDTO;
import com.eyebrow.api.entity.Appointment;
import com.eyebrow.api.entity.Customer;
import com.eyebrow.api.entity.TreatmentType;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Slf4j
public class AppointmentService {

    @Inject
    AppointmentDAO appointmentDAO;

    @Inject
    CustomerDAO customerDAO;

    @Inject
    TreatmentTypeDAO treatmentTypeDAO;

    @Transactional
    public AppointmentDTO createAppointment(AppointmentDTO dto) {
        log.info("Creating appointment for customer {}", dto.getCustomerId());
        Customer customer = customerDAO.findById(dto.getCustomerId());
        if (customer == null) {
            throw new IllegalArgumentException("Customer not found: " + dto.getCustomerId());
        }

        TreatmentType treatmentType = treatmentTypeDAO.findById(dto.getTreatmentTypeId());
        if (treatmentType == null) {
            throw new IllegalArgumentException("TreatmentType not found: " + dto.getTreatmentTypeId());
        }

        Appointment appointment = Appointment.builder()
                .customer(customer)
                .treatmentType(treatmentType)
                .startTime(dto.getStartTime())
                .endTime(dto.getStartTime().plusMinutes(treatmentType.getDurationMinutes()))
                .notes(dto.getNotes())
                .build();

        appointmentDAO.persist(appointment);
        return mapToDTO(appointment);
    }

    public AppointmentDTO getAppointment(Long id) {
        Appointment a = appointmentDAO.findById(id);
        if (a == null) throw new IllegalArgumentException("Appointment not found: " + id);
        return mapToDTO(a);
    }

    public List<AppointmentDTO> getAllAppointments() {
        return appointmentDAO.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public List<AppointmentDTO> getAppointmentsForCustomer(Long customerId) {
        return appointmentDAO.findByCustomerId(customerId).stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Transactional
    public AppointmentDTO updateAppointment(Long id, AppointmentDTO dto) {
        Appointment a = appointmentDAO.findById(id);
        if (a == null) throw new IllegalArgumentException("Appointment not found: " + id);
        
        TreatmentType treatmentType = treatmentTypeDAO.findById(dto.getTreatmentTypeId());
        if (treatmentType == null) {
            throw new IllegalArgumentException("TreatmentType not found: " + dto.getTreatmentTypeId());
        }
        
        a.setTreatmentType(treatmentType);
        a.setStartTime(dto.getStartTime());
        a.setEndTime(dto.getStartTime().plusMinutes(treatmentType.getDurationMinutes()));
        a.setNotes(dto.getNotes());
        appointmentDAO.persist(a);
        return mapToDTO(a);
    }

    @Transactional
    public void deleteAppointment(Long id) {
        appointmentDAO.deleteById(id);
    }

    private AppointmentDTO mapToDTO(Appointment a) {
        return AppointmentDTO.builder()
                .id(a.id)
                .customerId(a.getCustomer() != null ? a.getCustomer().id : null)
                .treatmentTypeId(a.getTreatmentType() != null ? a.getTreatmentType().id : null)
                .treatmentTypeName(a.getTreatmentType() != null ? a.getTreatmentType().getName() : null)
                .treatmentPrice(a.getTreatmentType() != null ? a.getTreatmentType().getPrice() : null)
                .treatmentDurationMinutes(a.getTreatmentType() != null ? a.getTreatmentType().getDurationMinutes() : null)
                .startTime(a.getStartTime())
                .endTime(a.getEndTime())
                .notes(a.getNotes())
                .build();
    }
}

