package com.github.miicroo.fbgraphjar.util;

import java.nio.charset.StandardCharsets;

import static java.nio.charset.StandardCharsets.ISO_8859_1;
import static java.nio.charset.StandardCharsets.UTF_8;

public class StringUtil {

    public static String convertLatin1JsonToUtf8(String latin1EncodedString) {
        return new String(latin1EncodedString.getBytes(ISO_8859_1), UTF_8);
    }
}
