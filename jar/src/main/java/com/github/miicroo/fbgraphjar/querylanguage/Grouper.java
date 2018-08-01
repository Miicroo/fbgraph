package com.github.miicroo.fbgraphjar.querylanguage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Grouper<T> {
  private List<T> objects;

  public Grouper(List<T> objects) {
    this.objects = objects;
  }

  public Map<Object, List<T>> groupBy(GrouperFilter<T> filter) {
    Map<Object, List<T>> result = new HashMap<>();

    objects.stream()
      .filter(filter::accepts)
      .forEach(element -> {
        Object groupIdentifier = filter.getIdentifier(element);

        List<T> existingElements = result.getOrDefault(groupIdentifier, new ArrayList<>());
        existingElements.add(element);

        result.put(groupIdentifier, existingElements);
      });

    return result;
  }
}
