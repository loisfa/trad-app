import { Injectable } from '@angular/core';
import { VocFilesService } from './voc-files.service';
import { MyObserver } from './interface-observer';
import { MyObservable } from './interface-observable';
import { WordNTrans } from './word-n-trans';

@Injectable()
export class GameLogicService implements MyObserver, MyObservable {

  wordNTrans:WordNTrans=undefined;
  listWordNTrans:Array<WordNTrans>=[];
  gameHasInit:boolean=false;
  observersStartGameList:Array<MyObserver>=[];

  constructor(private vocFilesService:VocFilesService) {
    vocFilesService.addObserver(this);
  }


  addObserver(observer:any) {
    this.observersStartGameList.push(observer);
  }
  removeObserver(observerToRemove:any) {
    for(let index in this.observersStartGameList) {
      if (this.observersStartGameList[index] === observerToRemove) {
        this.observersStartGameList.splice(Number(index), 1);
      }
    }
  }
  notifyObservers() {
    for(let observer of this.observersStartGameList) {
      observer.receiveNotification();
    }
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
    this.notifyObservers();
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
    console.log("in check if equal - wordNTrans:");
    console.log(wordNTrans);
    // easy mode : forget about 'ъ' and 'ь'
    let re = new RegExp('ъ', 'g');
    parsedWord = parsedWord.replace(re, '');
    re = new RegExp('ь', 'g');
    parsedWord = parsedWord.replace(re, '');
    // erasing spaces (in theory at beginning and end at word if so, in practive every spaces)
    re = new RegExp(' ', 'g');
    parsedWord = parsedWord.replace(re, '');

    console.log("parsedWord: "+parsedWord.toLowerCase());
    for (let trans of wordNTrans.transList) {
      trans = trans.replace(re, '');
      console.log("trans.toLowerCase: "+trans.toLowerCase());
      if (parsedWord.toLowerCase() === trans.toLowerCase()) {
        this.getNextWord(); // ?? should it be here ?
        return true;
      }
    }
    return false;
  }

}
