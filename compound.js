function transformWords(language, isPlural, isOneWord, aspect, wordA, wordB) {
    let vowelsFeminine = ["i", "ü", "e", "ö"];
    let vowelsMasculine = ["ï", "u", "ë", "o"];
    let vowelAOnly = "a";
    let suffixA = "";
    let suffixB = "";

    function feminineSubstitution(word) {
        return word.replace(/ï/g, 'i').replace(/u/g, 'ü').replace(/ë/g, 'e').replace(/o/g, 'ö')
                   .replace(/n/g, 'ņ').replace(/k/g, 'ç').replace(/g/g, 'ģ').replace(/x/g, 'çh').replace(/l/g, 'ļ');
    }

    function masculineSubstitution(word) {
        return word.replace(/i/g, 'ï').replace(/ü/g, 'u').replace(/e/g, 'ë').replace(/ö/g, 'o')
                   .replace(/ņ/g, 'n').replace(/çh/g, 'x').replace(/ç/g, 'k').replace(/ģ/g, 'g').replace(/ļ/g, 'l');
    }

    function appendSuffix(word, suffix) {
        return word + suffix;
    }

    // Apply gender vowel transformation based on wordB vowels
    if (vowelsFeminine.some(v => wordB.includes(v))) {
        wordA = feminineSubstitution(wordA);
        suffixA = isPlural ? "ļöņ" : "ņö";
    } else if (vowelsMasculine.some(v => wordB.includes(v))) {
        wordA = masculineSubstitution(wordA);
        suffixA = isPlural ? "ron" : "no";
    } else if (wordB.includes(vowelAOnly)) {
        suffixA = isPlural ? "ron" : "no";  // For masculine case with 'a'
    }

    // Handle plurals and wordA ending replacements
    if (isPlural) {
        suffixB = "ra";
    }
    if (wordA.endsWith("-am")) {
        if (!isPlural) {
            if (aspect === "imperfect") {
                wordA = wordA.replace("-am", "ca");
            } else if (aspect === "perfect") {
                wordA = wordA.replace("-am", "cta");
            }
        } else {
            if (aspect === "imperfect") {
                wordA = wordA.replace("-am", "cala");
            } else if (aspect === "perfect") {
                wordA = wordA.replace("-am", "calta");
            }
            suffixB = "ra";
        }
    } else if (wordA.endsWith("-ïm") || wordA.endsWith("-im")) {
        if (!isPlural) {
            if (aspect === "imperfect") {
                wordA = wordA.replace(/-ïm$/, "ka").replace(/-im$/, "ça");
            } else if (aspect === "perfect") {
                wordA = wordA.replace(/-ïm$/, "kta").replace(/-im$/, "çta");
            }
        } else {
            if (aspect === "imperfect") {
                wordA = wordA.replace(/-ïm$/, "kala").replace(/-im$/, "çala");
            } else if (aspect === "perfect") {
                wordA = wordA.replace(/-ïm$/, "kalta").replace(/-im$/, "çalta");
            }
            suffixB = "ra";
        }
    }

    // Handle concatenation or spacing between words
    if (isOneWord) {
        wordA = appendSuffix(wordA, suffixA);
        wordB = appendSuffix(wordB, suffixB);
        return wordA + wordB;
    } else {
        wordA = appendSuffix(wordA, suffixA);
        wordB = appendSuffix(wordB, suffixB);
        return wordA + " " + wordB;
    }
}
