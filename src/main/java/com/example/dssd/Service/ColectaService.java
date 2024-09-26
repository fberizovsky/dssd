package com.example.dssd.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dssd.Model.Colecta;
import com.example.dssd.Repository.ColectaRepository;

import jakarta.transaction.Transactional;

@Service
public class ColectaService {

    @Autowired
    private ColectaRepository colectaRepository;


    @Transactional
    public Colecta crearColecta(Colecta colecta) {
        colecta.getItems().forEach(item -> item.setColecta(colecta));
        return colectaRepository.save(colecta);

    }

    public List<Colecta> obtenerColectas() {
        return colectaRepository.findAll();
    }

    public Colecta obtenerColecta(Long id) {
        return colectaRepository.findById(id).orElse(null);
    }


        


    
    
}