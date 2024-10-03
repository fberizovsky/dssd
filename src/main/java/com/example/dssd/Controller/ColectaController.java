package com.example.dssd.Controller;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dssd.Model.Colecta;
import com.example.dssd.Service.ColectaService;
import com.example.dssd.Utils.ProcessManagement;

@RestController
@RequestMapping("/api/colectas")
public class ColectaController {
    
    @Autowired
    private ColectaService colectaService;


    @PostMapping
    public ResponseEntity<?> crearColecta(@RequestBody Colecta colecta) throws UnsupportedEncodingException {
        Colecta colectaAGuardar = colectaService.crearColecta(colecta);
        // Bonita api
        ProcessManagement.login("walter.bates", "bpm"); // Revisar si esta bien el usuario y contraseña
        String id =ProcessManagement.getProcessId("recoleccion de materiales"); // Completar con el nombre del proceso, no me acuerdo cual era
        System.out.println("id: " + id);
        String caseID = ProcessManagement.initiateProcess(id);
        ProcessManagement.setVariableByCase(caseID, "formularioCargado", "true", "java.lang.Boolean"); // Pasarle la variable
        String taskID = ProcessManagement.searchActivityByCase(caseID);
        String userId = "25"; // Habria q buscar el metodo para encontrar el id del usuario
        ProcessManagement.assignTask(taskID, userId); 
        ProcessManagement.completeActivity(taskID);
        return ResponseEntity.ok(colectaAGuardar);

        
    }

    @GetMapping
    public ResponseEntity<?> obtenerColectas() {
        return ResponseEntity.ok(colectaService.obtenerColectas());
    }
}