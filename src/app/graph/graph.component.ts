import { Component, OnDestroy, OnInit, Input} from '@angular/core';

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

   public constructor(private visNetworkService: VisNetworkService) {
     console.log("constructor");
    }

   public addNode(): void {
     console.log("addNode");
       const newId = this.visNetworkData.nodes.getLength() + 1;
       this.visNetworkData.nodes.add({ id: newId.toString(), label: 'Node ' + newId });
       this.visNetworkService.fit(this.visNetwork);
   }

   public networkInitialized(): void {
     console.log("networkInitialized");
       // now we can use the service to register on events
       this.visNetworkService.on(this.visNetwork, 'click');

       // open your console/dev tools to see the click params
       this.visNetworkService.click
           .subscribe((eventData: any[]) => {
               if (eventData[0] === this.visNetwork) {
                 console.log(eventData[1]);
               }
           });
   }

   public ngOnInit(): void {
     console.log("ngOnInit");
       const nodes = new VisNodes([
           { id: '1', label: 'Node 1', x: 0, y:0},
           { id: '2', label: 'Node 2', x: 110.2, y:105.6 },
           { id: '3', label: 'Node 3', x: 210.2, y:105.6  },
           { id: '4', label: 'Node 4' , x: 310.2, y:105.6  },
           { id: '5', label: 'Node 5', x: 410.2, y:105.6  , title: 'Title of Node 5' }]);

       const edges = new VisEdges([
           { from: '1', to: '3' },
           { from: '1', to: '2' },
           { from: '2', to: '4' },
           { from: '2', to: '5' }]);

       this.visNetworkData = {
           nodes,
           edges,
       };

       this.visNetworkOptions = {

          physics:false,
          layout: {randomSeed:0}
       };

   }

   public ngOnDestroy(): void {
       this.visNetworkService.off(this.visNetwork, 'click');
   }
}
