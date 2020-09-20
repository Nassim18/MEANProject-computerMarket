import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';
import { AuthentificationService } from './authentification.service';

import { ProduitsService } from './produits.service';
import { CategoriesComponent } from './categories/categories.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { MenuComponent } from './menu/menu.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { FiltreComponent } from './filtre/filtre.component';
import { HomeComponent } from './home/home.component';
import { PanierComponent } from './panier/panier.component';



@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    CategoriesComponent,
    ConnexionComponent,
    MenuComponent,
    FiltreComponent,
    HomeComponent,
    InscriptionComponent,
    PanierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule
  
  ],
  providers: [ProduitsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
