package com.github.miicroo.fbgraphjar.querylanguage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Grouper {
  private List<DataElement> objects;

  public Grouper(List<DataElement> objects) {
    this.objects = objects;
  }

  public <T> Map<Object, List<DataElement>> groupBy(GrouperFilter filter) {
    Map<Object, List<DataElement>> result = new HashMap<>();

    objects.stream()
      .filter(filter::accepts)
      .forEach(element -> {
        Object groupIdentifier = filter.getIdentifier(element);

        List<DataElement> existingElements = result.getOrDefault(groupIdentifier, new ArrayList<>());
        existingElements.add(element);

        result.put(groupIdentifier, existingElements);
      });

    return result;
  }
}
