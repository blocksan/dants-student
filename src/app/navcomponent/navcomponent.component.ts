import { Component, OnInit } from '@angular/core';
import {Globals} from './../globals';


@Component({
  selector: 'app-navcomponent',
  templateUrl: './navcomponent.component.html',
  styleUrls: ['./navcomponent.component.css']
})
export class NavcomponentComponent implements OnInit {

  constructor(private globals:Globals) {
    
   }

  ngOnInit() {
  }

}
