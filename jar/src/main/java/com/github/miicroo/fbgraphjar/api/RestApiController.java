package com.github.miicroo.fbgraphjar.api;

import com.github.miicroo.fbgraphjar.datamodel.Chat;
import com.github.miicroo.fbgraphjar.datamodel.Message;
import com.github.miicroo.fbgraphjar.querylanguage.Grouper;
import com.github.miicroo.fbgraphjar.querylanguage.GrouperFilter;
import com.github.miicroo.fbgraphjar.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RestApiController {

    private final ChatService chatService;

    @Autowired
    public RestApiController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping
    public Mono<String> ping() {
        return Mono.just("pong");
    }

    @GetMapping("/chats")
    public Flux<String> getChats() {
        return Flux.fromStream(chatService.getAllChats().stream());
    }

    @GetMapping("/chat/{title}")
    public Flux<Chat> getChatByTitle(@PathVariable String title) {
        return Flux.just(chatService.getChatByTitle(title));
    }

    @GetMapping("/chat/{title}/count")
    public Flux<Map<Object, Integer>> getChatCountByTitle(@PathVariable String title) {
        Chat chat = chatService.getChatByTitle(title);
        Grouper<Message> messageGrouper = new Grouper<>(chat.getMessages());
        Map<Object, List<Message>> groupResult = messageGrouper.groupBy(new GrouperFilter<Message>() {
            @Override
            public boolean accepts(Message element) {
                return element.getSender() != null;
            }

            @Override
            public Object getIdentifier(Message element) {
                return element.getSender();
            }
        });

        Map<Object, Integer> result = new HashMap<>();
        groupResult.forEach((k,v) -> result.put(k, v.size()));
        return Flux.just(result);
    }
}
