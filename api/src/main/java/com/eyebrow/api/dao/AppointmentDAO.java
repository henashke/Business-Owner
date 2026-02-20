package com.eyebrow.api.dao;

import com.eyebrow.api.entity.Appointment;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.OffsetDateTime;
import java.util.List;

@ApplicationScoped
public class AppointmentDAO implements PanacheRepository<Appointment> {

    public List<Appointment> findByCustomerId(Long customerId) {
        return find("customer.id", customerId).list();
    }

    public List<Appointment> findBetween(OffsetDateTime start, OffsetDateTime end) {
        return find("startTime >= ?1 and endTime <= ?2", start, end).list();
    }
}

