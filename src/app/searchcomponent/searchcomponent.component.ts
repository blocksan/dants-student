import { Component, OnInit } from '@angular/core';
import {Globals} from './../globals';
import { DataService } from './../apidata.service';

@Component({
  selector: 'app-searchcomponent',
  templateUrl: './searchcomponent.component.html',
  styleUrls: ['./searchcomponent.component.css']
})
export class SearchcomponentComponent implements OnInit {
  searchresult:string;
  searchlang:string;
  searchKey:string;
  constructor(private globals:Globals, private _dataService:DataService) { 
   this.searchKey='';
  }

  ngOnInit() {
  }
  
  ngOnTranslate(selectedLanguage){
    console.log('called')
    this._dataService.getYandexTranslate(this.searchKey,selectedLanguage)
    .subscribe(res => {
      
      this.globals.searchLoaded=true;

      this.searchlang=res.lang;
  
      this.searchresult=res.text[0]; 


      console.log(res,'search') 
    }); 
  }
  ngOnDetectMe(){
    this._dataService.getYandexDetect(this.searchKey)
    .subscribe(res => {
      this.globals.searchLoaded=true;


      this.searchlang=res.lang;
      this.searchresult=null;

      console.log(res,'search')
    });
  }
}
