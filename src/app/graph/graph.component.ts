import { Component, OnDestroy, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import {ChangePreviewService} from '../previewService/change-preview.service';

import {
    VisEdges,
    VisNetworkData,
    VisNetworkOptions,
    VisNetworkService,
    VisNode,
    VisNodes } from '../../../node_modules/ngx-vis/components/network';

class NetworkData implements VisNetworkData {
    public nodes: VisNodes;
    public edges: VisEdges;
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class GraphComponent implements OnInit, OnDestroy {

   public visNetwork: string = 'networkId1';
   public visNetworkData: NetworkData;
   public visNetworkOptions: VisNetworkOptions;
   @Input() public scan: string = null;
   @ViewChild('graphRendererContainer') rendererContainer: ElementRef;

   public constructor(private visNetworkService: VisNetworkService, private http: HttpClient,private changePreviewService: ChangePreviewService) {


    }

   public addNode(): void {
       const newId = this.visNetworkData.nodes.getLength() + 1;
       this.visNetworkData.nodes.add({ id: newId.toString(), label: 'Node ' + newId });
       this.visNetworkService.fit(this.visNetwork);
   }

   public networkInitialized(): void {
       // now we can use the service to register on events
       this.visNetworkService.on(this.visNetwork, 'click');

       // open your console/dev tools to see the click params
       this.visNetworkService.click
           .subscribe((eventData: any[]) => {
                     console.log(this.rendererContainer.nativeElement.offsetHeight);
               if (eventData[0] === this.visNetwork) {
                for (let i in eventData[1]["nodes"]){
                  var img_id = eventData[1]["nodes"][i];

                  if(typeof img_id !== 'undefined'){

                      this.changePreviewService.change(img_id);

                  }
                }
               }
           });
   }

ngAfterViewInit(){

          console.log(this.rendererContainer.nativeElement.offsetHeight);
}
   public ngOnInit(): void {

        this.http.get(this.scan)
          .subscribe(data => {
              const nodes = data["nodes"];
              const edges = data["edges"];
              var ini_height =this.rendererContainer.nativeElement.offsetHeight;
              this.visNetworkData = {
                  nodes,
                  edges,
              };

              this.visNetworkOptions = {
                 physics:{enabled:false},
                 layout: {randomSeed:0},
                 clickToUse: true,
                 height: ini_height + "px",
                 interaction:{
                  zoomView:false,
                  dragNodes:false,
                  dragView: false,
                  multiselect: true
                }

              };

             });

   }

   public ngOnDestroy(): void {
       this.visNetworkService.off(this.visNetwork, 'click');
   }
}
