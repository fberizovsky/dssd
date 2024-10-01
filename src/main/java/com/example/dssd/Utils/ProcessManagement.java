import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.Map;
import java.util.HashMap;

public class ProcessManagement {
    private static final String BASE_URL = "http://localhost:8080/bonita/"; // TODO: Cambiar URL, no se cual es
    private static String sessionCookie;

    public static boolean login(String username, String password) {
        try {
            URL url = new URL(BASE_URL + "loginservice");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            String postData = "username=" + username + "&password=" + password + "&redirect=false";
            try (OutputStream os = conn.getOutputStream()) {
                os.write(postData.getBytes());
            }

            int responseCode = conn.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                String cookieHeader = conn.getHeaderField("Set-Cookie");
                if (cookieHeader != null) {
                    sessionCookie = cookieHeader.split(";")[0];
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    private static String doRequest(String method, String endpoint, String postData) {
        try {
            URL url = new URL(BASE_URL + endpoint);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod(method);
            conn.setRequestProperty("Cookie", sessionCookie);

            if ("POST".equals(method) && postData != null) {
                conn.setDoOutput(true);
                try (OutputStream os = conn.getOutputStream()) {
                    os.write(postData.getBytes());
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

    public static String getProcessName(String id) {
        String response = doRequest("GET", "API/bpm/process/" + id, null);
        // Parsear JSON y devolver el nombre
        return "";
    }

    public static String getProcessId(String name) {
        String response = doRequest("GET", "API/bpm/process?f=name=" + name + "&p=0&c=1&d=activationState=ENABLED", null);
        // Parsear JSON y devolver el ID
        return "";
    }

    public static int getCountProcess() {
        String response = doRequest("GET", "API/bpm/process?p=0&c=1000", null);
        // Parsear JSON y devolver cantidad
        return 0;
    }

    public static String initiateProcess(String id) {
        return doRequest("POST", "API/bpm/process/" + id + "/instantiation", null);
    }

    public static String setVariable(String caseId, String variable, String value, String type) {
        String postData = String.format("{\"%s\": {\"value\": \"%s\", \"type\": \"%s\"}}", variable, value, type);
        return doRequest("PUT", "API/bpm/caseVariable/" + caseId + "/" + variable, postData);
    }

    public static String setVariableByCase(String caseId, String variable, String value, String type) {
        return setVariable(caseId, variable, value, type);
    }

    public static String assignTask(String taskId, String userId) {
        return doRequest("PUT", "API/bpm/userTask/" + taskId, String.format("{\"assigned_id\": \"%s\"}", userId));
    }

    public static String searchActivityByCase(String caseId) {
        return doRequest("GET", "API/bpm/task?f=caseId=" + caseId, null);
    }

    public static String completeActivity(String taskId) {
        return doRequest("POST", "API/bpm/userTask/" + taskId + "/execution", null);
    }

    public static String getVariable(String taskId, String variable) {
        String response = doRequest("GET", "API/bpm/caseVariable/" + taskId, null);
        // Parsear JSON y devolver la variable
        return "";
    }

    public static String getVariableByCase(String caseId, String variable) {
        return getVariable(caseId, variable);
    }
}