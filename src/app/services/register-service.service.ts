import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: HttpClient) {
  }

  private _urlBase : string = "http://srvapp.unicoadv.com.br:3000"; // Servidor OCI
  
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    })
  };

  registerUser(user: any) {
    console.log(user);
    
    return new Promise((resolve: any, reject: any) => {

      let request = this.http.post(`${this._urlBase}/auth/signup`, user, this.httpOptions)
      
      request.subscribe( res => {
      resolve(res)
    },
    err => {
      reject(err)
    }
    )
  })
}
  
}

export interface User {
  username: string,
  doc: string,
  email: string,
  password: string,
}



