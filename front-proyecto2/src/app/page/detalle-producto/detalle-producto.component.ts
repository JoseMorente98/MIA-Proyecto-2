import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/service/producto.service';
import { ComentarioService } from 'src/app/service/comentario.service';
import { DenunciaService } from 'src/app/service/denuncia.service';
import { LikeService } from 'src/app/service/like.service';
import { BitacoraService } from 'src/app/service/bitacora.service';

//SWAL
declare var swal:any;
declare var $:any;

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {
  public parameter:any;
  public data:any;
  public likeData:any;
  public cantidad:number = 1;
  public formData:FormGroup;
  public comentarios:any[] = [];
  public denuncias:any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private comentarioService: ComentarioService,
    private denunciaService: DenunciaService,
    private likeService: LikeService,
    private bitacoraService: BitacoraService,
  ) { }

  ngOnInit(): void {
    this.parameter = this.activatedRoute.snapshot.paramMap.get('id');
    this.getSingle()
    this.initializeForm()
    this.getAllComentarios();
    this.getAllDenuncia()
    this.getLike()
  }

  getSingle() {
    this.productoService.getSingle(+this.parameter)
    .subscribe((res) => {
      console.log(res)
      this.data = res;
      console.log(this.data)
    }, (error) => {
      console.log("Ha ocurrido un error.")
    });
  }

  getLike() {
    this.likeService.getSingle(+localStorage.getItem('currentId'), +this.parameter)
    .subscribe((res) => {
      console.log(res)
      this.likeData = res;
    }, (error) => {
      console.log("Ha ocurrido un error.")
    });
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

    let data = {
      id: this.data.id,
      nombre: this.data.nombre,
      descripcion: this.data.descripcion,
      picture: this.data.picture,
      precio: this.data.precio,
      usuario: this.data.usuario,
      cantidad: this.cantidad,
      subtotal: this.data.precio * this.cantidad,
    }
    let cart:any[] = []
    cart = JSON.parse(localStorage.getItem('currentCart'))
    cart.push(data)
    localStorage.removeItem('currentCart')
    localStorage.setItem('currentCart', JSON.stringify(cart));
    swal({
      title: "Producto Agregado",
      text: 'Se ha ingresado el producto '+this.data.nombre+' al carrito.',
      icocomentariosn: "success",
    });
    //this.notificationsService.success('Exito', 'Se ha ingresado el producto '+this.element.titulo+' al carrito.');
  }

  //INICIALIZAR FORMULARIO 
  initializeForm() {
    this.formData = new FormGroup({
      'descripcion': new FormControl('', [Validators.required]),
      'usuario': new FormControl(+localStorage.getItem('currentId'), [Validators.required]),
      'producto': new FormControl(+this.parameter, [Validators.required]),
      'id': new FormControl(null),
    });
  }

  create() {
    console.log(this.formData.value)
    this.comentarioService.create(this.formData.value)
    .subscribe((res) => {
      console.log(res)
      $('#modalFormDataAdd').modal('hide');
      swal({
        title: "Comentario Agregado",
        text: "El comentario ha sido registrado exitosamente.",
        icon: "success",
      });
      this.createBitacoraComentario()
      this.getAllComentarios();
      this.initializeForm();
    }, (error) => {
      swal({
        title: "Error",
        text: "Ha ocurrido un error. Intente mas tarde nuevamente.",
        icon: "error",
      });
    });
  }

  createDenuncia() {
    console.log(this.formData.value)
    this.denunciaService.create(this.formData.value)
    .subscribe((res) => {
      console.log(res)
      $('#modalFormDataAddDenuncia').modal('hide');
      swal({
        title: "Denuncia Agregada",
        text: "La denuncia ha sido registrada exitosamente.",
        icon: "success",
      });
      this.createBitacoraDenuncia()
      this.getAllDenuncia();
      this.initializeForm();
    }, (error) => {
      swal({
        title: "Error",
        text: "Ha ocurrido un error. Intente mas tarde nuevamente.",
        icon: "error",
      });
    });
  }

  createLikeDislike(estado:any) {
    let data = {
      estado: estado,
      producto: this.parameter,
      usuario: +localStorage.getItem('currentId'),
    }
    this.likeService.create(data)
    .subscribe((res) => {
      console.log(res)
      swal({
        title: "Like Agregado",
        text: "Te gusta el producto :D",
        icon: "success",
      });
      this.createBitacora();
      this.getLike();
    }, (error) => {
      swal({
        title: "Error",
        text: "Ha ocurrido un error. Intente mas tarde nuevamente.",
        icon: "error",
      });
    });
  }

  getAllComentarios() {
    this.comentarioService.getAllSingle(+localStorage.getItem('currentId'), this.parameter)
    .subscribe((res) => {
      console.log(res)
      this.comentarios = [];
      this.comentarios = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  getAllDenuncia() {
    this.denunciaService.getAllSingle(+localStorage.getItem('currentId'), this.parameter)
    .subscribe((res) => {
      console.log(res)
      this.denuncias = [];
      this.denuncias = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  get descripcion() { return this.formData.get('descripcion'); }

  createBitacora() {
    let data = {
      descripcion: 'Ha reaccionado a un producto.',
      usuario: +localStorage.getItem('currentId')
    }
    this.bitacoraService.create(data)
    .subscribe((res) => {
      console.log("EXITO: Bitacora registrada")
    }, (error) => {
      console.error("ERROR: Registro bitacora")
    });
  }

  createBitacoraComentario() {
    let data = {
      descripcion: 'Ha realizado un comentario.',
      usuario: +localStorage.getItem('currentId')
    }
    this.bitacoraService.create(data)
    .subscribe((res) => {
      console.log("EXITO: Bitacora registrada")
    }, (error) => {
      console.error("ERROR: Registro bitacora")
    });
  }

  createBitacoraDenuncia() {
    let data = {
      descripcion: 'Ha realizado una denuncia.',
      usuario: +localStorage.getItem('currentId')
    }
    this.bitacoraService.create(data)
    .subscribe((res) => {
      console.log("EXITO: Bitacora registrada")
    }, (error) => {
      console.error("ERROR: Registro bitacora")
    });
  }

}
