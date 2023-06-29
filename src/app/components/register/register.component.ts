import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  plamSelected: string | null = ''
  registerForms!: FormGroup
  confirmTerms: boolean = false
  hidePassword : boolean = true
  hideConfirmPassword : boolean = true

  constructor(public fb: FormBuilder, private route: ActivatedRoute) { }

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
    this.registerForms = this.fb.group({
      username: ['', Validators.required, Validators.minLength(3)],
      doc: ['', Validators.required, Validators.minLength(11)],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6)],
      confirmPassword: ['', Validators.required, Validators.minLength(6)],
      confirmTerms: [false, Validators.required]
  })
}

  hide(p: string){
    p == 'pass' ? this.hidePassword = !this.hidePassword : this.hideConfirmPassword = !this.hideConfirmPassword
  }

  onSubmit(){
  }

}
