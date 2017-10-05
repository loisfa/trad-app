import { Component } from '@angular/core';
import { VocFilesService } from './voc-files.service';
import { GameLogicService } from './game-logic.service';
import { UploadFileService } from './upload-file.service';
import { TypingZoneComponent } from './typing-zone/typing-zone.component';
import { UploadZoneComponent } from './upload-zone/upload-zone.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [VocFilesService, GameLogicService, UploadFileService]
})

export class AppComponent {

  constructor(private vocFilesService:VocFilesService,
    private gameLogicService:GameLogicService) {}

}
