import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

import { ProduitsService } from '../produits.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user;
  isConnected = false;
  private panier: [];
  size = 0;

  constructor(private AuthService : AuthentificationService,
    private produitsService: ProduitsService) { }


    getSize(){
      //this.ngOnInit();
      console.log(this.panier.length);
      return this.size;
      
    }


  ngOnInit() {  
    this.AuthService.getUser().subscribe(data =>{


      this.AuthService.getUser().subscribe(data =>{
        console.log(data);
        this.user = data;
        if ( this.user ){ this.isConnected = true;}
        else { this.isConnected = false;}
        console.log("est connecté : " + this.isConnected );
        this.produitsService.getproduitsPanier(this.user).subscribe(data => {
         // console.log("received : " + JSON.stringify(data));
          this.panier = data;
          this.size = this.panier.length; 
          console.log("produits : " + this.panier);
        });
      
    });
 

  
  });


  }



}
