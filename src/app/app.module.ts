import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { TypingZoneComponent } from './typing-zone/typing-zone.component';
import { Globals } from './global.service'; 

@NgModule({
  declarations: [
    AppComponent,
    TypingZoneComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent, TypingZoneComponent]
})
export class AppModule { }
