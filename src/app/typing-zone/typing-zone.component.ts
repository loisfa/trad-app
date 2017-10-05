import { Component, OnInit } from '@angular/core';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';
import { ParserService } from '../parser.service';

@Component({
  selector: 'app-typing-zone',
  templateUrl: './typing-zone.component.html',
  styleUrls: ['./typing-zone.component.css'],
  providers: [ParserService]
})
export class TypingZoneComponent implements OnInit {

  typedText:string="";
  parsedText:string="";

  constructor(private http:Http, private parserService:ParserService) {}

  ngOnInit() {}

  textChanged():void {
    // should be implemented as  a service
    if (this.parserService.isInit==true) {
      this.parsedText = this.parserService.parseText(this.typedText);
    } else {
      console.log("parser not initialized yet");
    }
  }

}
