// トルスカ語の女性母音の置換規則
const femaleReplaceTorsk = { 'ï': 'i', 'u': 'ü', 'ë': 'e', 'o': 'ö', 'n': 'ņ', 'k': 'ç', 'g': 'ģ', 'x': 'çh', 'l': 'ļ' };
// トルスカ語の男性母音の置換規則
const maleReplaceTorsk = { 'i': 'ï', 'ü': 'u', 'e': 'ë', 'ö': 'o', 'ņ': 'n', 'çh': 'x', 'ç': 'k', 'ģ': 'g', 'ļ': 'l' };

// ドゥルグ語の女性母音の置換規則
const femaleReplaceDurg = { 'ï': 'i', 'u': 'ü', 'ë': 'e', 'o': 'ö' };
// ドゥルグ語の男性母音の置換規則
const maleReplaceDurg = { 'i': 'ï', 'ü': 'u', 'e': 'ë', 'ö': 'o' };

// 母音チェック
function hasVowels(word, vowels) {
    return [...word].some(char => vowels.includes(char));
}

// 母音変換
function applyReplacementRules(word, replacements) {
    return word.split('').map(char => replacements[char] || char).join('');
}

// 複合名詞生成関数
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
        } else if (hasVowels(wordB, 'ïuëo')) {
            wordA = applyReplacementRules(wordA, maleReplaceTorsk);
            wordA += plural ? 'ron' : 'no';
        } else if (wordB.includes('a')) {
            wordA += plural ? 'ron' : 'no';
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

    // ドゥルグ語の場合
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
