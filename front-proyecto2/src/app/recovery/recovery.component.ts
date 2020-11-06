import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';

//JQUERY
declare var $:any;
//SWAL
declare var swal:any;

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  formData:FormGroup;
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
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.parameter = this.activatedRoute.snapshot.paramMap.get('id');
    this.initializeForm();
  }

  initializeForm() {
    this.formData = new FormGroup({
      'passwordrepeat': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
      'id': new FormControl(this.parameter),
    });
  }

  recovery() {
    this.usuarioService.reset(this.formData.value)
    .subscribe((res) => {
      swal({
        title: "Contraseña actualizada",
        text: "Ingresa con tu correo "+res.email + " y tu nueva contraseña.",
        icon: "success",
      });
      this.router.navigate(['login']);
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

  get passwordrepeat() { return this.formData.get('passwordrepeat'); }
  get password() { return this.formData.get('password'); }

}
