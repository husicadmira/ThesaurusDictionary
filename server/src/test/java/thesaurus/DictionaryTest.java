package thesaurus;

import static org.junit.Assert.assertEquals;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DictionaryTest {

    @Test
    public void addWordIndictionary() {
        Dictionary d = new Dictionary();
        Set<String> synonims = new HashSet<String>();
        synonims.add("firstSynonim");
        synonims.add("secondSynonim");
        d.addWord("word", synonims);
        Set<String> s1 = new HashSet<String>(synonims);
        Set<String> s2 = new HashSet<String>();
        s2.add("word");
        ConcurrentHashMap<String, Set<String>> map = d.get();
        assertEquals(map.get("word"), s1);
        assertEquals(map.get("firstSynonim"), s2);
        assertEquals(map.get("secondSynonim"), s2);
    }

    @Test
    public void getWordFromDictionary() throws Exception {
        ConcurrentHashMap<String, Set<String>> map = new ConcurrentHashMap<String, Set<String>>();

        Set<String> synonims = new HashSet<String>();
        synonims.add("firstSynonim");
        synonims.add("secondSynonim");
        Set<String> s1 = new HashSet<String>(synonims);
        Set<String> s2 = new HashSet<String>();
        s2.add("word");
        map.put("word", s1);
        map.put("firstSynonim", s2);
        map.put("secondSynonim", s2);

        Dictionary d = new Dictionary(map);
        assertEquals(d.getWord("word"), s1);
        assertEquals(d.getWord("firstSynonim"), s2);
    }
}