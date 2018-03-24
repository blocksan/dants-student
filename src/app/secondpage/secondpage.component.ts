import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secondpage',
  templateUrl: './secondpage.component.html',
  styleUrls: ['./secondpage.component.css']
})
export class SecondpageComponent implements OnInit {
  dummuname = " dummy variable added "
  countInc=1;
  constructor() { }

  ngOnInit() {
  }
  addItem() { 
    this.countInc++;
 } 

}
