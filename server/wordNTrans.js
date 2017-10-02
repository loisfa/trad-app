
class WordNTrans{

  constructor(word, list_translations /*src_lang, dest_lang*/) {
    this.word = word;
    this.list_trans = list_translations;
    //this.src_lang = src_lang;
    //this.dest_lang = dest_lang;
  }

  addTrans(trans) {
    this.list_trans.push(trans);
  }

};

module.exports = WordNTrans;
