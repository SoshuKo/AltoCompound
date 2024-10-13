function generateCompound() {
    let wordA = document.getElementById('wordA').value;
    let wordB = document.getElementById('wordB').value;
    let language = document.getElementById('language').value;
    let aspect = document.getElementById('aspect').value;
    let plural = document.getElementById('plural').checked;
    let singleWord = document.getElementById('singleWord').checked;

    let result = "";

    // トルスカ語の場合
    if (language === 'torsk') {
        if (hasVowels(wordB, 'iüöe')) {
            wordA = applyReplacementRules(wordA, femaleReplaceTorsk);
            wordA += plural ? 'ļöņ' : 'ņö';
            wordB += plural ? 'ra' : '';  // 単語Bの複数形語尾に「ra」を追加
        } else if (hasVowels(wordB, 'ïuëo')) {
            wordA = applyReplacementRules(wordA, maleReplaceTorsk);
            wordA += plural ? 'ron' : 'no';
            wordB += plural ? 'ra' : '';  // 単語Bの複数形語尾に「ra」を追加
        } else if (wordB.includes('a')) {
            wordA += plural ? 'ron' : 'no';
            wordB += plural ? 'ra' : '';  // 単語Bの複数形語尾に「ra」を追加
        }

        if (wordA.endsWith('am')) {
            if (plural) {
                wordA = wordA.slice(0, -2) + (aspect === 'imperfective' ? 'cala' : 'calta');
            } else {
                wordA = wordA.slice(0, -2) + (aspect === 'imperfective' ? 'ca' : 'cta');
            }
        }

        if (singleWord) {
            result = wordA + wordB;
        } else {
            result = wordA + " " + wordB;
        }
    }

    // ドゥルグ語の場合（既存コード）
    if (language === 'durg') {
        if (hasVowels(wordB, 'iüöe')) {
            wordA = applyReplacementRules(wordA, femaleReplaceDurg);
            wordA += plural ? '’ün' : 'nü';
            wordB += plural ? '’i' : '';
        } else if (hasVowels(wordB, 'ïuëo')) {
            wordA = applyReplacementRules(wordA, maleReplaceDurg);
            wordA += plural ? '’un' : 'nu';
            wordB += plural ? '’u' : '';
        } else if (wordB.includes('a')) {
            wordA += plural ? '’un' : 'nu';
        }

        if (wordA.endsWith('um') || wordA.endsWith('üm')) {
            if (plural) {
                wordA = wordA.slice(0, -2) + (aspect === 'imperfective' ? (wordA.endsWith('üm') ? 'dülü' : 'dulu') : (wordA.endsWith('üm') ? 'düllü' : 'dullu'));
            } else {
                wordA = wordA.slice(0, -2) + (aspect === 'imperfective' ? (wordA.endsWith('üm') ? 'dü' : 'du') : (wordA.endsWith('üm') ? 'drü' : 'dru'));
            }
        }

        if (singleWord) {
            result = wordA + wordB;
        } else {
            result = wordA + " " + wordB;
        }
    }

    document.getElementById('result').innerText = result;
}
