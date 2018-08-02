package com.github.miicroo.fbgraphjar.datamodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.miicroo.fbgraphjar.datamodel.multimedia.*;
import com.github.miicroo.fbgraphjar.util.StringUtil;

import java.time.Instant;

public class Message {
    @JsonProperty("sender_name")
    private String sender;
    @JsonProperty("timestamp_ms")
    private Instant timestamp;
    @JsonProperty("call_duration")
    private long callDuration;
    private String content;
    private String type;

    private Files files;
    private Photos photos;
    private Gifs gifs;
    private Videos videos;
    @JsonProperty("audio_files")
    private AudioFiles audioFiles;
    private Sticker sticker;

    private Share share;
    private Plan plan;
    private Reactions reactions;

    public Message() {
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public long getTimestamp_ms() {
        return timestamp.toEpochMilli();
    }

    public void setTimestamp_ms(long timestamp_ms) {
        this.timestamp = Instant.ofEpochMilli(timestamp_ms);
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = StringUtil.convertLatin1JsonToUtf8(content);
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Files getFiles() {
        return files;
    }

    public void setFiles(Files files) {
        this.files = files;
    }

    public AudioFiles getAudioFiles() {
        return audioFiles;
    }

    public void setAudioFiles(AudioFiles audioFiles) {
        this.audioFiles = audioFiles;
    }

    public Photos getPhotos() {
        return photos;
    }

    public void setPhotos(Photos photos) {
        this.photos = photos;
    }

    public Gifs getGifs() {
        return gifs;
    }

    public void setGifs(Gifs gifs) {
        this.gifs = gifs;
    }

    public Sticker getSticker() {
        return sticker;
    }

    public void setSticker(Sticker sticker) {
        this.sticker = sticker;
    }

    public Share getShare() {
        return share;
    }

    public void setShare(Share share) {
        this.share = share;
    }

    public Reactions getReactions() {
        return reactions;
    }

    public void setReactions(Reactions reactions) {
        this.reactions = reactions;
    }

    public Videos getVideos() {
        return videos;
    }

    public void setVideos(Videos videos) {
        this.videos = videos;
    }

    public long getCallDuration() {
        return callDuration;
    }

    public void setCallDuration(long callDuration) {
        this.callDuration = callDuration;
    }

    public Plan getPlan() {
        return plan;
    }
}
