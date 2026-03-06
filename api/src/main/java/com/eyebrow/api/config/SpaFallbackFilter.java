package com.eyebrow.api.config;

import io.vertx.ext.web.Router;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;

@ApplicationScoped
public class SpaFallbackFilter {

    public void init(@Observes Router router) {
        router.get("/*").last().handler(rc -> {
            String path = rc.normalizedPath();
            // If the path is not an API endpoint and does not appear to be a static file request (no dot)
            // reroute it to the index page to allow React Router to handle it
            if (!path.startsWith("/api") && !path.contains(".")) {
                rc.reroute("/");
            } else {
                rc.next();
            }
        });
    }
}
