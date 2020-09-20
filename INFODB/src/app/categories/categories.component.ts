import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitsService } from '../produits.service';
import { AuthentificationService } from '../authentification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private categories: String[] = new Array();
  private produits: Object[] = new Array();
  private produitsfiltre: Object[] = new Array();
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
    private router: Router,
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
    this.produitsService.getCategories().subscribe(categories =>{
      this.produitsService.produitSubject.subscribe(
        (produitsInfos : any[]) =>{
          this.produits = [];
          console.log("PRODUIT INFO " + JSON.stringify(produitsInfos));
         for (let index = 0; index < produitsInfos.length; index++) {
           this.produits.push(produitsInfos[index]);
           
         }
        }
      )  
      this.categories = categories;
  });
  
  this.AuthService.getUser().subscribe(data =>{
    console.log(data);
    this.user = data;
    if ( this.user ){ this.isConnected = true;}
    else { this.isConnected = false;}
    console.log("est connecté : " + this.isConnected+" email :"+this.user);

});
  


}

  produitsParCategorie(categorie){
   this.produitsService.getproduitsParCategorie(categorie).subscribe(data => {
     console.log("received : " + JSON.stringify(data));
     this.produits = data;
     console.log("produit : " + this.produits);
   });
  }



}
