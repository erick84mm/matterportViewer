import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Box3dComponent } from './box3d/box3d.component';
import { List3dboxesComponent } from './list3dboxes/list3dboxes.component';
import { HttpClientModule,HttpClient, HttpHeaders }    from '@angular/common/http';
import { GraphComponent } from './graph/graph.component';
import { VisNetworkService } from '../../node_modules/ngx-vis/components/network';
import { VisModule } from '../../node_modules/ngx-vis';

@NgModule({
  declarations: [
    AppComponent,
    Box3dComponent,
    List3dboxesComponent,
    GraphComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    VisModule,
    HttpClientModule
  ],
  providers: [VisNetworkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
