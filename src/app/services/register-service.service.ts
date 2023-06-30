import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import {Loading} from 'notiflix/build/notiflix-loading-aio';
import {Block} from 'notiflix/build/notiflix-block-aio';
import {Report} from 'notiflix/build/notiflix-report-aio';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: HttpClient) {
    Notify.init({
      position: 'right-bottom',
      timeout: 5000,
      cssAnimationStyle: "from-bottom",
      distance: '30px',
      // Fundo claro fonte escura
      /*success: {
        background: '#edf7ee',
        textColor: '#388e3c'
      },
      failure: {
        background: '#fdeceb',
        textColor: '#d32f2f'
      },
      warning: {
        background: '#fff5e6',
        textColor: '#f57c00'
      },
      info: {
        background: '#bfe2ff',
        textColor: '#0028a6'
      },*/
      // Fundo escuro fonte clara
      success: {
        background: '#388e3c',
        textColor: '#edf7ee'
      },
      failure: {
        background: '#d32f2f',
        textColor: '#fdeceb'
      },
      warning: {
        background: '#f57c00',
        textColor: '#fff5e6'
      },
      info: {
        background: '#0092ff',
        textColor: '#bfe2ff'
      },
    });
  }

  private _urlBase : string = "https://srvapp.unicoadv.com.br:3000"; // Servidor OCI
  
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

      let request = this.http.post(`${this._urlBase}/auth/signup/`, user, this.httpOptions)
      
      request.subscribe( res => {
      resolve(res)
    },
    err => {
      reject(err)
    }
    )
  })
}
showNotification(type: string, message: string) {
  if ( ["SUCCESS", "SUCESS", "SUCES", "SUCESSO", "OK", "SUC", "SUCCES"].includes(type.toUpperCase()) ) {
    Notify.success(message);
  }
  if ( ["INFO", "I"].includes(type.toUpperCase()) ) {
    Notify.info(message);
  }
  if ( ["ERROR", "ERRO", "ERR", "NOK", "FAIL", "FAILURE", "PROBLEM"].includes(type.toUpperCase()) ) {
    Notify.failure(message);
  }
  if ( ["WARNING", "WARN", "ALERT"].includes(type.toUpperCase()) ) {
    Notify.warning(message);
  }
}
}

export interface User {
  username: string,
  doc: string,
  email: string,
  password: string,
}



