import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  private user: Observable<string>;
  userToSend = {
    'nom' : '',
    'prenom' : '',
    'email' : '',
    'password' : '',
    'sexe' : ''
  };
  
  constructor(private auThService: AuthentificationService,
    private router: Router) {

     this.user = this.auThService.getUser();

     }

  ngOnInit() {

    this.router.navigate(['/inscription']);
  
  }

  updateNom(value){
    this.userToSend["nom"] = value;
    console.log(this.user["nom"]);
  }

  updatePrenom(value){
    this.userToSend["prenom"] = value;
    console.log(this.user["prenom"]);
  }

  updateEmail(value){
    this.userToSend["email"] = value;
    console.log(this.user["email"]);
  }

  updatePassword(value){
    this.userToSend["password"] = value;
    console.log(this.user["password"]);
  }
  updateSexe(value){
    this.userToSend["sexe"] = value;
    console.log(this.user["sexe"]);
  }

  Inscription(){
    console.log("user sent : " + JSON.stringify(this.userToSend));
   this.auThService.Inscription(this.userToSend).subscribe(data=>{

     console.log(data);

    })

  }

}
