import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private user: Observable<string>;
  
  constructor(private auThService: AuthentificationService,
    private router: Router) {

     this.user = this.auThService.getUser();

     }

  ngOnInit() {

    this.router.navigate(['/menu']);
  
  }

  deconnexion(){

    this.auThService.disconnect();
    this.router.navigate(['/membres/connexion']);


  }

}
