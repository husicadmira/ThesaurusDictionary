
package thesaurus;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.charset.Charset;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import thesaurus.helpers.WordWithSynonims;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class DictionaryControllerTests {

    @Autowired
    private MockMvc mockMvc;

    public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

    @Test
    public void retrieveNonExistingWordFromDictionaryShouldReturnNotFound() throws Exception {

        this.mockMvc.perform(get("/dictionary/{word}", "unknownword")).andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Word is not found in dictionary!"));
    }

    @Test
    public void insertValidDataIntoDictionaryShouldReturnOK() throws Exception {
        String word = "word";
        Set<String> synonims = new HashSet<String>();
        synonims.add("firstSynonim");
        synonims.add("secondSynonim");
        WordWithSynonims wws = new WordWithSynonims(word, synonims);

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
      
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(wws);
        mockMvc.perform(post("/dictionary").contentType(APPLICATION_JSON_UTF8).content(requestJson))
        .andExpect(status().isOk()).andExpect(jsonPath("$.message").value("Word added to dictionary"));
    }

    @Test
    public void insertEmptyWordToDictionaryShouldReturnBadRequest() throws Exception {
        String word = "";
        Set<String> synonims = new HashSet<String>();
        synonims.add("firstSynonim");
        synonims.add("secondSynonim");
        WordWithSynonims wws = new WordWithSynonims(word, synonims);

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
      
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(wws);
        mockMvc.perform(post("/dictionary").contentType(APPLICATION_JSON_UTF8).content(requestJson))
        .andExpect(status().isBadRequest()).andExpect(jsonPath("$.message").value("Word cannot be empty"));
    }
}
