import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProduitsService } from '../produits.service';
import { AuthentificationService } from '../authentification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})

export class ProduitsComponent implements OnInit {

  private produits: Object[] = new Array();
  user;
  isConnected = false;

  produitAEnvoyer = {
    "email":"",
    "img" :"",
    "nom" :"",
    "marque" : "",
    "prix" : "",
    "quantite" :""
  };

  constructor(
    private route: ActivatedRoute,
    private produitsService: ProduitsService,
    private AuthService : AuthentificationService) {
    
      }
  
  ajouterAuPanier(img, nom, marque, prix){
   

    this.produitAEnvoyer.email = this.user;
    this.produitAEnvoyer.img = img;
    this.produitAEnvoyer.nom = nom;
    this.produitAEnvoyer.marque = marque;
    this.produitAEnvoyer.prix = prix;

    console.log(this.produitAEnvoyer);
    this.produitsService.ajouterAuPanier(this.produitAEnvoyer).subscribe(data => {
      console.log(data);
    })
  }

  updateQuantite(value){
    this.produitAEnvoyer["quantite"] = value;
    console.log("quantite :"+this.produitAEnvoyer.quantite);
  }


  ngOnInit() {

    this.produitsService.getProduits().subscribe(produits =>{
    
      this.produits = produits;
      

      for (const p of this.produits) {
        this.produits.sort();
        console.log(JSON.stringify(p));
      }
  });


  this.AuthService.getUser().subscribe(data =>{
    console.log(data);
    this.user = data;
    if ( this.user ){ this.isConnected = true;}
    else { this.isConnected = false;}
    console.log("est connecté : " + this.isConnected+" email :"+this.user);

});

  
  }
}
