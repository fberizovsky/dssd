package com.example.dssd.Model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Colecta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "colecta", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Item> items;

    public Colecta(Long id) {
        this.id = id;
        this.items = new ArrayList<>();
    }

    public Colecta() {
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
        item.setColecta(this); // Esto establece la relación bidireccional
    }
}