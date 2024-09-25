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
    private ColectaRepository colectaRepositoryRepository;


    @Transactional
    public Colecta crearColecta(Colecta colecta) {
        return colectaRepositoryRepository.save(colecta);

    }

    public List<Colecta> obtenerColectas() {
        return colectaRepositoryRepository.findAll();
    }

    public Colecta obtenerColecta(Long id) {
        return colectaRepositoryRepository.findById(id).orElse(null);
    }


        


    
    
}