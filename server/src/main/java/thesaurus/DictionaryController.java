package thesaurus;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import thesaurus.helpers.HelperFunctions;
import thesaurus.helpers.WordWithSynonims;
import thesaurus.Dictionary;

@RestController
public class DictionaryController {

    private static final Dictionary dictionary = new Dictionary();
    private static HelperFunctions helper = new HelperFunctions();

    @RequestMapping(value = "/dictionary/{word}", method = RequestMethod.GET)
    public ResponseEntity<Object> getSynonim(@PathVariable String word) {
        try {
            return ResponseEntity.ok(new WordWithSynonims(word, dictionary.getWord(word)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(helper.generateResponseMessage(e.getMessage()));
        }
    }

    @RequestMapping(value = "/dictionary", method = RequestMethod.POST)
    public ResponseEntity<Object> postSynonim(@RequestBody WordWithSynonims wordWithSynonims) {
        try {
            if (wordWithSynonims.getWord().isEmpty()) {
                throw new Exception("Word cannot be empty");
            }
            dictionary.addWord(wordWithSynonims.getWord(), wordWithSynonims.getSynonims());
            return ResponseEntity.ok(helper.generateResponseMessage("Word added to dictionary"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(helper.generateResponseMessage(e.getMessage()));
        }
    }
}
