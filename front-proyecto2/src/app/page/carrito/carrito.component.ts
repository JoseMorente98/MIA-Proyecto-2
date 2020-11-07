import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//SWAL
declare var swal:any;

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
  }

  deleteCar(e:any) {

    swal({   
      title: "Eliminar Producto",   
      text: '¿Desea eliminar el producto del carrito?',   
      type: "warning",   
      showCancelButton: true,    
      confirmButtonText: "Aceptar",   
      cancelButtonText: "Cancelar",   
      closeOnConfirm: false,   
      closeOnCancel: false 
    })
    .then((isConfirm) => {
      if (isConfirm) {
        this.carrito.splice(this.carrito.indexOf(e),1)
        localStorage.removeItem('currentCart');
        localStorage.setItem('currentCart', JSON.stringify(this.carrito))
        this.total = 0;
        this.carrito.forEach(element => {
          console.log(element.subtotal)
          this.total = this.total + (+element.subtotal)
        });
        swal("Se ha eliminado el producto del carrito.", {
          icon: "success",
        });
      } else {}
    });
  }

}
