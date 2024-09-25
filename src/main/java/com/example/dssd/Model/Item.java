package com.example.dssd.Model;

public class Item {
    private String material;
    private int cantidad;

    public Item(String material, int cantidad) {
        this.material = material;
        this.cantidad = cantidad;
    }

    // Getters y setters
    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }
    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }
}