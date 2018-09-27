import { Component, ViewChild, ElementRef, OnInit,Injectable, HostListener, Input } from '@angular/core';
import * as THREE from 'three';
import * as THREEFULL from 'three-full';

@Component({
  selector: 'app-box3d',
  templateUrl: './box3d.component.html',
  styleUrls: ['./box3d.component.css']
})

@Injectable()
export class Box3dComponent implements OnInit {

  default_img = "https://vignette.wikia.nocookie.net/dragonballfanon/images/7/70/Random.png/revision/latest?cb=20161221030547"
  default_text = "Please accept this random internet image as an apollogy of loading slow or not being able to load. Sorry :("
  default_state = "Visited"
  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  @Input() cube_src: string;

   renderer = new THREE.WebGLRenderer();
   scene = null;
   camera = null;
   mesh = null;
   controls = null;
   active = 0;
   mouse_down = 0;


  constructor() {
    //Scene camera and control initialization
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 100;
    this.controls = new THREEFULL.TrackballControls(this.camera);
  }


  ngAfterViewInit() {

          var width = this.rendererContainer.nativeElement.offsetWidth
          this.renderer.setSize(width,300);
          this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
          this.animate(0);
      }



  ngOnInit() {
    var imagePrefix = '';
    if (typeof this.cube_src != 'undefined'){
      imagePrefix = this.cube_src
    }
    else{
      imagePrefix = '../assets/Place1/0c3c242b5567468889d3c66eb931d6e8_skybox';
    }
    var directions  = [ "2","4","0","5", "1","3"];
    var imageSuffix = "_sami.jpg";

    var materialArray = [];
    for (var i = 0; i < 6; i++)
     materialArray.push( new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load( imagePrefix + directions[i] + imageSuffix ),
      side: THREE.BackSide
     }));

    var skyGeometry = new THREE.CubeGeometry( 500, 500, 500 );
    this.mesh = new THREE.Mesh( skyGeometry, materialArray );
    this.scene.add(this.mesh );

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



  render(){
    if (this.active == 1){
        this.renderer.render(this.scene, this.camera);
    }
  }


}
