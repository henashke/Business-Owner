package com.eyebrow.api.config;

import io.vertx.ext.web.Router;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;

@ApplicationScoped
public class SpaFallbackFilter {

    public void init(@Observes Router router) {
        // Register a final catch-all route (any HTTP method) and make sure it's the last handler
        router.get().last().handler(rc -> {
            String path = rc.request().path();
            // If the path is not an API endpoint and does not appear to be a static file request (no dot)
            // reroute it to the index page to allow React Router to handle it
            if (!path.contains("/api/") && !path.contains(".")) {
                rc.reroute("/");
            } else {
                rc.next();
            }
        });
    }
}
