import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { TermsDialogComponent } from '../terms-dialog/terms-dialog.component';
import { RegisterServiceService } from 'src/app/services/register-service.service';


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

  constructor(public fb: FormBuilder, private route: ActivatedRoute, public dialog: MatDialog, public registerService: RegisterServiceService, private router: Router) { 
  
  }

  ngOnInit(): void {
    // this.router.navigate(['/register-sucess'])

    // pega o plano selecionado
    this.route.paramMap.subscribe(params => {
      let plan = params.get('plan');
      switch (plan){
        case 'individual-mensal':
          this.plamSelected = 'kickoff-BRL-Monthly'
          break;
          case 'individual-trimestral':
            this.plamSelected = 'kickoff-BRL-Every-3-months'
          break;
        case 'individual-anual':
          this.plamSelected = 'kickoff-BRL-Yearly'
        break;

        default:
          this.plamSelected = 'kickoff-BRL-Monthly'
     
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
      chargebeePlan: this.plamSelected
    }


    this.registerService.registerUser(data).then((res) => {
        this.isSending = false
        this.registerService.showNotification('success', 'Cadastro realizado com sucesso!')
        this.router.navigate(['/register-sucess'])
    }).catch((error) => {
      this.registerService.showNotification('err', error.error.message)
      this.isSending = false
    })
        
  

  }

  openTerms(){
    this.dialog.open(TermsDialogComponent)
  }


  initDownload(){
    // faz o download desse link 
   let link ='https://objectstorage.sa-saopaulo-1.oraclecloud.com/p/1LrFIO57mi66bln8D5xjJVqeIWeZbRU5TXvAitSGX6G3itfrc_nwYgiddtcb139M/n/grjuh2wxmobn/b/bucket-j2f/o/unico/unico.exe'
   this.registerService.showNotification('sucess', 'Download iniciado com sucesso')
   setTimeout(() => {
     window.open(link)
    }, 1000)
  }


}
