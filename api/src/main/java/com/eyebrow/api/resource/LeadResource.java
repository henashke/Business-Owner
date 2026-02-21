package com.eyebrow.api.resource;

import com.eyebrow.api.dto.LeadDTO;
import com.eyebrow.api.entity.LeadStatus;
import com.eyebrow.api.service.LeadService;
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

@Path("/api/leads")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Slf4j
public class LeadResource {

    @Inject
    LeadService leadService;

    @POST
    public Response createLead(LeadDTO dto) {
        log.info("POST request to create lead");
        try {
            LeadDTO created = leadService.createLead(dto);
            return Response.status(Response.Status.CREATED).entity(created).build();
        } catch (Exception e) {
            log.error("Error creating lead", e);
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error creating lead: " + e.getMessage()).build();
        }
    }

    @GET
    public Response getAllLeads() {
        log.info("GET request to retrieve all leads");
        try {
            List<LeadDTO> leads = leadService.getAllLeads();
            return Response.ok(leads).build();
        } catch (Exception e) {
            log.error("Error retrieving leads", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving leads: " + e.getMessage()).build();
        }
    }

    @GET
    @Path("/overdue")
    public Response getOverdueLeads() {
        log.info("GET request to retrieve overdue leads");
        try {
            List<LeadDTO> leads = leadService.getOverdueLeads();
            return Response.ok(leads).build();
        } catch (Exception e) {
            log.error("Error retrieving overdue leads", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving overdue leads: " + e.getMessage()).build();
        }
    }

    @GET
    @Path("/status/{status}")
    public Response getLeadsByStatus(@PathParam("status") LeadStatus status) {
        log.info("GET request to retrieve leads by status: {}", status);
        try {
            List<LeadDTO> leads = leadService.getLeadsByStatus(status);
            return Response.ok(leads).build();
        } catch (Exception e) {
            log.error("Error retrieving leads by status", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving leads by status: " + e.getMessage()).build();
        }
    }

    @GET
    @Path("/{id}")
    public Response getLead(@PathParam("id") Long id) {
        log.info("GET request to retrieve lead with id: {}", id);
        try {
            LeadDTO lead = leadService.getLead(id);
            return Response.ok(lead).build();
        } catch (IllegalArgumentException e) {
            log.warn("Lead not found: {}", e.getMessage());
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(e.getMessage()).build();
        } catch (Exception e) {
            log.error("Error retrieving lead", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving lead: " + e.getMessage()).build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateLead(@PathParam("id") Long id, LeadDTO dto) {
        log.info("PUT request to update lead with id: {}", id);
        try {
            LeadDTO updated = leadService.updateLead(id, dto);
            return Response.ok(updated).build();
        } catch (IllegalArgumentException e) {
            log.warn("Lead not found: {}", e.getMessage());
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(e.getMessage()).build();
        } catch (Exception e) {
            log.error("Error updating lead", e);
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error updating lead: " + e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteLead(@PathParam("id") Long id) {
        log.info("DELETE request to delete lead with id: {}", id);
        try {
            leadService.deleteLead(id);
            return Response.noContent().build();
        } catch (IllegalArgumentException e) {
            log.warn("Lead not found: {}", e.getMessage());
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(e.getMessage()).build();
        } catch (Exception e) {
            log.error("Error deleting lead", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error deleting lead: " + e.getMessage()).build();
        }
    }
}
