import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';
import { ParserService } from '../parser.service';
import { GameLogicService } from '../game-logic.service';
import { WordNTrans } from '../word-n-trans';
import { MyObserver } from '../interface-observer';

@Component({
  selector: 'app-typing-zone',
  templateUrl: './typing-zone.component.html',
  styleUrls: ['./typing-zone.component.css'],
  providers: [ParserService]
})
export class TypingZoneComponent implements OnInit, MyObserver {

  typedText:string="";
  parsedText:string="";
  //wordNTrans:WordNTrans;

  constructor(private http:Http,
    private parserService:ParserService,
    private gameLogicService:GameLogicService) {
      //this.gameLogicService.addObserver(this);
    }

  ngOnInit() {}

  textChanged():void {
    // should be implemented as  a service
    if (this.parserService.isInit==true) {
      this.parsedText=this.parserService.parseText(this.typedText);
      if (this.gameLogicService.gameHasInit==true) {
        this.gameLogicService.checkIfEqual(this.parsedText,
          this.gameLogicService.wordNTrans); // !!! should remove this second argument
        //this.wordNTrans=this.gameLogicService.wordNTrans;
      }
    } else {
      console.log("parser not initialized yet");
    }
  }

  receiveNotification() {
    // from game Logic
    // means the game has started
    console.log("TypingZoneComponent got notification to start the game");
    this.nextWord();
  }


  nextWord():void {
    this.gameLogicService.getNextWord();
  }

}
