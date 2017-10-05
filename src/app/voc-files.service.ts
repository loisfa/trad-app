import { Injectable } from '@angular/core';
import { VocFile } from './voc-file';
import { UploadFileService } from './upload-file.service';
import { MyObservable } from './interface-observable';
import { GameLogicService } from './game-logic.service';

@Injectable()
export class VocFilesService implements MyObservable {
// singleton, contains the differents files
    vocFileList:Array<VocFile>=[];
    private listObservers:Array<any>=[];

    constructor(private uploadFileService:UploadFileService) {}

    addObserver(observer:any):void {
      this.listObservers.push(observer);
      console.log("added observer");
    }
    removeObserver(observer:any):void {
      for(let index in this.listObservers) {
        if (this.listObservers[index] === observer) {
          this.listObservers.splice(Number(index), 1);
        }
      }
    }
    notifyObservers():void {
      for (let observer of this.listObservers) {
        observer.receiveNotification();
      }
    }

    uploadFiles(filelist:FileList):void {
      for (let index in filelist) {
        let file=filelist[index];
        if (file instanceof File) {
          if (this.vocFileAlreadyUploaded(file)==false) {
            this.uploadSingleFile(file);
          }
        }
      };
    }
    uploadSingleFile(file:File):void {
      this.uploadFileService.uploadFile(file)
        .subscribe(
            data => {
              console.log('success');
              let vocFile = new VocFile(file.name, data.data);
              this.addFileToList(vocFile);
            },
            error => {
              console.log(error)
            }
        );
    }
    vocFileAlreadyUploaded(fileToUpload:File):boolean {
      for (let vocFile of this.vocFileList) {
        if (fileToUpload.name === vocFile.name) {
          console.log("file already uploaded !"
            +" Change the file name if the file is different from the previous '"
            +vocFile.name+"'");
          return true;
        }
      }
      return false;
    }

    addFileToList(vocFile:VocFile):void {
      this.vocFileList.push(vocFile);
      this.notifyObservers();
    }
    deleteFile(vocFileToDelete:VocFile) {
      for (let index in this.vocFileList) {
          if (this.vocFileList[index] === vocFileToDelete) {
              this.vocFileList.splice(Number(index),1);
          };
      }
      this.notifyObservers();
    }

    enableFile(vocFile:VocFile):void {
      vocFile.enable();
      this.notifyObservers();
    }
    disableFile(vocFile:VocFile):void {
      vocFile.disable();
      this.notifyObservers();
    }

}
