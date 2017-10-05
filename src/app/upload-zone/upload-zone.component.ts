import { Component, OnInit } from '@angular/core';
import { VocFilesService } from '../voc-files.service';

@Component({
  selector: 'app-upload-zone',
  templateUrl: './upload-zone.component.html',
  styleUrls: ['./upload-zone.component.css']
})
export class UploadZoneComponent implements OnInit {

  constructor(private vocFilesService:VocFilesService) { }

  ngOnInit() {
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    this.vocFilesService.uploadFiles(fileList);
  }

}
