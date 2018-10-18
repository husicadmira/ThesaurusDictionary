package thesaurus;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class Dictionary {

    private final ConcurrentHashMap<String, Set<String>> dictionary;

    public Dictionary(ConcurrentHashMap<String, Set<String>> map) {
        this.dictionary = map;
    }

    public Dictionary() {
        this.dictionary = new ConcurrentHashMap<>();
    }

    public void addWord(String word, Set<String> synonims) {
        Set<String> existingSynonims = this.dictionary.get(word);

        if (existingSynonims == null) {
            existingSynonims = new HashSet<String>();
        }
        existingSynonims.addAll(synonims);
        this.dictionary.put(word, existingSynonims);
        synonims.forEach((value) -> {
            Set<String> set = this.dictionary.get(value);
            if (set == null) {
                set = new HashSet<String>();
            }
            set.add(word);
            this.dictionary.put(value, set);
        });
    }

    public Set<String> getWord(String word) throws Exception {
        Set<String> synonims = this.dictionary.get(word);
        if (synonims == null) {
            throw new Exception("Word is not found in dictionary!");
        }
        return synonims;
    }

    public ConcurrentHashMap<String, Set<String>> get() {
        return this.dictionary;
    }
}
