package com.github.miicroo.fbgraphjar.querylanguage;

public interface GrouperFilter<T> {

    boolean accepts(T element);
    Object getIdentifier(T element);
}
