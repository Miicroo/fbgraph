package com.github.miicroo.fbgraphjar.ql;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Grouper {
  private List<DataElement> objects;

  public Grouper(List<DataElement> objects) {
    this.objects = objects;
  }

  public <T> Map<Object, List<DataElement>> groupBy(T identifier) {
    Map<Object, List<DataElement>> result = new HashMap<>();

    objects.stream()
      .filter(element -> matches(element, identifier))
      .forEach(element -> {
        T groupIdentifier = (T) element.get(identifier);

        List<DataElement> existingElements = result.getOrDefault(groupIdentifier, new ArrayList<>());
        existingElements.add(element);

        result.put(groupIdentifier, existingElements);
      });

    return result;
  }

  private <T> boolean matches(DataElement element, T identifier) {
    return element.containsKey(identifier);
  }
}
