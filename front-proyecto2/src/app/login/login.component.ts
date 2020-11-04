import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData:FormGroup;
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.formData = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
  }

  logIn() {
    /*this.authService.auth(data)
    .subscribe((res) => {
      //console.log(res)
      localStorage.setItem("currentId", res.taxis_usuarios_id);
      localStorage.setItem("currentEmail", res.taxis_usuarios_email);
      localStorage.setItem("currentNombre", res.taxis_usuarios_nombre);
      localStorage.setItem("currentPicture", res.taxis_img);
      localStorage.setItem("currentAuth", 'Admin');
      this.getSingle(res.taxis_usuarios_id);
      this.notificationsService.success('Exito', 'Sesion iniciada, bienvenido.');
      this.router.navigate(['dashboard']);
    }, (err) => {
      //this.notificationsService.error('Error', 'El correo o contraseña son incorrectos.');
      //console.log(err);
        this.usuarioService.login(this.formData.value)
        .subscribe((res) => {
          //console.log(res)
          localStorage.setItem("currentId", res.id);
          localStorage.setItem("currentEmail", this.formData.value.email);
          localStorage.setItem("currentNombre", res.nombre);
          localStorage.setItem("currentApellido", res.apellido);
          localStorage.setItem("currentAuth", 'User');
          localStorage.setItem('currentCart', JSON.stringify([]));
          this.notificationsService.success('Exito', 'Sesion iniciada, bienvenido.');
          this.router.navigate(['ubicacion']);
        }, (err) => {
          this.notificationsService.error('Error', 'El correo o contraseña son incorrectos.');
          //console.log(err);
        });
    });*/
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
  get password() { return this.formData.get('password'); }

}
