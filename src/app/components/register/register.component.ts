import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { TermsDialogComponent } from '../terms-dialog/terms-dialog.component';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import {Loading} from 'notiflix/build/notiflix-loading-aio';
import {Block} from 'notiflix/build/notiflix-block-aio';
import {Report} from 'notiflix/build/notiflix-report-aio';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  plamSelected: string | null = ''
  confirmTerms: boolean = false
  hidePassword : boolean = true
  hideConfirmPassword : boolean = true
  isSending: boolean = false

  constructor(public fb: FormBuilder, private route: ActivatedRoute, public dialog: MatDialog, public registerService: RegisterServiceService) { 
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

  ngOnInit(): void {
    // pega o plano selecionado
    this.route.paramMap.subscribe(params => {
      let plan = params.get('plan');
      switch (plan){
        case 'individual-mensal':
          this.plamSelected = 'kickoff-BRL-Monthly'
          break;
          case 'inidivual-trimestral':
            this.plamSelected = 'kickoff-BRL-Every-3-months'
          break;
        case 'individual-anual':
          this.plamSelected = 'kickoff-BRL-Yearly'
        break;
     
      }

    });

    // cria o formulário
    this.createForms()
  }

  createForms(){
    
}

registerForms: FormGroup = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  doc: ['', [Validators.required, Validators.minLength(10)]],
  email: ['',  [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.pattern
    ("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9@#$]{6,50}$")]],
  confirmPassword: ['', [Validators.required, Validators.pattern
  ("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9@#$]{6,50}$")]],
  confirmTerms: [false, Validators.requiredTrue],
})


  hide(p: string){
    p == 'pass' ? this.hidePassword = !this.hidePassword : this.hideConfirmPassword = !this.hideConfirmPassword
  }

  onSubmit(){
    this.isSending = true
    let data = {
      fullName: this.registerForms.value.name,
      doc: this.registerForms.value.doc,
      email: this.registerForms.value.email,
      password: this.registerForms.value.password,
    }

    this.registerService.registerUser(data).then((res) => {

    })
  }

  openTerms(){
    this.dialog.open(TermsDialogComponent)
    
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
