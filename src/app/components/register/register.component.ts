import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { TermsDialogComponent } from '../terms-dialog/terms-dialog.component';

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

  constructor(public fb: FormBuilder, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    // pega o plano selecionado
    this.route.paramMap.subscribe(params => {
       this.plamSelected = params.get('plan');
      console.log('Parameter value:', this.plamSelected);
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
    
  }

  openTerms(){
    this.dialog.open(TermsDialogComponent)
    
  }

}
