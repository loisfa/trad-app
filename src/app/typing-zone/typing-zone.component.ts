import { Component, OnInit } from '@angular/core';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-typing-zone',
  templateUrl: './typing-zone.component.html',
  styleUrls: ['./typing-zone.component.css']
})
export class TypingZoneComponent implements OnInit {

  typedText:string = "";
  parsedText:string;
  dictCyrillic:Object;

  constructor(private http:Http) {
    console.log("local http request");
    this.http.get("../assets/dict-cyrillic.json")
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .subscribe(
          data => {
            console.log('success');
            this.dictCyrillic = data;
          },
          error => console.log(error)
      );
  }

  ngOnInit() {
    // should be implemented as  a service

  }

  textChanged() {

    // should be implemented as  a service
    console.log("text changed");
    let tmpText = this.typedText;

    if (this.dictCyrillic != undefined) {
      console.log("multiple letters -------");
      for(let letter in this.dictCyrillic['multipleLetters']) {
        var re = new RegExp(letter, 'g');
        tmpText = tmpText.replace(re, this.dictCyrillic['multipleLetters'][letter]);
      }
      console.log("single letters -------");
      for(let letter in this.dictCyrillic['singleLetters']) {
        var re = new RegExp(letter, 'g');
        tmpText = tmpText.replace(re, this.dictCyrillic['singleLetters'][letter]);
      }
    }
    this.parsedText = tmpText;

  }

}
