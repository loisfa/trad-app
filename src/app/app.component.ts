import { Component } from '@angular/core';
import { VocFilesService } from './voc-files.service';
import { GameLogicService } from './game-logic.service';
import { UploadFileService } from './upload-file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [VocFilesService, GameLogicService, UploadFileService]
})

export class AppComponent {

  constructor(private vocFilesService:VocFilesService, private gameLogicService:GameLogicService) {}

}
