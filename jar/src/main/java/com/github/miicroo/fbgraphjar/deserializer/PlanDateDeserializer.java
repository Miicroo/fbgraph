package com.github.miicroo.fbgraphjar.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.time.Instant;
import java.util.Calendar;

public class PlanDateDeserializer extends JsonDeserializer<Instant> {

    public PlanDateDeserializer() {
    }

    @Override
    public Instant deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
        JsonNode node = jp.getCodec().readTree(jp);
        int year = node.get("year").numberValue().intValue();
        int month = node.get("month").numberValue().intValue();
        int day = node.get("day").numberValue().intValue();
        int hour = node.get("hour").numberValue().intValue();
        int minute = node.get("minute").numberValue().intValue();
        int second = node.get("second").numberValue().intValue();

        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, month);
        calendar.set(Calendar.DAY_OF_MONTH, day);
        calendar.set(Calendar.HOUR_OF_DAY, hour);
        calendar.set(Calendar.MINUTE, minute);
        calendar.set(Calendar.SECOND, second);

        return calendar.toInstant();
    }
}
