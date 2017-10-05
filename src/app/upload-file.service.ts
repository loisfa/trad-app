import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class UploadFileService {
    apiEndPoint:string='http://localhost:8080/api/upload/';

    constructor(private http:Http) {}

    uploadFile(file:File):Observable<any> {
      let formData:FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let headers = new Headers();
      headers.append('enctype', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      headers.append('Access-Control-Allow-Origin', 'http://localhost:8080/api/upload/');
      let options = new RequestOptions({ headers: headers });
      return this.http.post(`${this.apiEndPoint}`, formData, options)
          .map(res => res.json())
          .catch(error => Observable.throw(error));
      }

  }
