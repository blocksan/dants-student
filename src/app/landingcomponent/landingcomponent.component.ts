import { Component, OnInit } from '@angular/core';
import {Globals} from './../globals'
@Component({
  selector: 'app-landingcomponent',
  templateUrl: './landingcomponent.component.html',
  styleUrls: ['./landingcomponent.component.css']
})
export class LandingcomponentComponent implements OnInit {

  constructor(private globals:Globals) { }

  ngOnInit() {
  }

}
