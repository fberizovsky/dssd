package com.example.dssd.Controller;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dssd.Utils.ProcessManagement;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
    
    


    @PostMapping
    public ResponseEntity<?> crearPedido() throws UnsupportedEncodingException {
        // Bonita api
        ProcessManagement.login("walter.bates", "bpm");

        String id =ProcessManagement.getProcessId("COMPLETAR"); // COMPLETAR
        System.out.println("id: " + id);


        String caseID = ProcessManagement.initiateProcess(id);
        ProcessManagement.setVariableByCase(caseID, "NOMBRE_VARIABLE", "true", "java.lang.Boolean"); // COMPLETAR
        ProcessManagement.setVariableByCase(caseID, "NOMBRE_VARIABLE", "false", "java.lang.Boolean");  // COMPLETAR


        String taskID = ProcessManagement.searchActivityByCase(caseID);
        String userId = "25"; // Habria q buscar el metodo para encontrar el id del usuario

        
        ProcessManagement.assignTask(taskID, userId); 
        ProcessManagement.completeActivity(taskID);
        return ResponseEntity.ok().build();

        
    }




}