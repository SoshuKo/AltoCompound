document.addEventListener("DOMContentLoaded", function () {
  const wordAInput = document.getElementById("wordA");
  const wordBInput = document.getElementById("wordB");
  const languageSelect = document.getElementById("language");
  const patternSelect = document.getElementById("pattern");
  const aspectSelect = document.getElementById("aspect");
  const pluralCheckbox = document.getElementById("plural");
  const singleWordCheckbox = document.getElementById("singleWord");
  const resultDisplay = document.getElementById("result");

  // 母音の置換ルール
  const femaleVowelsTorska = { "ï": "i", "u": "ü", "ë": "e", "o": "ö", "n": "ņ", "k": "ç", "g": "ģ", "x": "çh", "l": "ļ" };
  const maleVowelsTorska = { "i": "ï", "ü": "u", "e": "ë", "ö": "o", "ņ": "n", "çh": "x", "ç": "k", "ģ": "g", "ļ": "l" };
  const femaleVowelsDurg = { "ï": "i", "u": "ü", "ë": "e", "o": "ö" };
  const maleVowelsDurg = { "i": "ï", "ü": "u", "e": "ë", "ö": "o" };

  // 母音変換を行う関数
  function applyVowelSubstitution(word, wordB, language) {
    const femaleVowels = language === "torska" ? femaleVowelsTorska : femaleVowelsDurg;
    const maleVowels = language === "torska" ? maleVowelsTorska : maleVowelsDurg;

    const hasFemaleVowels = /[iüeo]/.test(wordB);
    const hasMaleVowels = /[ïuëo]/.test(wordB);

    if (hasFemaleVowels) {
      word = word.replace(/[ïuëonkgxl]/g, char => femaleVowels[char] || char);
    } else if (hasMaleVowels) {
      word = word.replace(/[iüeöņçhçģļ]/g, char => maleVowels[char] || char);
    }

    return word;
  }

  // 名詞+名詞の処理
  function handleNounNounCombination(wordA, wordB, isPlural, isSingleWord, language) {
    wordA = applyVowelSubstitution(wordA, wordB, language);

    if (isPlural) {
      if (/[iüeo]/.test(wordB)) {
        wordA += language === "torska" ? "ļöņ" : "’ün";
        wordB += language === "torska" ? "ra" : "’i";
      } else if (/[ïuëo]/.test(wordB)) {
        wordA += language === "torska" ? "ron" : "’un";
        wordB += language === "torska" ? "ra" : "’u";
      }
    } else {
      if (/[iüeo]/.test(wordB)) {
        wordA += language === "torska" ? "ņö" : "nü";
      } else if (/[ïuëo]/.test(wordB)) {
        wordA += language === "torska" ? "no" : "nu";
      }
    }

    return isSingleWord ? wordA + wordB : wordA + " " + wordB;
  }

  // 形容詞/自動詞分詞+名詞の処理
  function handleAdjectiveVerbCombination(wordA, wordB, isPlural, isSingleWord, language, aspect) {
    const wordBHasFemaleVowels = /[iüeo]/.test(wordB);
    const wordBHasMaleVowels = /[ïuëo]/.test(wordB);

    // 未完了相と完了相の処理
    if (aspect === "imperfective") {
      wordA = wordA.replace(/am$/, language === "torska" ? "ca" : wordBHasFemaleVowels ? "du" : "gu");
    } else if (aspect === "perfective") {
      wordA = wordA.replace(/am$/, language === "torska" ? "cta" : wordBHasFemaleVowels ? "dru" : "gru");
    }

    // 複数形の処理
    if (isPlural) {
      wordA = wordA.replace(/ca$/, "cala").replace(/cta$/, "calta");
      wordB += "ra";
    }

    return isSingleWord ? wordA + wordB : wordA + " " + wordB;
  }

  // 他動詞分詞+名詞の処理
  function handleTransitiveVerbCombination(wordA, wordB, isPlural, isSingleWord, language, aspect) {
    const wordBHasFemaleVowels = /[iüeo]/.test(wordB);
    const wordBHasMaleVowels = /[ïuëo]/.test(wordB);

    // 未完了相と完了相の処理
    if (aspect === "imperfective") {
      wordA = wordA.replace(/ïm$/, language === "torska" ? "ka" : wordBHasFemaleVowels ? "ça" : "ka");
    } else if (aspect === "perfective") {
      wordA = wordA.replace(/ïm$/, language === "torska" ? "kta" : wordBHasFemaleVowels ? "çta" : "kta");
    }

    // 複数形の処理
    if (isPlural) {
      wordA = wordA.replace(/ka$/, "kala").replace(/kta$/, "kalta");
      wordB += "ra";
    }

    return isSingleWord ? wordA + wordB : wordA + " " + wordB;
  }

  // ボタンクリック時の処理
  document.getElementById("generateButton").addEventListener("click", function () {
    const wordA = wordAInput.value.trim();
    const wordB = wordBInput.value.trim();
    const language = languageSelect.value;
    const pattern = patternSelect.value;
    const aspect = aspectSelect.value;
    const isPlural = pluralCheckbox.checked;
    const isSingleWord = singleWordCheckbox.checked;

    let result = "";

    if (pattern === "noun+noun") {
      result = handleNounNounCombination(wordA, wordB, isPlural, isSingleWord, language);
    } else if (pattern === "adj/intransitive+part+noun") {
      result = handleAdjectiveVerbCombination(wordA, wordB, isPlural, isSingleWord, language, aspect);
    } else if (pattern === "transitive+part+noun") {
      result = handleTransitiveVerbCombination(wordA, wordB, isPlural, isSingleWord, language, aspect);
    }

    resultDisplay.textContent = result;
  });
});
