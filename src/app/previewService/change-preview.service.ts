import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangePreviewService {
   @Output() fire: EventEmitter<string> = new EventEmitter();

  constructor() {
     console.log('service started');
  }


   change(img_id) {
    console.log('change started');
    console.log(img_id);
     this.fire.emit(img_id);
   }

   getEmittedValue() {
     return this.fire;
   }
}
