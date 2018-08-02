package com.github.miicroo.fbgraphjar.datamodel;

import com.github.miicroo.fbgraphjar.util.StringUtil;

public class Reaction {
    private String reaction;
    private String actor;

    public Reaction() {
    }

    public String getReaction() {
        return reaction;
    }

    public void setReaction(String reaction) {
        this.reaction = StringUtil.convertLatin1JsonToUtf8(reaction);
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String actor) {
        this.actor = actor;
    }
}
