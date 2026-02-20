package com.eyebrow.api.resource;

import com.eyebrow.api.dto.CustomerDTO;
import com.eyebrow.api.service.CustomerService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Path("/api/customers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Slf4j
public class CustomerResource {

    @Inject
    CustomerService customerService;

    @POST
    public Response createCustomer(CustomerDTO customerDTO) {
        log.info("POST request to create customer");
        try {
            CustomerDTO created = customerService.createCustomer(customerDTO);
            return Response.status(Response.Status.CREATED).entity(created).build();
        } catch (Exception e) {
            log.error("Error creating customer", e);
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error creating customer: " + e.getMessage()).build();
        }
    }

    @GET
    public Response getAllCustomers() {
        log.info("GET request to retrieve all customers");
        try {
            List<CustomerDTO> customers = customerService.getAllCustomers();
            return Response.ok(customers).build();
        } catch (Exception e) {
            log.error("Error retrieving customers", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving customers: " + e.getMessage()).build();
        }
    }

    @GET
    @Path("/active")
    public Response getActiveCustomers() {
        log.info("GET request to retrieve active customers");
        try {
            List<CustomerDTO> customers = customerService.getActiveCustomers();
            return Response.ok(customers).build();
        } catch (Exception e) {
            log.error("Error retrieving active customers", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving active customers: " + e.getMessage()).build();
        }
    }

    @GET
    @Path("/{id}")
    public Response getCustomer(@PathParam("id") Long id) {
        log.info("GET request to retrieve customer with id: {}", id);
        try {
            CustomerDTO customer = customerService.getCustomer(id);
            return Response.ok(customer).build();
        } catch (IllegalArgumentException e) {
            log.warn("Customer not found: {}", e.getMessage());
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(e.getMessage()).build();
        } catch (Exception e) {
            log.error("Error retrieving customer", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving customer: " + e.getMessage()).build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateCustomer(@PathParam("id") Long id, CustomerDTO customerDTO) {
        log.info("PUT request to update customer with id: {}", id);
        try {
            CustomerDTO updated = customerService.updateCustomer(id, customerDTO);
            return Response.ok(updated).build();
        } catch (IllegalArgumentException e) {
            log.warn("Customer not found: {}", e.getMessage());
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(e.getMessage()).build();
        } catch (Exception e) {
            log.error("Error updating customer", e);
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error updating customer: " + e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteCustomer(@PathParam("id") Long id) {
        log.info("DELETE request to delete customer with id: {}", id);
        try {
            customerService.deleteCustomer(id);
            return Response.noContent().build();
        } catch (IllegalArgumentException e) {
            log.warn("Customer not found: {}", e.getMessage());
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(e.getMessage()).build();
        } catch (Exception e) {
            log.error("Error deleting customer", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error deleting customer: " + e.getMessage()).build();
        }
    }
}

