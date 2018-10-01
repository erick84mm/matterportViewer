import { Component, ViewChild, ElementRef, OnInit,Injectable, HostListener, Input, OnChanges} from '@angular/core';
import * as THREE from 'three';
import * as THREEFULL from 'three-full';
import {ChangePreviewService} from '../previewService/change-preview.service';

@Component({
  selector: 'app-box3d',
  templateUrl: './box3d.component.html',
  styleUrls: ['./box3d.component.css']
})

@Injectable()
export class Box3dComponent implements OnInit,  OnChanges {

  default_img = "https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547"
  default_text = "Please select reference points at each viewpoint so the algorithm can generate a path base on your selection"
  //default_text = "Please accept this random internet image as an apollogy of loading slow or not being able to load. Sorry :("

  default_state = "Visited"
  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  @Input() scan: string;
  @Input() img_id: string;

  img_prefix: string = '../assets/v1/scans/';
  folder: string = '/matterport_skybox_images/';
  img_posfix: string = '_skybox';
  subscription: any = null;

   renderer = new THREE.WebGLRenderer();
   scene = null;
   camera = null;
   mesh = null;
   controls = null;
   active = 0;
   mouse_down = 0;


  constructor(private changePreviewService: ChangePreviewService) {
    //Scene camera and control initialization
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 1, 1000); //window.innerWidth / window.innerHeight
    this.camera.position.z = 100;
    this.controls = new THREEFULL.TrackballControls(this.camera);
  }


  ngAfterViewInit() {

          var width = this.rendererContainer.nativeElement.offsetWidth;
          var height = this.rendererContainer.nativeElement.offsetHeight;
          console.log(width);
          this.renderer.setSize(width,width);
          this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
          this.animate(0);


      }

  loadScene(){
    console.log("loadscene");
    var image_src = '';
    if (typeof this.scan != 'undefined' && typeof this.img_id != 'undefined'){
      image_src = this.img_prefix + this.scan + this.folder + this.img_id + this.img_posfix;
    }
    else{
      image_src = '../assets/v1/scans/2t7WUuJeko7/matterport_skybox_images/0c3c242b5567468889d3c66eb931d6e8_skybox';
    }
    var directions  = [ "2","4","0","5", "1","3"];
    var imageExt = "_sami.jpg";

    var materialArray = [];
    for (var i = 0; i < 6; i++)
     materialArray.push( new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load( image_src + directions[i] + imageExt ),
      side: THREE.BackSide
     }));

    var skyGeometry = new THREE.CubeGeometry( 1000, 1000, 1000 );
    this.mesh = new THREE.Mesh( skyGeometry, materialArray );
    this.scene.add(this.mesh );

        console.log('renderer.info.memory after: ', this.renderer.info);
  }

  ngOnInit() {

                  this.changePreviewService.fire
                    .subscribe(id => {
                      this.img_id=id;

                        this.disposeHierchy(this.scene, this.mesh);
                          var width = this.rendererContainer.nativeElement.offsetWidth;
                          var height = this.rendererContainer.nativeElement.offsetHeight;
                          this.renderer.setSize(width,width);
                          this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
                          this.scene.remove(this.mesh);
                          this.loadScene();
                          this.animate(0);


                    });

                    this.loadScene();

  }


  ngOnChanges() {
      console.log("on change");
        this.loadScene();
    }

 onMouseEnter(){

   if(this.mouse_down == 0){
     this.active = 1;
   }
 }

 onMouseLeave(){
   if(this.mouse_down == 0){
     this.active = 0;
   }
 }

 onSelect(){
   if(this.default_state == "Visited" ){
     this.default_state = "Selected"
   }
   else{
     this.default_state = "Visited"
   }
 }

  onMouseDown(){
    this.mouse_down = 1;
  }

  onMouseUp(){
    this.mouse_down = 0;
  }

 animate(val)
  {
    if(val < 10){
      window.requestAnimationFrame(() => this.animate((val+1)));
      this.renderer.render(this.scene, this.camera);
    }
    else if(val >= 10){
      window.requestAnimationFrame(() => this.animate(10));
    }
    if (this.active == 1 && this.mouse_down == 1){
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
    }
  }

  onWindowResize(){

      var width = this.rendererContainer.nativeElement.offsetWidth;
      var height = this.rendererContainer.nativeElement.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, width);

  }

disposeNode(node) {
    if (node instanceof THREE.Mesh) {
      if (node.geometry) {
        node.geometry.dispose();
        node.geometry = undefined; // fixed problem
      }

      if (node.material) {
        if (node.material instanceof THREE.MeshFaceMaterial || node.material instanceof THREE.MultiMaterial) {
          node.material.materials.forEach( function(mtrl, idx) {
            if (mtrl.map) mtrl.map.dispose();
            if (mtrl.lightMap) mtrl.lightMap.dispose();
            if (mtrl.bumpMap) mtrl.bumpMap.dispose();
            if (mtrl.normalMap) mtrl.normalMap.dispose();
            if (mtrl.specularMap) mtrl.specularMap.dispose();
            if (mtrl.envMap) mtrl.envMap.dispose();

            mtrl.dispose();
            mrtl = undefined; // fixed problem
          } );
        }
        else {
          if (node.material.map) node.material.map.dispose();
          if (node.material.lightMap) node.material.lightMap.dispose();
          if (node.material.bumpMap) node.material.bumpMap.dispose();
          if (node.material.normalMap) node.material.normalMap.dispose();
          if (node.material.specularMap) node.material.specularMap.dispose();
          if (node.material.envMap) node.material.envMap.dispose();

          node.material.dispose();
          node.material = undefined; // fixed problem
        }
      }
    }
    console.log('node before removal: ', node);
    this.scene.remove( node );
    this.renderer.renderLists.dispose();
    this.renderer.dispose(); // ***EDIT*** improved even memory more original scene heap is 12.4 MB; add objects increases to 116 MB or 250 MB (different models), clearing always brings down to 13.3 MB ... there still might be some artifacts.
    node = undefined; // unnecessary
  }

 disposeHierchy(node, callback) {
    for (var i = node.children.length - 1; i >= 0; i--) {
      var child = node.children[i];

      this.disposeHierchy(child, callback);
      //callback(child);
    }
  }

  render(){
    if (this.active == 1){
        this.renderer.render(this.scene, this.camera);
    }
  }


}
