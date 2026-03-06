package com.eyebrow.api.dao;

import com.eyebrow.api.entity.TreatmentType;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.extern.slf4j.Slf4j;

@ApplicationScoped
@Slf4j
public class TreatmentTypeDAO implements PanacheRepository<TreatmentType> {

    public TreatmentType findByName(String name) {
        return find("name", name).firstResult();
    }

    public boolean existsByName(String name) {
        return find("name", name).count() > 0;
    }
}
