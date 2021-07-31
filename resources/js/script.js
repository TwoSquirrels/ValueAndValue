/*-
ProjectName: ValueAndValue
FileName: script.js
Encoding: UTF-8
Author: TwoSquirrels
CreationDate: Jul 30, 2021
Copyright: (c) 2021 TwoSquirrels
License:
  name: Apache License, Version 2.0
  url: https://apache.org/licenses/LICENSE-2.0
-*/

let debugMode = false;
let stopping = false;
console.log("何見てんだ。");
console.log("まぁちょうどいい。君にいい事を教えてやろう。");
console.log("まず、'debugMode'という変数をtrueにすればログが出るようになるぞ。ただしなんか重いから注意な。");
console.log("あと、'stopping'をtrueにしてる間はメインループが止まるって事も覚えておくといいぞ。");
console.log("なんでこんな大事な情報を教えたかって？それはな...\n\n\n\n\n\n\n\n");
console.log("お ま え を 生 き て 帰 す 気 が な い か ら だ");
console.log("\n\n\n\n\n\n\n\nなんでもないですやってみたかっただけです");
// は？なにここまで覗いてんだよ...ちょっやめろって...///

// constants
const WORD_BORN_TIME = 500;
const WORD_DIE_TIME = 2000;

// argments

const query = (new Url).query;
const words = query.word ? query.word : [];
const interval = query.interval ? parseInt(query.interval) : 10;
const wordsLifeLimit = query.limit ? parseInt(query.limit) : 32;

// random words

// preparation
const wordElmTemplate = document.createElement("p");
wordElmTemplate.appendChild(document.createTextNode(
  !(words instanceof Array)
    ? words
    : words.length == 1
      ? words[0]
      : "バリュー"
));
wordElmTemplate.classList.add("word");
wordElmTemplate.style.transition = `opacity ${WORD_BORN_TIME / 1000}s 0.0s ease`;

// for all random-words
castArray(document.getElementsByClassName("random-words"))
  .forEach(randomWordsElm => {
    (async () => {
      
      // main loop
      for (let counter = 0; ; ++counter) {
        // start sleeping
        const sleepPrm = sleep(interval);
        // create a word element
        const wordElm = wordElmTemplate.cloneNode(true);
        randomWordsElm.appendChild(wordElm);
        if (words instanceof Array && words.length >= 2) {
          wordElm.innerText = words[Math.floor(words.length * Math.random())];
        }
        wordElm.style.fontSize = `${(randomWordsElm.offsetHeight + randomWordsElm.offsetWidth) * Math.random() / 16}px`;
        wordElm.style.color = `rgb(${Math.floor(Math.random() * 192)}, ${Math.floor(Math.random() * 192)}, ${Math.floor(Math.random() * 192)})`;
        wordHeightPer = 100 * wordElm.clientHeight / randomWordsElm.offsetHeight;
        wordWidthPer = 100 * wordElm.clientWidth / randomWordsElm.offsetWidth;
        wordElm.style.top = `${-wordHeightPer + Math.random() * (wordHeightPer + 100)}%`;
        wordElm.style.left = `${-wordWidthPer + Math.random() * (wordWidthPer + 100)}%`;
        // wait sleeping
        await sleepPrm;
        if (debugMode) new Promise(() => console.log(`${1 + counter}th new Element:\t${wordElm.outerHTML}`));
        // reload elements
        wordElm.style.opacity = "1.0";
        if (counter >= wordsLifeLimit) {
          const dyingWord = randomWordsElm.querySelector(".word:not(.dying)");
          dyingWord.classList.add("dying");
          dyingWord.style.transition = `opacity ${WORD_DIE_TIME / 1000}s 0.0s ease`;
          dyingWord.style.opacity = "0.0";
          sleep(WORD_DIE_TIME).then(() => randomWordsElm.removeChild(randomWordsElm.firstChild));
        }
        // stop
        while (stopping) {
          await sleep(100);
        }
      }
      
    })();
  });
