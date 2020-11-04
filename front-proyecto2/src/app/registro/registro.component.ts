import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
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
      'nombre': new FormControl('', [Validators.required]),
      'apellido': new FormControl('', [Validators.required]),
      'pais': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
      'fecha': new FormControl('', [Validators.required]),
      'estado': new FormControl('2'),
      'id_usuarios_tipos': new FormControl('2'),
      'descripcion': new FormControl('Cliente'),
      'fechahora':new FormControl(Date.now()), 
    });
  }

  registro() {
    console.log(this.formData.value)
    /*this.usuarioService.create(this.formData.value)
    .subscribe((res) => {
      console.log(res)
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 1000);
    }, (err) => {
      //console.log(err);
    });*/
  }

  get nombre() { return this.formData.get('nombre'); }
  get apellido() { return this.formData.get('apellido'); }
  get pais() { return this.formData.get('pais'); }
  get email() { return this.formData.get('email'); }
  get password() { return this.formData.get('password'); }
  get fecha() { return this.formData.get('fecha'); }

}
