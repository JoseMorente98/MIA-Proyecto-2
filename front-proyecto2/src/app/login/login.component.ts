import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';

//JQUERY
declare var $:any;
//SWAL
declare var swal:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData:FormGroup;
  formRecovery:FormGroup;
  parameter:any;
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
    private router: Router,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.parameter = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.parameter) {
      console.log(this.parameter)
      this.activar()
    }
    this.initializeForm();
    this.initializeFormRecovery();
    $("#recoverform").slideUp();
    $("#loginform").fadeIn();
  }

  initializeForm() {
    this.formData = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
  }

  initializeFormRecovery() {
    this.formRecovery = new FormGroup({
      'email': new FormControl('', [Validators.required])
    });
  }

  logIn() {
    this.usuarioService.auth(this.formData.value)
    .subscribe((res) => {
      console.log(res)

      if(res.activo == "Inactivo") {
        swal({
          title: "Advertencia",
          text: "Tu usuario no ha sido activado.",
          icon: "warning",
        });
      } else {
        swal({
          title: "Bienvenido",
          text: "Bienvenido a Marketplace.",
          icon: "success",
        });
      }
      localStorage.setItem("currentId", res.id);
      localStorage.setItem("currentAuth", res.rol);
      localStorage.setItem("currentCart", '[]');
      localStorage.setItem("currentPicture", res.picture);
      localStorage.setItem("currentEmail", res.email);
      localStorage.setItem("currentNombre", res.nombre + " " + res.apellido);
      this.router.navigate(['dashboard']);
    }, (err) => {
      swal({
        title: "Error",
        text: "El correo o contraseña son incorrectos.",
        icon: "error",
      });
    });
  }

  recovery() {
    this.usuarioService.recovery(this.formRecovery.value)
    .subscribe((res) => {
      console.log(res)
      swal({
        title: "Correo Enviado",
        text: "Hemos enviado un correo a: "+res.email,
        icon: "success",
      });
    }, (err) => {
      swal({
        title: "Error",
        text: "No se ha encontrado el correo registrado.",
        icon: "error",
      });
    });
  }

  activar() {
    let data = {
      email: this.parameter
    }
    this.usuarioService.activar(data)
    .subscribe((res) => {
      console.log(res)
      swal({
        title: "Cuenta activa",
        text: "Hemos activado tu cuenta exitosamente.",
        icon: "success",
      });
    }, (err) => {
      swal({
        title: "Error",
        text: "Ha ocurrido un error. Intente mas tarde nuevamente.",
        icon: "error",
      });
    });
  }

  openRecovery = () => {
    $("#loginform").slideUp();
    $("#recoverform").fadeIn();
  }
  
  iniciarSesion= () => {
    $("#recoverform").slideUp();
    $("#loginform").fadeIn();
  }

  get email() { return this.formData.get('email'); }
  get correo() { return this.formRecovery.get('email'); }
  get password() { return this.formData.get('password'); }

}
