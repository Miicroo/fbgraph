package com.github.miicroo.fbgraphjar.datamodel;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Chat {
    private Messages messages;
    private String title;

    private String[] participants;
    @JsonProperty("is_still_participant")
    private boolean stillParticipant;

    private String status;

    @JsonProperty("thread_type")
    private String threadType;
    @JsonProperty("thread_path")
    private String threadPath;

    public Chat() {
    }

    public Messages getMessages() {
        return messages;
    }

    public void setMessages(Messages messages) {
        this.messages = messages;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isStillParticipant() {
        return stillParticipant;
    }

    public void setStillParticipant(boolean stillParticipant) {
        this.stillParticipant = stillParticipant;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getThreadType() {
        return threadType;
    }

    public void setThreadType(String threadType) {
        this.threadType = threadType;
    }

    public String[] getParticipants() {
        return participants;
    }

    public void setParticipants(String[] participants) {
        this.participants = participants;
    }

    public String getThreadPath() {
        return threadPath;
    }

    public void setThreadPath(String threadPath) {
        this.threadPath = threadPath;
    }
}
