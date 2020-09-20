import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  
  private utilisateur =   {"email":"", "password":""};
  private message : string = "";
  isConnect = false;

  constructor(private authService: AuthentificationService, private router: Router, private http:HttpClient) {

    
   }

  onSubmit() {
   

    this.authService.verificationConnexion(this.utilisateur).subscribe(reponse =>{
      this.message = reponse['message'];
      console.log("message recu : " + this.message);
      if (this.message.localeCompare("Authentification réussie") == 0 ){
        this.authService.connect(this.utilisateur.email);
        this.router.navigate(['/menu']);
        this.isConnect = true;

      }
      else { 
        
      }
   
    });
  }

}
