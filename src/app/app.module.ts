import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Box3dComponent } from './box3d/box3d.component';
import { List3dboxesComponent } from './list3dboxes/list3dboxes.component';

@NgModule({
  declarations: [
    AppComponent,
    Box3dComponent,
    List3dboxesComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
