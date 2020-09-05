import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProduitsComponent } from './produits/produits.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ImageComponent } from './image/image.component';
import { PanierComponent } from './panier/panier.component';
import { InscriptionComponent } from './inscription/inscription.component';



const routes: Routes = [

  {
    path: 'home',
    component: ImageComponent
  },
 {
   path: 'membres/connexion',
   component: ConnexionComponent
 },
 {
  path: 'inscription',
  component: InscriptionComponent
},
 {
   path: 'categorie',
   component: CategoriesComponent
 },
 {
  path: 'menu',
  component: MenuComponent
},
 {
  path: 'produits/:categorie',
  component: ProduitsComponent
 },
 {
  path: 'produits',
  component: ProduitsComponent
 },
  {
  path: 'panier',
  component: PanierComponent
 },
 {
  path: 'image',
  component: ImageComponent
 },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
