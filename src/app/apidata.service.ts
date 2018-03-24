import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;
  constructor(private _http: Http) { 
     }

  getUsers() {
    return this._http.get("/api/users")
      .map(result => {
      return  this.result = result['_body']
      });
  }
  postUsers(name,email,password) {
    let myobj = { name: name, email: email,password:password };
    return this._http.post("/api/register",myobj) 
      .map(result => {
        return this.result = result['_body'];
      });
  }
  loginUser(email,password) {
    let myobj = { email: email,password:password };
    return this._http.post("/api/login",myobj) 
      .map(result => {
        return this.result = result['_body'];
      });
  }
  
  getYandexTranslate(searchtext,language){
    let params={
        searchKey:searchtext,
        searchTargetLang:language,
    }
    
    return this._http.post('/api/getTranslate',params)
    .map(result => {
      console.log(result)
    return result.json() 
      });
  }
  getYandexDetect(searchtext){
    let params={
        searchKey:searchtext
    }
    return this._http.post('/api/getDetect',params)
    .map(result => {
      console.log(result)
    return result.json(); 
      });
  }
  postSearch(){
    let myobj = { searchkey: "search1", searchresult: "best search result"};
    return this._http.post("/api/postsearch",myobj)
      .map(result => this.result = result['search']);
  }

}
