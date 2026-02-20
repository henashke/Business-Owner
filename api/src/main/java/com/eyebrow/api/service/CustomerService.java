package com.eyebrow.api.service;

import com.eyebrow.api.dao.CustomerDAO;
import com.eyebrow.api.dto.CustomerDTO;
import com.eyebrow.api.entity.Customer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Slf4j
public class CustomerService {

    @Inject
    CustomerDAO customerDAO;

    @Transactional
    public CustomerDTO createCustomer(CustomerDTO dto) {
        log.info("Creating new customer: {}", dto.getFirstName());

        Customer customer = Customer.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phoneNumber(dto.getPhoneNumber())
                .notes(dto.getNotes())
                .active(true)
                .build();

        customerDAO.persist(customer);
        return mapToDTO(customer);
    }

    public CustomerDTO getCustomer(Long id) {
        log.info("Fetching customer with id: {}", id);
        Customer customer = customerDAO.findById(id);
        if (customer == null) {
            throw new IllegalArgumentException("Customer not found with id: " + id);
        }
        return mapToDTO(customer);
    }

    public List<CustomerDTO> getAllCustomers() {
        log.info("Fetching all customers");
        return customerDAO.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<CustomerDTO> getActiveCustomers() {
        log.info("Fetching active customers");
        return customerDAO.findActive()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public CustomerDTO updateCustomer(Long id, CustomerDTO dto) {
        log.info("Updating customer with id: {}", id);

        Customer customer = customerDAO.findById(id);
        if (customer == null) {
            throw new IllegalArgumentException("Customer not found with id: " + id);
        }

        customer.setFirstName(dto.getFirstName());
        customer.setLastName(dto.getLastName());
        customer.setEmail(dto.getEmail());
        customer.setPhoneNumber(dto.getPhoneNumber());
        customer.setNotes(dto.getNotes());
        customer.setActive(dto.isActive());

        customerDAO.persist(customer);
        return mapToDTO(customer);
    }

    @Transactional
    public void deleteCustomer(Long id) {
        log.info("Deleting customer with id: {}", id);

        Customer customer = customerDAO.findById(id);
        if (customer == null) {
            throw new IllegalArgumentException("Customer not found with id: " + id);
        }

        customerDAO.deleteById(id);
    }

    private CustomerDTO mapToDTO(Customer customer) {
        return CustomerDTO.builder()
                .id(customer.id)
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .email(customer.getEmail())
                .phoneNumber(customer.getPhoneNumber())
                .notes(customer.getNotes())
                .active(customer.isActive())
                .build();
    }
}
