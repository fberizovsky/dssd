package com.example.dssd.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne // Relación muchos a uno con Colecta
    @JsonIgnore
    private Colecta colecta;

    @Column(nullable = false) // Nombre del item
    private String nombre;

    @Column(nullable = false) // Cantidad del item
    private int cantidad;

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Colecta getColecta() { return colecta; }
    public void setColecta(Colecta colecta) { this.colecta = colecta; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }

    // Otros métodos según sea necesario
}
