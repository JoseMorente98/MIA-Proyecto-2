import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  public data:any[];
  public itemDetalle:any;
  public element:any = {
    id: 0,
    id_productos: 0,
    precio: 0,
    imagen: 0,
    titulo: 0,
    descripcion: 0,
    cantidad: 1,
    subtotal: 0
  }
  public cantidad:number = 1;
  options = {
    position: ["bottom", "right"],
    timeOut: 2000,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    lastOnBottom: false,
    preventDuplicates: true,
    animate: "scale",
    maxLength: 400
  };

  constructor(
    //private productoService: ProductosService,
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll = () => {
    /*this.productoService.getAll()
    .subscribe((res)=>{
      //console.log(res)
      this.data = [];
      this.data = res;
    }, (error) => {
      this.notificationsService.error('Error', 'Ha ocurrido un error. Intentélo más tarde.');
    });*/
  }

  getItem(strDetalle:string) {
    console.log(strDetalle)
    this.itemDetalle = strDetalle;
  }

  sumarCantidad() {
    this.cantidad = this.cantidad + 1;
  }

  restarCantidad() {
    if(this.cantidad > 1) {
      this.cantidad = this.cantidad - 1;
    }
  }


  agregarCarrito()  {
    this.element = this.itemDetalle;
    this.element.cantidad = this.cantidad;
    this.element.subtotal = this.cantidad * this.element.precio;
    console.log(this.element)
    let cart:any[] = []
    cart = JSON.parse(localStorage.getItem('currentCart'))
    cart.push(this.element)
    localStorage.removeItem('currentCart')
    localStorage.setItem('currentCart', JSON.stringify(cart));
    //this.notificationsService.success('Exito', 'Se ha ingresado el producto '+this.element.titulo+' al carrito.');
  }
}
