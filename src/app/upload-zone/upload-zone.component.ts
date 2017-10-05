import { Component, OnInit } from '@angular/core';
import { VocFilesService } from '../voc-files.service';
import { VocFile } from '../voc-file'
import { MyObserver } from '../interface-observer';

@Component({
  selector: 'app-upload-zone',
  templateUrl: './upload-zone.component.html',
  styleUrls: ['./upload-zone.component.css']
})
export class UploadZoneComponent implements OnInit, MyObserver {

  vocFileList:Array<VocFile>=[];

  constructor(private vocFilesService:VocFilesService) {
    this.vocFilesService.addObserver(this);
  }

  ngOnInit() {
  }

  fileChange(event) {
    console.log("launched upload");
    let fileList: FileList = event.target.files;
    this.vocFilesService.uploadFiles(fileList);
  }

  receiveNotification() {
    this.vocFileList=this.vocFilesService.vocFileList;
    console.log("UploadZoneComponent received notification:");
    console.log(this.vocFileList);
  }

  removeFile(vocFile:VocFile) {
    this.vocFilesService.deleteFile(vocFile);
  }

  switchFileState(vocFile:VocFile) {
    this.vocFilesService.switchFileState(vocFile);
  }

}
