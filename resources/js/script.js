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

// constants
const WORD_BORN_TIME = 500;
const WORD_DIE_TIME = 2000;

// argments

// default values
let word = "バリュー";
let interval = 10;
let wordsLifeLimit = 32;

// random words

// preparation
const wordElmTemplate = document.createElement("p");
wordElmTemplate.appendChild(document.createTextNode(word));
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
        wordElm.style.fontSize = `${(randomWordsElm.offsetHeight + randomWordsElm.offsetWidth) * Math.random() / 16}px`;
        wordElm.style.color = `rgb(${Math.floor(Math.random() * 192)}, ${Math.floor(Math.random() * 192)}, ${Math.floor(Math.random() * 192)})`;
        wordHeightPer = 100 * wordElm.clientHeight / randomWordsElm.offsetHeight;
        wordWidthPer = 100 * wordElm.clientWidth / randomWordsElm.offsetWidth;
        wordElm.style.top = `${-wordHeightPer + Math.random() * (wordHeightPer + 100)}%`;
        wordElm.style.left = `${-wordWidthPer + Math.random() * (wordWidthPer + 100)}%`;
        // wait sleeping
        await sleepPrm;
        // reload elements
        wordElm.style.opacity = "1.0";
        if (counter >= wordsLifeLimit) {
          const dyingWord = randomWordsElm.querySelector(".word:not(.dying)");
          dyingWord.classList.add("dying");
          dyingWord.style.transition = `opacity ${WORD_DIE_TIME / 1000}s 0.0s ease`;
          dyingWord.style.opacity = "0.0";
          sleep(WORD_DIE_TIME).then(() => randomWordsElm.removeChild(randomWordsElm.firstChild));
        }
      }
      
    })();
  });
