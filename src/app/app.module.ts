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
import {ChangePreviewService} from './previewService/change-preview.service';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { DragScrollModule } from 'ngx-drag-scroll';

@NgModule({
  declarations: [
    AppComponent,
    Box3dComponent,
    List3dboxesComponent,
    GraphComponent,
    FooterComponent,
    MenuComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    VisModule,
    HttpClientModule,
    DragScrollModule
  ],
  providers: [VisNetworkService, ChangePreviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
