import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';
import { ParserService } from '../parser.service';
import { GameLogicService } from '../game-logic.service';
import { WordNTrans } from '../word-n-trans';

@Component({
  selector: 'app-typing-zone',
  templateUrl: './typing-zone.component.html',
  styleUrls: ['./typing-zone.component.css'],
  providers: [ParserService]
})
export class TypingZoneComponent implements OnInit {

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
        if (this.gameLogicService.checkIfEqual(this.parsedText)) {
          this.typedText="";
          // + TODO paint the parsedTextin green
        }
        //this.wordNTrans=this.gameLogicService.wordNTrans;
      }
    } else {
      console.log("parser not initialized yet");
    }
  }

  nextWord() {
    this.gameLogicService.getNextWord();
  }

}
