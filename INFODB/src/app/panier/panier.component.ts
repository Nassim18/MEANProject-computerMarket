import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProduitsService } from '../produits.service';
import { AuthentificationService } from '../authentification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})

export class PanierComponent implements OnInit {

  private produits: Object[] = new Array();
  private panier: [];
  user;
  isConnected = false;

  produitASupprimer = {
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
    private AuthService: AuthentificationService) {
    
      }

  supprimerProduit(img, nom, marque, prix){
   
    this.produitASupprimer.email = this.user;
    this.produitASupprimer.img = img;
    this.produitASupprimer.nom = nom;
    this.produitASupprimer.marque = marque;
    this.produitASupprimer.prix = prix;

    console.log(this.produitASupprimer);
    this.produitsService.supprimerProduit(this.produitASupprimer).subscribe(data => {
      console.log(data);
      this.panier = data;
    })
    this.produitsService.removeCount(); 
  }

  getTotal(panier){
    let total = 0;
    for (var i = 0; i < this.panier.length; i++) {
    total += this.panier[i]["prix"]*this.panier[i]["quantite"] ;
       }
    console.log("Le prix total est : "+total);
    return total
  }

  getSize(){
    console.log(this.panier.length);
    return this.panier.length;
  }

  ngOnInit() {

    this.AuthService.getUser().subscribe(data =>{
      console.log(data);
      this.user = data;
      this.produitsService.getproduitsPanier(this.user).subscribe(data => {
       // console.log("received : " + JSON.stringify(data));
        this.panier = data;
        console.log("produits : " + this.panier);
      });
  
  });

    this.produitsService.getProduits().subscribe(produits =>{
    
      this.produits = produits;
      
      for (const p of this.produits) {
        this.produits.sort();
        console.log(JSON.stringify(p));
      }
  });
}



}
