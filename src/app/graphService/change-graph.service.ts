import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeGraphService {

 @Output() fire: EventEmitter<string> = new EventEmitter();

  constructor() { }


     change(graph_id) {
       this.fire.emit(graph_id);
     }

     getEmittedValue() {
       return this.fire;
     }
}
