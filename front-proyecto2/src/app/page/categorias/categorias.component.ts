import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadFileService } from 'src/app/service/upload-file.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { BitacoraService } from 'src/app/service/bitacora.service';

//SWAL
declare var swal:any;
//JQUERY
declare var $:any;

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

  constructor(
    private uploadFileService: UploadFileService,
    private categoriaService: CategoriaService,
    private bitacoraService: BitacoraService,
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
      'picture': new FormControl('https://res.cloudinary.com/devgea-s-a/image/upload/v1594950613/Finca%20Cienaguilla/mkdr6jfwkclzdzubuuwb.png'),
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
    this.uploadFileService.subirArchivo( this.file, 'MIA/Categoria' )
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
    this.categoriaService.create(this.formData.value)
    .subscribe((res) => {
      console.log(res)
      $('#modalFormDataAdd').modal('hide');
      swal({
        title: "Categoria Agregada",
        text: "La categoría ha sido registrada exitosamente.",
        icon: "success",
      });
      this.createBitacora();
      this.getAll();
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
    this.categoriaService.update(this.formData.value)
    .subscribe((res) => {
      $('#modalFormDataUpdate').modal('hide');
      swal({
        title: "Categoria Actualizada",
        text: "La categoría ha sido actualizada exitosamente.",
        icon: "success",
      });
      this.updateBitacora()
      this.getAll();
      this.initializeForm();
    }, (error) => {
      swal({
        title: "Error",
        text: "Ha ocurrido un error. Intente mas tarde nuevamente.",
        icon: "error",
      });
    });
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
    this.categoriaService.getAll()
    .subscribe((res) => {
      this.data = [];
      this.data = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  /**
   * PROPIEDADES
   */
  get nombre() { return this.formData.get('nombre'); }
  get nombreConfirm() { return this.formDataDelete.get('nombreConfirm'); }
  get descripcion() { return this.formData.get('descripcion'); }
  get picture() { return this.formData.get('picture'); }
  get id() { return this.formData.get('id'); }

  /**
   * GET DATA
   */
  getData(item: any) {
    this.selectData = item;
    this.formData.get('nombre').setValue(item.nombre);
    this.formData.get('descripcion').setValue(item.descripcion);
    this.formData.get('picture').setValue(item.picture);
    this.formData.get('id').setValue(item.id);
    this.strImage = item.picture;
  }

  createBitacora() {
    let data = {
      descripcion: 'Se ha agregado una categoria.',
      usuario: +localStorage.getItem('currentId')
    }
    this.bitacoraService.create(data)
    .subscribe((res) => {
      console.log("EXITO: Bitacora registrada")
    }, (error) => {
      console.error("ERROR: Registro bitacora")
    });
  }

  updateBitacora() {
    let data = {
      descripcion: 'Se ha actualizado una categoria.',
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
