package com.example.dssd.Model;

import java.util.ArrayList;
import java.util.List;

public class Colecta {
    private Long id;
    private List<Item> items;

    public Colecta(Long id) {
        this.id = id;
        this.items = new ArrayList<>();
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public List<Item> getItems() { return items; }
    public void setItems(List<Item> items) { this.items = items; }

    // Método para agregar un item a la colecta
    public void addItem(Item item) {
        items.add(item);
    }
}