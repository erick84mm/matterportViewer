import { Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { DragScrollModule, DragScrollComponent } from 'ngx-drag-scroll';
import { DomSanitizer } from '@angular/platform-browser';
import {ChangeGraphService} from '../graphService/change-graph.service';


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
  imagelist = ["17DRP5sb8fy.png",
  "1LXtFkjw3qL.png",
  "1pXnuDYAj8r.png",
  "29hnd4uzFmX.png",
  "2azQ1b91cZZ.png",
  "2n8kARJN3HM.png",
  "2t7WUuJeko7.png",
  "5LpN3gDmAk7.png",
  "5q7pvUzZiYa.png",
  "5ZKStnWn8Zo.png",
  "759xd9YjKW5.png",
  "7y3sRwLe3Va.png",
  "8194nk5LbLH.png",
  "82sE5b5pLXE.png",
  "8WUmhLawc2A.png",
  "aayBHfsNo7d.png",
  "ac26ZMwG7aT.png",
  "ARNzJeq3xxb.png",
  "B6ByNegPMKs.png",
  "b8cTxDM8gDG.png",
  "cV4RVeZvu5T.png",
  "D7G3Y4RVNrH.png",
  "D7N2EKCX4Sj.png",
  "dhjEzFoUFzH.png",
  "E9uDoFAP3SH.png",
  "e9zR4mvMWw7.png",
  "EDJbREhghzL.png",
  "EU6Fwq7SyZv.png",
  "fzynW3qQPVF.png",
  "GdvgFV5R1Z5.png",
  "gTV8FGcVJC9.png",
  "gxdoqLR6rwA.png",
  "gYvKGZ5eRqb.png",
  "gZ6f7yhEvPG.png",
  "HxpKQynjfin.png",
  "i5noydFURQK.png",
  "JeFG25nYj2p.png",
  "JF19kD82Mey.png",
  "jh4fc5c5qoQ.png",
  "JmbYfDe2QKZ.png",
  "jtcxE69GiFV.png",
  "kEZ7cmS4wCh.png",
  "mJXqzFtmKg4.png",
  "oLBMNvg9in8.png",
  "p5wJjkQkbXX.png",
  "pa4otMbVnkk.png",
  "pLe4wQe7qrG.png",
  "Pm6F8kyY3z2.png",
  "pRbA3pwrgk9.png",
  "PuKPg4mmafe.png",
  "PX4nDJXEHrG.png",
  "q9vSo1VnCiC.png",
  "qoiz87JEwZ2.png",
  "QUCTc6BB5sX.png",
  "r1Q1Z4BcV1o.png",
  "r47D5H71a5s.png",
  "rPc6DW4iMge.png",
  "RPmz2sHmrrY.png",
  "rqfALeAoiTq.png",
  "s8pcmisQ38h.png",
  "S9hNv5qa7GM.png",
  "sKLMLpTHeUy.png",
  "SN83YJsR3w2.png",
  "sT4fr6TAbpF.png",
  "TbHJrupSAjP.png",
  "ULsKaCPVFJR.png",
  "uNb9QFRL6hY.png",
  "ur6pFq6Qu1A.png",
  "UwV83HsGsw3.png",
  "Uxmj2M2itWa.png",
  "V2XKFyX4ASd.png",
  "VFuaQ6m2Qom.png",
  "VLzqgDo317F.png",
  "Vt2qJdWjCF2.png",
  "VVfe2KiqLaN.png",
  "Vvot9Ly1tCj.png",
  "vyrNrziPKCB.png",
  "VzqfbhrpDEA.png",
  "wc2JMjhGNzB.png",
  "WYY7iVyf5p8.png",
  "X7HyMhZNoso.png",
  "x8F5xyUWy9e.png",
  "XcA2TqTSSAj.png",
  "YFuZgdQ5vWj.png",
  "YmJkqBEsHnH.png",
  "yqstnuAEVhm.png",
  "YVUC4YcDtcY.png",
  "Z6MFQCViBuw.png",
  "ZMojNkEp431.png",
  "zsNo4HB9uLZ.png"];
  leftNavDisabled = false;
  rightNavDisabled = false;
  index = 0;

  @ViewChild('nav', {read: DragScrollComponent}) ds: DragScrollComponent;

  constructor(
    sanitizer: DomSanitizer,
    private element: ElementRef,
    private renderer: Renderer2,
    private changeGraphService: ChangeGraphService
  ) {
  }


  ngOnInit() {
  }

  clickItem(event, item) {

    this.changeGraphService.change(item.substring(0, item.length-4));
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
