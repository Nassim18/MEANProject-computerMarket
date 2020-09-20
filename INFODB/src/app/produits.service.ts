import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProduitsService {
  produitSubject = new Subject<any []>(); //une var (sujet) qui renvoie le changement de valeur de ' produits '
  private urlBase: string = 'http://localhost:8888/';

  constructor(private http: HttpClient) { }
  


  getProduits(): Observable<any> {
    return this.http.get(this.urlBase+'produits');
  }

  getproduitsParCategorie(categorie): Observable<any>{
    return this.http.get(this.urlBase+'produits/'+categorie);
  }

  getproduitsParPrix(categorie,prixmax, prixmin): Observable<any>{
    return this.http.get(this.urlBase+'produits/'+categorie+"/"+prixmax+"/"+prixmin);
  }

  getCategories(): Observable<any> {
    return this.http.get(this.urlBase+'categories');
  }

  emitProduits(produits){
    this.produitSubject.next(produits);
  }

  getproduitsPanier(email): Observable<any> {
    return this.http.get(this.urlBase+'produitsPanier/'+email);
  }

  ajouterAuPanier(produit): Observable<any> {
    
    return this.http.post(this.urlBase+'ajouterAuPanier',  produit);  
  
  } 

  supprimerProduit(produit): Observable<any> {
    
    return this.http.post(this.urlBase+'supprimerProduit', produit);  
  
  }
  
  
}

