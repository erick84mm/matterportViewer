import { Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { DragScrollModule, DragScrollComponent } from 'ngx-drag-scroll';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  title = 'app works!';
  hideScrollbar;
  disabled;
  xDisabled;
  yDisabled;
  imagelist = [
    'luke.png',
    'chubaka.png',
    'boba.png',
    'c3po.png' ,
    'leia.png',
    'obi.png',
    'r2d2.png',
    'storm.png',
    'varder.png',
    'yoda.png',
    'yolo.png'
  ];
  leftNavDisabled = false;
  rightNavDisabled = false;
  index = 0;

  @ViewChild('nav', {read: DragScrollComponent}) ds: DragScrollComponent;

  constructor(
    sanitizer: DomSanitizer,
    private element: ElementRef,
    private renderer: Renderer2
  ) {
  }


  ngOnInit() {
  }

  clickItem(event, item) {
    console.log('item clicked');
    var css_class = "unselected";
    console.log(item);
    console.log(event);
    const hasClass = event.target.classList.contains(css_class);
    if(hasClass){
      console.log("has the class");

      this.renderer.removeClass(event.target, css_class);
    }
    else{

        this.renderer.addClass(event.target, css_class);
    }
  }

  remove() {
    this.imagelist.pop();
  }

  toggleHideSB() {
    this.hideScrollbar = !this.hideScrollbar;
  }

  toggleDisable() {
    this.disabled = !this.disabled;
  }
  toggleXDisable() {
    this.xDisabled = !this.xDisabled;
  }
  toggleYDisable() {
    this.yDisabled = !this.yDisabled;
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }

  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }

  onSnapAnimationFinished() {
    console.log('snap animation finished');
  }
}
