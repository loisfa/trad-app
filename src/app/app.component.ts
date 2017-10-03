import { Component } from '@angular/core';
import { RequestOptions, Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import {Globals} from './global.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  apiEndPoint:string = 'http://localhost:8080/api/upload/';
  fileIsUploaded:boolean=false;
  word:string;
  wordNTrans;
  listWordNTrans;

  constructor(private http: Http, private globals:Globals) {

  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        /** No need to include Content-Type in Angular 4 */
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.post(`${this.apiEndPoint}`, formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
                data => {
                  console.log('success');
                  this.listWordNTrans = data.data;
                  console.log("response:");
                  console.log(this.listWordNTrans);
                  this.fileIsUploaded=true;
                },
                error => console.log(error)
            )
        }
    }

    nextWord():void {
      this.wordNTrans = this.getRandomWord();
      this.word = this.wordNTrans.word;
    }

    getRandomWord():any {
      if (this.listWordNTrans != undefined) {
        let randIndex = Math.floor(this.listWordNTrans.length*Math.random());
        return this.listWordNTrans[randIndex];
      } else return "ERROR - no list imported yet";
    }
}
