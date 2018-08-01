package com.github.miicroo.fbgraphjar.querylanguage;

import com.github.miicroo.fbgraphjar.querylanguage.DataElement.Tuple;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Random;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;

public class GrouperTest {

  private List<DataElement> objects;

  @Before
  public void setUp() {
    DataElement element1 = new DataElement(asList(Tuple.of("name", "Kalle"), Tuple.of("age", 190)));
    DataElement element2 = new DataElement(asList(Tuple.of("name", "Kalle"), Tuple.of("greeting", "hej"), Tuple.of("bye", "Bye!")));
    DataElement element3 = new DataElement(asList(Tuple.of("name", "Lisa"), Tuple.of("address", "127.0.0.1")));
    DataElement element4 = new DataElement(asList(Tuple.of("name", "Kalle"), Tuple.of("favouriteThings", asList(1,2,3,4))));
    DataElement element5 = new DataElement(asList(Tuple.of("name", "Laban"), Tuple.of("age", (new Random()))));
    DataElement element6 = new DataElement(asList(Tuple.of("naem", "Laban"), Tuple.of("ohNo", "Laban has no name!")));
    DataElement element7 = new DataElement(asList(Tuple.of(1, "This is new"), Tuple.of((new Date()), "An object as a key :0")));

    objects = asList(element1, element2, element3, element4, element5, element6, element7);
  }

  @Test
  public void groupByExistingIdentifier() {
    Grouper<DataElement> testee = new Grouper<>(objects);
    Map<Object, List<DataElement>> group = testee.groupBy(new GrouperFilter<DataElement>() {
      @Override
      public boolean accepts(DataElement element) {
        return element.containsKey("name");
      }

      @Override
      public Object getIdentifier(DataElement element) {
        return element.get("name");
      }
    });

    assertEquals(group.keySet().size(), 3);

    assertEquals(group.get("Kalle").size(), 3);
    assertEquals(group.get("Lisa").size(), 1);
    assertEquals(group.get("Laban").size(), 1);
  }

  @Test
  public void groupByExistingNumberIdentifier() {
    Grouper<DataElement> testee = new Grouper<>(objects);
    Map<Object, List<DataElement>> group = testee.groupBy(new GrouperFilter<DataElement>() {
      @Override
      public boolean accepts(DataElement element) {
        return element.containsKey(1);
      }

      @Override
      public Object getIdentifier(DataElement element) {
        return element.get(1);
      }
    });

    assertEquals(group.keySet().size(), 1);
    assertEquals(group.get("This is new").size(), 1);
  }

  @Test
  public void groupByNonExistingIdentifier() {
    Grouper<DataElement> testee = new Grouper<>(objects);
    Map<Object, List<DataElement>> group = testee.groupBy(new GrouperFilter<DataElement>() {
      @Override
      public boolean accepts(DataElement element) {
        return element.containsKey("THIS_DOES_NOT_EXIST");
      }

      @Override
      public Object getIdentifier(DataElement element) {
        return element.get("THIS_DOES_NOT_EXIST");
      }
    });

    assertEquals(group.keySet().size(), 0);
  }

  @Test
  public void groupByNull() {
    Grouper<DataElement> testee = new Grouper<>(objects);
    Map<Object, List<DataElement>> group = testee.groupBy(new GrouperFilter<DataElement>() {
      @Override
      public boolean accepts(DataElement element) {
        return element.containsKey(null);
      }

      @Override
      public Object getIdentifier(DataElement element) {
        return element.get(null);
      }
    });

    assertEquals(group.keySet().size(), 0);
  }
}
