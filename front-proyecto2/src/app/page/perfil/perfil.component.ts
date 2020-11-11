import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UploadFileService } from 'src/app/service/upload-file.service';
import { BitacoraService } from 'src/app/service/bitacora.service';

//SWAL
declare var swal:any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  formData:FormGroup;
  formReset:FormGroup;
  data:any;
  file: File;
  strImage: any = "";
  selectData:any;

  constructor(
    private usuarioService: UsuarioService,
    private uploadFileService: UploadFileService,
    private bitacoraService: BitacoraService,
  ) { }

  ngOnInit(): void {
    this.initializeForm()
    this.initializeFormReset()
    this.getSingle();
  }

  //INICIALIZAR FORMULARIO 
  initializeForm() {
    this.formData = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'apellido': new FormControl('', [Validators.required]),
      'email': new FormControl(''),
      'picture': new FormControl(''),
      'fecha': new FormControl(''),
      'credito': new FormControl(''),
      'id': new FormControl(null),
    });
  }

  initializeFormReset() {
    this.formReset = new FormGroup({
      'passwordrepeat': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
      'id': new FormControl(+localStorage.getItem('currentId')),
    });
  }

  getSingle() {
    this.usuarioService.getSingle(+localStorage.getItem('currentId'))
    .subscribe((res) => {
      console.log(res)
      this.data = res;
      this.formData.get('nombre').setValue(res.nombre);
      this.formData.get('apellido').setValue(res.apellido);
      this.formData.get('email').setValue(res.email);
      this.formData.get('picture').setValue(res.picture);
      this.formData.get('fecha').setValue(res.fecha.split("T")[0]);
      this.formData.get('credito').setValue(res.credito);
      this.formData.get('id').setValue(res.id);
    }, (error) => {
      console.log("Ha ocurrido un error.")
    });
  }

  saveChanges() {
    this.usuarioService.update(this.formData.value)
    .subscribe((res) => {
      swal({
        title: "Usuario Actualizado",
        text: "Su usuario ha sido actualizado exitosamente.",
        icon: "success",
      });
      this.createBitacora();
      localStorage.setItem("currentPicture", this.formData.value.picture);
      localStorage.setItem("currentEmail", this.formData.value.email);
      localStorage.setItem("currentNombre", this.formData.value.nombre + " " + this.formData.value.apellido);
      this.getSingle()
    }, (err) => {
      swal({
        title: "Error",
        text: "Ha ocurrido un error. Intente mas tarde nuevamente.",
        icon: "error",
      });
    });
  }

  recovery() {
    this.usuarioService.reset(this.formReset.value)
    .subscribe((res) => {
      swal({
        title: "Contraseña actualizada",
        text: "Ingresa con tu correo "+res.email + " y tu nueva contraseña.",
        icon: "success",
      });
      this.updateBitacora();
      this.initializeFormReset()
    }, (err) => {
      swal({
        title: "Error",
        text: "Ha ocurrido un error. Intente mas tarde nuevamente.",
        icon: "error",
      });
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
    this.uploadImage()
  }

  uploadImage() {
    this.uploadFileService.subirArchivo( this.file, 'MIA/Perfil' )
    .then((res:any) => {
      this.strImage = res.secure_url;
      this.formData.get('picture').setValue(res.secure_url);

      swal({
        title: "Foto Actualizada",
        text: "Su foto ha sido actualizada exitosamente.",
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

  createBitacora() {
    let data = {
      descripcion: 'Se ha actualizado tu perfil.',
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
      descripcion: 'Se ha actualizado tu contrasena.',
      usuario: +localStorage.getItem('currentId')
    }
    this.bitacoraService.create(data)
    .subscribe((res) => {
      console.log("EXITO: Bitacora registrada")
    }, (error) => {
      console.error("ERROR: Registro bitacora")
    });
  }

  get nombre() { return this.formData.get('nombre'); }
  get apellido() { return this.formData.get('apellido'); }
  get email() { return this.formData.get('email'); }
  get picture() { return this.formData.get('picture'); }
  get fecha() { return this.formData.get('fecha'); }
  get credito() { return this.formData.get('credito'); }
  get id() { return this.formData.get('id'); }
  get passwordrepeat() { return this.formReset.get('passwordrepeat'); }
  get password() { return this.formReset.get('password'); }
}
