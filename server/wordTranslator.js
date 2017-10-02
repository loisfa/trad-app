// this class takes a list of :
//  [ 1 word (string), several translations for the word separated by ',' or '/' or ';' (string[]) ]
// and returns a list of words and all the their translations e.g. :
//  {1 word (string), several translations for the word (string[])}
// for both languages


class WordTranslator {


  constructor(unformattedList) {
    const SEPARATOR = '/';
    if (unformattedList == undefined) {
      console.log("undefined list for the WordTranslations constructor");
    } else {
      let WordNTrans = require('./wordNTrans');
      this.wordNTranslations = [];

      for (let index in unformattedList) {
        let line = unformattedList[index];
        let word = line[0];
        let transList = [];
        for (let i=1; i<line.length; i++) {
          let splittedLine = line[i].split(SEPARATOR);
          for (let index in splittedLine) {
            let chunck = splittedLine[index];
            transList.push(chunck);
          }
        }
        console.log('word: '+line[0]);
        console.log('trans: '+transList);
        let wt = new WordNTrans(line[0], transList);
        this.wordNTranslations.push(wt);
      }
    }
  }

  // useless function ? front function ?
  getRandomWord() {
    let randIndex = Math.floor(this.wordNTranslations.length*Math.random());
    console.log(randIndex);
    return this.wordNTranslations[randIndex];
  }
};

module.exports = WordTranslator;
