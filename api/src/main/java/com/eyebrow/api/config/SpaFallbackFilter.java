package com.eyebrow.api.config;

import java.io.InputStream;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/")
public class SpaFallbackFilter {

    @GET
    @Path("{path:.*}")
    @Produces(MediaType.TEXT_HTML)
    public Response spa(@PathParam("path") String path) {
        if (path.startsWith("api/")
                || path.startsWith("q/")
                || path.contains(".")
                || path.isBlank()) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        InputStream index = Thread.currentThread()
                .getContextClassLoader()
                .getResourceAsStream("META-INF/resources/index.html");

        if (index == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("index.html not found in META-INF/resources")
                    .build();
        }

        return Response.ok(index).type(MediaType.TEXT_HTML).build();
    }
}