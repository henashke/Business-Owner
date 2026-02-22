package com.eyebrow.api.dao;

import com.eyebrow.api.entity.Lead;
import com.eyebrow.api.entity.LeadStatus;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
@Slf4j
public class LeadDAO implements PanacheRepository<Lead> {

    public List<Lead> findByStatus(LeadStatus status) {
        return find("status", status).list();
    }

    public List<Lead> findOverdue(LocalDate date) {
        return find("followUpDate < ?1 and followUpDate is not null", date).list();
    }
}
