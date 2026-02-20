package com.eyebrow.api.service;

import com.eyebrow.api.dao.AppointmentDAO;
import com.eyebrow.api.dao.CustomerDAO;
import com.eyebrow.api.dto.AppointmentDTO;
import com.eyebrow.api.entity.Appointment;
import com.eyebrow.api.entity.Customer;
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

    @Transactional
    public AppointmentDTO createAppointment(AppointmentDTO dto) {
        log.info("Creating appointment for customer {}", dto.getCustomerId());
        Customer customer = customerDAO.findById(dto.getCustomerId());
        if (customer == null) {
            throw new IllegalArgumentException("Customer not found: " + dto.getCustomerId());
        }

        Appointment appointment = Appointment.builder()
                .customer(customer)
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .title(dto.getTitle())
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
        a.setStartTime(dto.getStartTime());
        a.setEndTime(dto.getEndTime());
        a.setTitle(dto.getTitle());
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
                .startTime(a.getStartTime())
                .endTime(a.getEndTime())
                .title(a.getTitle())
                .notes(a.getNotes())
                .build();
    }
}

