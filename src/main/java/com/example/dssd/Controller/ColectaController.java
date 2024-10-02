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
import com.example.dssd.Utils.ProcessManagement;

@RestController
@RequestMapping("/api/colectas")
public class ColectaController {
    
    @Autowired
    private ColectaService colectaService;


    @PostMapping
    public ResponseEntity<?> crearColecta(@RequestBody Colecta colecta) {
        Colecta colectaAGuardar = colectaService.crearColecta(colecta);
        // Bonita api
        ProcessManagement.login("walter.bates", "bpm"); // Revisar si esta bien el usuario y contraseña
        String id =ProcessManagement.getProcessId(""); // Completar con el nombre del proceso, no me acuerdo cual era
        String caseID = ProcessManagement.initiateProcess(id);
        ProcessManagement.setVariableByCase(caseID, "envioFormulario", "1", "java.lang.Integer"); // Pasarle la variable
        String taskID = ProcessManagement.searchActivityByCase(caseID);
        String userId = "1"; // H
        ProcessManagement.assignTask(taskID, userId); // Habria q buscar el metodo para encontrar el id del usuario
        ProcessManagement.completeActivity(taskID);
        return ResponseEntity.ok(colectaAGuardar);

        
    }

    @GetMapping
    public ResponseEntity<?> obtenerColectas() {
        return ResponseEntity.ok(colectaService.obtenerColectas());
    }
}