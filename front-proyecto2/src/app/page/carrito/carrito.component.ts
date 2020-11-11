import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdenService } from 'src/app/service/orden.service';
import { UsuarioService } from 'src/app/service/usuario.service';

//SWAL
declare var swal:any;
//JQUERY
declare var $:any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito:any[] = [];
  public total:number = 0;
  public credito:number = 0;

  constructor(
    private router: Router,
    private ordenService: OrdenService,
    private usuarioService: UsuarioService
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
    this.getSingle()
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

  saveChanges() {
    if(this.credito < this.total) {
      swal({
        title: "Credito Insuficiente",
        text: "No puede realizar la compra.",
        icon: "error",
      });
      return;
    }

    let data = {
      detalle: this.carrito,
      usuario: +localStorage.getItem('currentId'),
      total: this.total,
      nombreCompleto: localStorage.getItem('currentNombre'),
      correo: localStorage.getItem('currentEmail'),
    }
    console.log(data)
    this.ordenService.create(data)
    .subscribe((res) => {
      console.log(res)
      swal({
        title: "Compra Exitosa",
        text: "Su compra se ha realizado exitosamente",
        icon: "success",
      });
    }, (error) => {
      swal({
        title: "Error",
        text: "Ha ocurrido un error. Intente mas tarde nuevamente.",
        icon: "error",
      });
    });
  }

  getSingle() {
    this.usuarioService.getSingle(+localStorage.getItem('currentId'))
    .subscribe((res) => {
      console.log(res)
      this.credito = res.credito;
    }, (error) => {
      console.log("Ha ocurrido un error.")
    });
  } 

}
