package com.github.miicroo.fbgraphjar.files;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Component
public class FileRetriever {

    private static final String DATA_FILENAME_PATTERN = "message.json";

    public Stream<Path> getDataFilePaths(String directoryToSearchIn) {
        Path parentDirectory = Paths.get(directoryToSearchIn);
        return filesInDir(parentDirectory)
                .filter(path -> path.endsWith(DATA_FILENAME_PATTERN));
    }

    private static Stream<Path> filesInDir(Path dir) {
        return listFiles(dir)
                .flatMap(path ->
                        path.toFile().isDirectory() ?
                                filesInDir(path) :
                                Stream.of(path));
    }

    private static Stream<Path> listFiles(Path dir) {
        try {
            return Files.list(dir);
        } catch (IOException e) {
            return Stream.empty();
        }
    }
}
