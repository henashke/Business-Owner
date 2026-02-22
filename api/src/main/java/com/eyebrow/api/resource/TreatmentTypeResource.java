package com.eyebrow.api.resource;

import com.eyebrow.api.dto.TreatmentTypeDTO;
import com.eyebrow.api.service.TreatmentTypeService;
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

@Path("/api/treatment-types")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Slf4j
public class TreatmentTypeResource {

    @Inject
    TreatmentTypeService treatmentTypeService;

    @POST
    public Response createTreatmentType(TreatmentTypeDTO dto) {
        log.info("POST request to create TreatmentType");
        try {
            TreatmentTypeDTO created = treatmentTypeService.createTreatmentType(dto);
            return Response.status(Response.Status.CREATED).entity(created).build();
        } catch (IllegalArgumentException e) {
            log.warn("Invalid request: {}", e.getMessage());
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(e.getMessage()).build();
        } catch (Exception e) {
            log.error("Error creating TreatmentType", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error creating TreatmentType: " + e.getMessage()).build();
        }
    }

    @GET
    public Response getAllTreatmentTypes() {
        log.info("GET request to retrieve all TreatmentTypes");
        try {
            List<TreatmentTypeDTO> treatmentTypes = treatmentTypeService.getAll();
            return Response.ok(treatmentTypes).build();
        } catch (Exception e) {
            log.error("Error retrieving TreatmentTypes", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving TreatmentTypes: " + e.getMessage()).build();
        }
    }

    @GET
    @Path("/{id}")
    public Response getTreatmentType(@PathParam("id") Long id) {
        log.info("GET request to retrieve TreatmentType with id: {}", id);
        try {
            TreatmentTypeDTO treatmentType = treatmentTypeService.getById(id);
            return Response.ok(treatmentType).build();
        } catch (IllegalArgumentException e) {
            log.warn("TreatmentType not found: {}", e.getMessage());
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(e.getMessage()).build();
        } catch (Exception e) {
            log.error("Error retrieving TreatmentType", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving TreatmentType: " + e.getMessage()).build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateTreatmentType(@PathParam("id") Long id, TreatmentTypeDTO dto) {
        log.info("PUT request to update TreatmentType with id: {}", id);
        try {
            TreatmentTypeDTO updated = treatmentTypeService.updateTreatmentType(id, dto);
            return Response.ok(updated).build();
        } catch (IllegalArgumentException e) {
            log.warn("Invalid request: {}", e.getMessage());
            if (e.getMessage().contains("not found")) {
                return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
            }
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        } catch (Exception e) {
            log.error("Error updating TreatmentType", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error updating TreatmentType: " + e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteTreatmentType(@PathParam("id") Long id) {
        log.info("DELETE request to delete TreatmentType with id: {}", id);
        try {
            treatmentTypeService.deleteTreatmentType(id);
            return Response.noContent().build();
        } catch (IllegalArgumentException e) {
            log.warn("TreatmentType not found: {}", e.getMessage());
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(e.getMessage()).build();
        } catch (IllegalStateException e) {
            log.warn("Conflict deleting TreatmentType: {}", e.getMessage());
            return Response.status(Response.Status.CONFLICT)
                    .entity(e.getMessage()).build();
        } catch (Exception e) {
            log.error("Error deleting TreatmentType", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error deleting TreatmentType: " + e.getMessage()).build();
        }
    }
}
