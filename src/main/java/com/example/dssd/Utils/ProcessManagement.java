package com.example.dssd.Utils;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.*;
import org.springframework.stereotype.Component;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Component
public class ProcessManagement {
    private static final String BASE_URL = "http://localhost:21329/bonita/"; // TODO: Cambiar URL, no se cual es
    private static String sessionCookie;
    private static String sessionCookie2;

    
    public static boolean login(String username, String password) {
        try {
            URL url = new URL(BASE_URL + "loginservice");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            // Establecer el encabezado Content-Type
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            String postData = "username=" + username + "&password=" + password + "&redirect=false";

            // Enviar los datos
            try (OutputStream os = conn.getOutputStream()) {
                os.write(postData.getBytes());
                os.flush(); // Asegúrate de hacer flush para enviar todos los datos
            }

            // Obtener el código de respuesta
            int responseCode = conn.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_NO_CONTENT) { // 204: No Content
            	// Obtener todas las cookies
                Map<String, List<String>> headerFields = conn.getHeaderFields();
                List<String> cookies = headerFields.get("Set-Cookie");

                if (cookies != null) {
                    // Guardar todas las cookies
                    for (String cookie : cookies) {
                        // Aquí puedes almacenar cookies específicas o procesarlas
                        if (cookie.startsWith("JSESSIONID")) { // Ejemplo de cómo filtrar
                            sessionCookie = cookie.split(";")[0]; // Solo guarda la parte de la cookie
                            //sessionCookie = sessionCookie.split("=")[1];
                        }
                        if (cookie.startsWith("X-Bonita-API-Token")) { // Ejemplo de cómo filtrar
                            sessionCookie2 = cookie.split(";")[0]; // Solo guarda la parte de la cookie
                            //sessionCookie2= sessionCookie2.split("=")[1];
                        }
                    }
                    System.out.println("COOKIE DE SESIÓN api bonita: " + sessionCookie);
                    return true; // Login exitoso
                }
            } else {
                System.out.println("Error en la respuesta: " + responseCode);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }


    private static String doRequest(String method, String endpoint, String postData) {
        try {
            URL url = new URL(BASE_URL + endpoint);
            System.out.println("URL:"+url);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod(method);
            String cookieHeader = sessionCookie;
            if (sessionCookie2 != null) {
                cookieHeader += "; " + sessionCookie2;
            }
            conn.setRequestProperty("Cookie", cookieHeader);
            String sessionCookie3 = sessionCookie2;
            sessionCookie3 = sessionCookie3.split("=")[1];
            System.out.println("COOKIE DE SESIÓN bonita: " + sessionCookie3);
            conn.setRequestProperty("X-Bonita-API-Token",sessionCookie3);

            if ("POST".equals(method) && postData != null) {
                conn.setDoOutput(true);
                try (OutputStream os = conn.getOutputStream()) {
                    os.write(postData.getBytes());
                }
            }else{ if ("PUT".equals(method) && postData != null) {
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setDoOutput(true);
                try (OutputStream os = conn.getOutputStream()) {
                    os.write(postData.getBytes());
                }
            }
            }

            StringBuilder response = new StringBuilder();
            try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
                String line;
                while ((line = br.readLine()) != null) {
                    response.append(line);
                }
            }

            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String getAllProcess() {
        return doRequest("GET", "API/bpm/process?p=0&c=1000", null);
    }

    // public static String getProcessName(String id) {
    //     String response = doRequest("GET", "API/bpm/process/" + id, null);
    //     // Parsear JSON y devolver el nombre
    //     return "";
    // }

    public static String getProcessId(String name) throws UnsupportedEncodingException {
        String encodedName = URLEncoder.encode(name, StandardCharsets.UTF_8.toString());
        String response = doRequest("GET", "API/bpm/process?f=name=" + encodedName + "&p=0&c=1&d=activationState=ENABLED", null);

        JsonArray jsonArray = JsonParser.parseString(response).getAsJsonArray();

        if (jsonArray.size() > 0) {
            JsonObject process = jsonArray.get(0).getAsJsonObject();
            return process.get("id").getAsString();
        }

        throw new RuntimeException("No process found with name: " + name);
    }

    // public static int getCountProcess() {
    //     String response = doRequest("GET", "API/bpm/process?p=0&c=1000", null);
    //     System.out.println("RESPUESTA:"+ response);
    //     return 0;
    // }

    public static String initiateProcess(String id) {
        String response =doRequest("POST", "API/bpm/process/" + id + "/instantiation", null);
        JsonObject jsonObject = JsonParser.parseString(response).getAsJsonObject();
        return jsonObject.get("caseId").getAsString();
    }

    public static String setVariable(String caseId, String variable, String value, String type) {
        String postData = String.format("{\"value\": \"%s\", \"type\": \"%s\"}",value, type);
        System.out.println("POSTDATA:" + postData);
        return doRequest("PUT", "API/bpm/caseVariable/" + caseId + "/" + variable, postData);
    }

    public static String setVariableByCase(String caseId, String variable, String value, String type) {
        return setVariable(caseId, variable, value, type);
    }

    public static void assignTask(String taskId, String userId) {
        doRequest("PUT", "API/bpm/userTask/" + taskId, String.format("{\"assigned_id\": \"%s\"}", userId));
    }

    public static String searchActivityByCase(String caseId) {
        String response =doRequest("GET", "API/bpm/task?f=caseId=" + caseId, null);
        JsonArray jsonArray = JsonParser.parseString(response).getAsJsonArray();
        if (jsonArray.size() > 0) {
            JsonObject process = jsonArray.get(0).getAsJsonObject();
            return process.get("id").getAsString();
        }

        throw new RuntimeException("No process found with caseID: " + caseId);
    }

    public static String completeActivity(String taskId) {
        return doRequest("POST", "API/bpm/userTask/" + taskId + "/execution", null);
    }

    // public static String getVariable(String taskId, String variable) {
    //     String response = doRequest("GET", "API/bpm/caseVariable/" + taskId, null);
    //     // Parsear JSON y devolver la variable
    //     return "";
    // }

    // public static String getVariableByCase(String caseId, String variable) {
    //     return getVariable(caseId, variable);
    // }
}