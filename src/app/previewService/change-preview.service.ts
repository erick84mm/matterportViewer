import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})



export class ChangePreviewService {
   @Output() fire: EventEmitter<string> = new EventEmitter();

  constructor() {
  }


   change(img_id, scan_id) {
     let emitData: any = {
       img_id: img_id,
       scan_id: scan_id
     };

     this.fire.emit(emitData);
   }

   getEmittedValue() {
     return this.fire;
   }
}
