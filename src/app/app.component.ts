  import { Component } from '@angular/core';
  
  
  // Import the DataService and send it to the frontend for our use
  import { DataService } from './apidata.service';
  
  @Component({ 
    selector: 'app-component',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    title = 'app demo';
    // Define a users property to hold our user data
    users: Array<any>;
    searches: Array<any>;
    // Create an instance of the DataService through dependency injection
    constructor(private _dataService: DataService) {
  
      // Access the Data Service's getUsers() method we defined
      this._dataService.getUsers()
          .subscribe(res => {
            this.users = JSON.parse(res);
          });
          
      
    }
  }
  