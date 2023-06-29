import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: HttpClient) {
  }


  registerUser(user: User) {
    return this.http.post('http://localhost:3000/register', user)
  }
 
}

export interface User {
  username: string,
  doc: string,
  email: string,
  password: string,
}



