import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito:any[] = [];
  public total:number = 0;

  constructor(
    private router: Router
  ) { }

  goToRoute(strRoute:String) {
    this.router.navigate([strRoute]);
  }

  ngOnInit(): void {
    this.carrito = JSON.parse(localStorage.getItem('currentCart'));
    this.carrito.forEach(element => {
      console.log(element.subtotal)
      this.total = this.total + (+element.subtotal)
    });
    console.log(this.total)
  }

}
