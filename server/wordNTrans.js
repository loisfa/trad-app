
class WordNTrans{

  constructor(word, list_translations /*src_lang, dest_lang*/) {
    this.word = word;
    this.transList = list_translations;
    //this.src_lang = src_lang;
    //this.dest_lang = dest_lang;
  }

  addTrans(trans) {
    this.transList.push(trans);
  }

};

module.exports = WordNTrans;
