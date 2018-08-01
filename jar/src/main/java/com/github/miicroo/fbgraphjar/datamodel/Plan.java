package com.github.miicroo.fbgraphjar.datamodel;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.time.Instant;

public class Plan {
    private String title;
    private String location;
    @JsonDeserialize(using = PlanDateDeserializer.class)
    private Instant date;

    public Plan() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }
}
