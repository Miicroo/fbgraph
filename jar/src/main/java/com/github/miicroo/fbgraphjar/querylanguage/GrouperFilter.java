package com.github.miicroo.fbgraphjar.querylanguage;

public interface GrouperFilter {

    boolean accepts(DataElement element);
    Object getIdentifier(DataElement element);
}
