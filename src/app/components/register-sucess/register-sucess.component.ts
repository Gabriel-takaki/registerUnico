import { Component, OnInit } from '@angular/core';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-register-sucess',
  templateUrl: './register-sucess.component.html',
  styleUrls: ['./register-sucess.component.css']
})
export class RegisterSucessComponent implements OnInit {

  constructor(public registerService: RegisterServiceService) { }

  ngOnInit(): void {
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
