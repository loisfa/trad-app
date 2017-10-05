import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { TypingZoneComponent } from './typing-zone/typing-zone.component';
import { UploadZoneComponent } from './upload-zone/upload-zone.component';

@NgModule({
  declarations: [
    AppComponent,
    TypingZoneComponent,
    UploadZoneComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent, TypingZoneComponent]
})
export class AppModule { }
