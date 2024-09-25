package com.example.dssd.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dssd.Model.Colecta;
import com.example.dssd.Service.ColectaService;

@RestController
@RequestMapping("/api/colectas")
public class ColectaController {
    
    @Autowired
    private ColectaService colectaService;

    @PostMapping
    public ResponseEntity<?> crearColecta(@RequestBody Colecta colecta) {
        Colecta colectaAGuardar = colectaService.crearColecta(colecta);
        return ResponseEntity.ok(colectaAGuardar);
    }

    @GetMapping
    public ResponseEntity<?> obtenerColectas() {
        return ResponseEntity.ok(colectaService.obtenerColectas());
    }
}