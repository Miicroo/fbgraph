package com.github.miicroo.fbgraphjar.datamodel;


import com.fasterxml.jackson.annotation.JsonProperty;

public class Share {
    private String link;
    @JsonProperty("share_text")
    private String text;

    public Share() {
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
