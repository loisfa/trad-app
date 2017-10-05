import { Injectable } from '@angular/core';
import { VocFilesService } from './voc-files.service';
import { MyObserver } from './interface-observer';
import { WordNTrans } from './word-n-trans';

@Injectable()
export class GameLogicService implements MyObserver {

  wordNTrans:WordNTrans=undefined;
  listWordNTrans:Array<WordNTrans>=[];
  gameHasInit:boolean=false;

  constructor(private vocFilesService:VocFilesService) {
    vocFilesService.addObserver(this);
  }

  receiveNotification():void {
    console.log("in GameLogicService. got notified VocFilesService changed");
    // Should implement a state machine
    this.updateListWords();
    if (this.listWordNTrans.length<=0) {
      console.log("no file enabled, no word to display");
    } else if (this.gameHasInit==false) {
      this.startGame();
    }
  }

  updateListWords():void {
    for(let vocFile of this.vocFilesService.vocFileList) {
      if (vocFile.isEnabledForGame==true) {
        for(let wordNTrans of vocFile.wordNTransList) {
          this.listWordNTrans.push(wordNTrans);
        }
      }
    }
  }

  startGame():void {
    console.log("start the game");
    this.wordNTrans = this.getNextWord();
    this.gameHasInit=true;
  }
  getNextWord():WordNTrans {
    console.log("get next word");
    let length = this.listWordNTrans.length;
    // equiprobability model
    let randomIndex = Math.floor(Math.random()*length);
    this.wordNTrans = this.listWordNTrans[randomIndex];
    return this.wordNTrans;
  }
  checkIfEqual(parsedWord:string, wordNTrans:WordNTrans):boolean {
    // easy mode : forget about 'ъ' and 'ь'
    let re = new RegExp('ъ', 'g');
    parsedWord = parsedWord.replace(re, '');
    re = new RegExp('ь', 'g');
    parsedWord = parsedWord.replace(re, '');

    for (let trans of wordNTrans.transList) {
      if (parsedWord.toLowerCase() === trans.toLowerCase()) {
        this.getNextWord(); // ?? should it be here ?
        return true;
      }
    }
    return false;
  }

}
