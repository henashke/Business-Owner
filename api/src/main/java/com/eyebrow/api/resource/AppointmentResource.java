package com.eyebrow.api.resource;

import com.eyebrow.api.dto.AppointmentDTO;
import com.eyebrow.api.service.AppointmentService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Path("/api/appointments")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Slf4j
public class AppointmentResource {

    @Inject
    AppointmentService appointmentService;

    @POST
    public Response createAppointment(AppointmentDTO dto) {
        try {
            AppointmentDTO created = appointmentService.createAppointment(dto);
            return Response.status(Response.Status.CREATED).entity(created).build();
        } catch (Exception e) {
            log.error("Error creating appointment", e);
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @GET
    public Response getAll() {
        List<AppointmentDTO> list = appointmentService.getAllAppointments();
        return Response.ok(list).build();
    }

    @GET
    @Path("/{id}")
    public Response get(@PathParam("id") Long id) {
        try {
            AppointmentDTO dto = appointmentService.getAppointment(id);
            return Response.ok(dto).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/customer/{customerId}")
    public Response getForCustomer(@PathParam("customerId") Long customerId) {
        List<AppointmentDTO> list = appointmentService.getAppointmentsForCustomer(customerId);
        return Response.ok(list).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Long id, AppointmentDTO dto) {
        try {
            AppointmentDTO updated = appointmentService.updateAppointment(id, dto);
            return Response.ok(updated).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        try {
            appointmentService.deleteAppointment(id);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
}

