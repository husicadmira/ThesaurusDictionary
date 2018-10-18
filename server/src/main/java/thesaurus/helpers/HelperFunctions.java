package thesaurus.helpers;

import java.util.HashMap;

public class HelperFunctions {

    public HashMap<String, String> generateResponseMessage(String message) {
        HashMap<String, String> responseMessage = new HashMap<String, String>();
        responseMessage.put("message", message);
        return responseMessage;
    }
}