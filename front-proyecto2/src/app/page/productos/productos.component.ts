import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProductoService } from 'src/app/service/producto.service';
import { LikeService } from 'src/app/service/like.service';
import { UploadFileService } from 'src/app/service/upload-file.service';
import { BitacoraService } from 'src/app/service/bitacora.service';

//SWAL
declare var swal:any;
//JQUERY
declare var $:any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  public data:any[];
  public categorias:any[];
  public itemDetalle:any;
  public formData:FormGroup;
  public file: File;
  public search: string;
  public strImage: any = "";
  selectData:any;
  usuarioID:number = +localStorage.getItem('currentId');
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
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private uploadFileService: UploadFileService,
    private bitacoraService: BitacoraService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getAll()
    this.getAllProductos()
    this.initializeForm()
  }

  //INICIALIZAR FORMULARIO 
  initializeForm() {
    this.formData = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'descripcion': new FormControl('', [Validators.required]),
      'clave': new FormControl('', [Validators.required]),
      'precio': new FormControl(0, [Validators.required]),
      'picture': new FormControl('https://res.cloudinary.com/devgea-s-a/image/upload/v1594950613/Finca%20Cienaguilla/mkdr6jfwkclzdzubuuwb.png'),
      'usuario': new FormControl(+localStorage.getItem('currentId'), [Validators.required]),
      'categoria': new FormControl(0, [Validators.required]),
      'id': new FormControl(null),
    });
  }

  //GO TO ROUTE
  goToRoute(id:String) {
    this.router.navigate([id]);
  }

  onChange(deviceValue) {
    console.log(deviceValue);
    if(deviceValue == 0) {
      this.getAllProductos();
    } else {
      this.getAllProductosByCategoria(+deviceValue)
    }
  }

  onChangeASC(deviceValue) {
    console.log(deviceValue);
    if(deviceValue == 0) {
      this.getAllProductos();
    } else if (deviceValue == 'ASC') {
      this.getAllProductosASC();
    } else if (deviceValue == 'DESC') {
      this.getAllProductosDESC();
    }
  }

  getAll() {
    this.categoriaService.getAll()
    .subscribe((res) => {
      this.categorias = [];
      this.categorias = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  getAllProductos() {
    this.productoService.getAll()
    .subscribe((res) => {
      console.log(res)
      this.data = [];
      this.data = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  getAllProductosByCategoria(id:any) {
    this.productoService.getAllCategorias(id)
    .subscribe((res) => {
      this.data = [];
      this.data = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  getAllProductosASC() {
    this.productoService.getAllASC()
    .subscribe((res) => {
      this.data = [];
      this.data = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  getAllProductosDESC() {
    this.productoService.getAllDESC()
    .subscribe((res) => {
      this.data = [];
      this.data = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
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

  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.file = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal({
        title: "Seleccionar imagen",
        text: "Debe de seleccionar una imagen.",
        icon: "info",
      });
      this.file = null;
      return;
    }

    this.file = archivo;

    let reader = new FileReader();
    console.log(reader)
    let urlImagenTemp = reader.readAsDataURL( archivo );
    console.log(reader.result)
    console.log(urlImagenTemp)
    reader.onloadend = () => this.strImage = reader.result;
  }

  uploadImage() {
    this.uploadFileService.subirArchivo( this.file, 'MIA/Producto' )
    .then((res:any) => {
      this.strImage = res.secure_url;
      this.formData.get('picture').setValue(this.strImage);
      swal({
        title: "Foto cargada",
        text: "La imagen se ha subido exitosamente.",
        icon: "success",
      });
    })
    .catch((resp) => {
      swal({
        title: "Error",
        text: "Ha ocurrido un error. Intente mas tarde nuevamente.",
        icon: "error",
      });
    });
  }

  create() {
    console.log(this.formData.value)
    this.productoService.create(this.formData.value)
    .subscribe((res) => {
      console.log(res)
      $('#modalFormDataAdd').modal('hide');
      swal({
        title: "Producto Agregado",
        text: "El producto ha sido registrado exitosamente.",
        icon: "success",
      });
      this.createBitacora();
      this.getAllProductos();
      this.initializeForm();
    }, (error) => {
      swal({
        title: "Error",
        text: "Ha ocurrido un error. Intente mas tarde nuevamente.",
        icon: "error",
      });
    });
  }

  update() {
    console.log(this.formData.value)
    this.productoService.update(this.formData.value)
    .subscribe((res) => {
      $('#modalFormDataUpdate').modal('hide');
      swal({
        title: "Producto Actualizado",
        text: "El producto ha sido actualizado exitosamente.",
        icon: "success",
      });
      this.getAllProductos();
      this.initializeForm();
    }, (error) => {
      swal({
        title: "Error",
        text: "Ha ocurrido un error. Intente mas tarde nuevamente.",
        icon: "error",
      });
    });
  }

  /**
   * GET DATA
   */
  getData(item: any) {
    this.selectData = item;
    this.formData.get('nombre').setValue(item.nombre);
    this.formData.get('descripcion').setValue(item.descripcion);
    this.formData.get('picture').setValue(item.picture);
    this.formData.get('clave').setValue(item.clave);
    this.formData.get('precio').setValue(item.precio);
    this.formData.get('usuario').setValue(item.usuario);
    this.formData.get('categoria').setValue(item.categoria);
    this.formData.get('id').setValue(item.id);
    this.strImage = item.picture;
  }

  /**
   * PROPIEDADES
   */
  get nombre() { return this.formData.get('nombre'); }
  get descripcion() { return this.formData.get('descripcion'); }
  get clave() { return this.formData.get('clave'); }
  get precio() { return this.formData.get('precio'); }
  get picture() { return this.formData.get('picture'); }
  get usuario() { return this.formData.get('usuario'); }
  get categoria() { return this.formData.get('categoria'); }
  get id() { return this.formData.get('id'); }

  createBitacora() {
    let data = {
      descripcion: 'Se ha registrado un nuevo producto',
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
