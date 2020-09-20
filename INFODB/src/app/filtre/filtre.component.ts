import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitsService } from '../produits.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css']
})
export class FiltreComponent implements OnInit {

  private prix: number[] = new Array();
  private produits: Object[] = new Array();
  private produitsNew: Object[] = new Array();
  private prixmin ="*";
  private prixmax ="*";
  private categorie= [];
  private CategorieSelectione ="*";

  constructor(
    private router: Router,
    private produitsService: ProduitsService) {
    
      }

  ngOnInit() {

    this.produitsService.getProduits().subscribe(produits =>{

      this.produits = produits;

      for (const p of this.produits) {
        if ( !this.prix.includes(parseFloat((p["prix"]) ))){
        this.prix.push(parseFloat(p["prix"]));
        this.prix.sort(function(a,b) {return a-b;});
        }
        if ( !this.categorie.includes((p["type"]) )){
        this.categorie.push(p["type"]);
        this.categorie.sort();
        }
        console.log(p['prix']);
        
      }
  
      console.table(this.prix);

  });
  }
  updatePrixMin(value){
    this.prixmin = value;
    console.log(this.prixmin);
  }
  updatePrixMax(value){
    this.prixmax = value;
    console.log(this.prixmax);
  }
  updateCategorie(value){
    this.CategorieSelectione = value;
    console.log(this.CategorieSelectione)
  }
  produitsParPrix(categorie, prixmax, prixmin){
    console.log("send : " + categorie + ",  " + prixmax, + ", " + prixmin);
    this.produitsService.getproduitsParPrix(categorie, prixmax, prixmin).subscribe(data => {
      console.log("received : " + JSON.stringify(data));
      this.produitsNew = [];
      this.produitsNew = data;
      this.produitsService.emitProduits(this.produitsNew);
      console.log("new produits : " + this.produits);
    });
   }

}
