package com.github.miicroo.fbgraphjar.querylanguage;

import java.util.HashMap;
import java.util.List;

public class DataElement extends HashMap<Object, Object> {

  public DataElement(List<Tuple> dataMappings) {
    dataMappings.forEach(t -> put(t.getIdentifier(), t.getData()));
  }

  static class Tuple {
    private Object identifier;
    private Object data;

    private Tuple(Object identifier, Object data) {
      this.identifier = identifier;
      this.data = data;
    }

    private Object getIdentifier() {
      return identifier;
    }

    private Object getData() {
      return data;
    }

    public static Tuple of(Object identifier, Object data) {
      return new Tuple(identifier, data);
    }
  }
}
