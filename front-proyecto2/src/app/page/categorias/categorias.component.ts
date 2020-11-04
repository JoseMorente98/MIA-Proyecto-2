import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  data: any[];
  file: File;
  strImage: any = "";
  formData:FormGroup;
  formDataDelete:FormGroup;
  selectData:any;
  btnDisabled = true;
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
  notificacion:any = {
    estado: false,
    mensaje: ""
  }
  notificacionError:any = {
    estado: false,
    mensaje: ""
  }

  constructor(
    //private uploadFileService: UploadFileService,
    //private categoriaService: CategoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeFormDelete();
    this.getAll();
  }

  //GO TO ROUTE
  goToRoute(id:String) {
    this.router.navigate(['/subcategoria/'+id]);
  }

  //INICIALIZAR FORMULARIO 
  initializeForm() {
    this.formData = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'descripcion': new FormControl('', [Validators.required, Validators.maxLength(255)]),
      'imagen': new FormControl(''),
      'id': new FormControl(null),
    });
  }

  //INICIALIZAR FORMULARIO 
  initializeFormDelete() {
    this.formDataDelete = new FormGroup({
      'nombreConfirm': new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  }

  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.file = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      this.notificationError('Debe de seleccionar una imagen.')
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
    /*this.uploadFileService.subirArchivo( this.file, 'Ecommerce/Categoria' )
    .then((res:any) => {
      this.strImage = res.secure_url;
      this.notification('La imagen se ha subido exitosamente.');
    })
    .catch((resp) => {
      this.notificationError('Ha ocurrido un error.')
    });*/
  }

  create() {
    /*if(this.strImage) {
      this.formData.get('imagen').setValue(this.strImage);
    }
    this.categoriaService.create(this.formData.value)
    .subscribe((res) => {
      $('#modalFormDataAdd').modal('hide');
      this.notificationsService.success('Exito', "La categoría ha sido registrada exitosamente.");
      this.getAll();
      this.initializeForm();
    }, (error) => {
      this.notificationsService.error('Error', "Ha ocurrido un error, por favor intente nuevamente.");
    });*/
  }

  update() {
    /*if(this.strImage) {
      this.formData.get('imagen').setValue(this.strImage);
    }
    console.log(this.formData.value)
    this.categoriaService.update(this.formData.value)
    .subscribe((res) => {
      $('#modalFormDataUpdate').modal('hide');
      this.notificationsService.success('Exito', "La categoría ha sido actualizada exitosamente.");
      this.getAll();
      this.initializeForm();
    }, (error) => {
      this.notificationsService.error('Error', "Ha ocurrido un error, por favor intente nuevamente.");
    });*/
  }

  delete() {
    /*if(this.formDataDelete.get('nombreConfirm').value == this.selectData.nombre) {
      this.categoriaService.delete(this.selectData.id)
      .subscribe((res) => {
        $('#modalFormDataDelete').modal('hide');
        this.notificationsService.success('Exito', "La categoría ha sido eliminada exitosamente.");
        this.getAll();
        this.initializeFormDelete();
      }, (error) => {
        this.notificationError('Ha ocurrido un error, por favor intente nuevamente.')
      });
    } else {
      this.notificationError('Los nombres no coinciden, no se puede eliminar.')
    }*/
  }

  getAll() {
    /*this.categoriaService.getAll()
    .subscribe((res) => {
      this.data = res;
    }, (error) => {
      this.notificationsService.error('Error', "Ha ocurrido un error, por favor intente nuevamente.");
    });*/
  }

  /**
   * PROPIEDADES
   */
  get nombre() { return this.formData.get('nombre'); }
  get nombreConfirm() { return this.formDataDelete.get('nombreConfirm'); }
  get descripcion() { return this.formData.get('descripcion'); }
  get imagen() { return this.formData.get('imagen'); }
  get id() { return this.formData.get('id'); }

  /**
   * GET DATA
   */
  getData(item: any) {
    this.selectData = item;
    this.formData.get('nombre').setValue(item.nombre);
    this.formData.get('descripcion').setValue(item.descripcion);
    this.formData.get('imagen').setValue(item.imagen);
    this.formData.get('id').setValue(item.id);
    this.strImage = item.imagen;
  }

  /**
   * NOTIFICACION 
   */
  notification(msj:String) {
    this.notificacion.mensaje = msj;
    this.notificacion.estado = true;
    setTimeout(() => {
        this.notificacion.mensaje = '';
        this.notificacion.estado = '';
    }, 2500);
  }

  notificationError(msj:String) {
    this.notificacionError.mensaje = msj;
    this.notificacionError.estado = true;
    setTimeout(() => {
        this.notificacionError.mensaje = '';
        this.notificacionError.estado = '';
    }, 2500);
  }

}
