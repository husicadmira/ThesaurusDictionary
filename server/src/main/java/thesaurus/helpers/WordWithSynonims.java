package thesaurus.helpers;

import java.util.Set;

public class WordWithSynonims {
    private String word;
    private Set<String> synonims;

    public WordWithSynonims(String word, Set<String> synonims) {
        this.word = word;
        this.synonims = synonims;
    }

	public String getWord() {
		return this.word;
    }
    public Set<String> getSynonims() {
		return this.synonims;
	}
}