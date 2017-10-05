import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ParserService {

  isInit:boolean=false;
  private dictPath:string="../assets/dict-cyrillic.json";
  private dictCyrillic:Object;

  constructor(private http:Http) {
    this.initParser();
  }

  initParser():void {
    console.log("Local http request on "+this.dictPath);
    this.http.get(this.dictPath)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .subscribe(
          data => {
            console.log('Success of local http request on '+this.dictPath);
            this.dictCyrillic = data;
            this.isInit=true;
          },
          error => console.log(error)
      );
  }

  parseText(rawText:string):string {
    let parsedText:string=rawText;
    for(let letter in this.dictCyrillic['multipleLetters']) {
      var re = new RegExp(letter, 'g');
      parsedText = parsedText.replace(re, this.dictCyrillic['multipleLetters'][letter]);
    }
    for(let letter in this.dictCyrillic['singleLetters']) {
      var re = new RegExp(letter, 'g');
      parsedText = parsedText.replace(re, this.dictCyrillic['singleLetters'][letter]);
    }
    return parsedText;
  }

}
