import { Component, OnInit } from '@angular/core';
import {Globals} from './../globals';
import { DataService } from './../apidata.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:any;
  password:any;
  constructor(private _dataService:DataService,private router:Router,private globals:Globals) { 
  }

  ngOnInit() {
  
  }
  ngOnSubmit(){
    console.log(this.email,this.password)
    console.log('called')
    this._dataService.loginUser(this.email,this.password)
    .subscribe(res => {
      res=JSON.parse(res)
      console.log(res.user.name)
      this.globals.userName= res.user.name;
      //console.log(res,'search') 
      this.router.navigate(['/']); 
            
    });
  }

}
