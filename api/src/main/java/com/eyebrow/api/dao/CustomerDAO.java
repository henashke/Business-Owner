package com.eyebrow.api.dao;

import com.eyebrow.api.entity.Customer;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@ApplicationScoped
@Slf4j
public class CustomerDAO implements PanacheRepository<Customer> {

    public List<Customer> findActive() {
        return find("active", true).list();
    }
}
