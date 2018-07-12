package com.github.miicroo.fbgraphjar.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class RestApiController {

  @GetMapping
  public Mono<String> ping() {
    return Mono.just("pong");
  }

  @GetMapping("/users")
  public Flux<String> getUsers() {
    return Flux.just("Kalle", "Adam", "Lisa");
  }
}
