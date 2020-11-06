import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { PaisService } from '../service/pais.service';

//SWAL
declare var swal:any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  formData:FormGroup;
  idPais:any;
  data:any[] = [];

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private paisService: PaisService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getAll()
  }

  initializeForm() {
    this.formData = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'apellido': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
      'fecha': new FormControl('', [Validators.required]),
      'picture': new FormControl('https://res.cloudinary.com/devgea-s-a/image/upload/v1594950613/Finca%20Cienaguilla/mkdr6jfwkclzdzubuuwb.png'),
      'rol': new FormControl('Cliente'),
      'credito': new FormControl(10000),
      'activo': new FormControl("Inactivo"),
      'pais': new FormControl(0),

    });
  }

  registro() {
    console.log(this.formData.value)
    this.usuarioService.create(this.formData.value)
    .subscribe((res) => {
      swal({
        title: "Usuario Agregado",
        text: "El usuario se ha creado exitosamente",
        icon: "success"
      });
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 1000);
    }, (err) => {
      //console.log(err);
    });
    
  }

  getAll() {
    this.paisService.getAll()
    .subscribe((res) => {
      this.data = res;
    }, (error) => {
      console.error("Ha ocurrido un error, por favor intente nuevamente.");      
    });
  }

  get nombre() { return this.formData.get('nombre'); }
  get apellido() { return this.formData.get('apellido'); }
  get pais() { return this.formData.get('pais'); }
  get email() { return this.formData.get('email'); }
  get password() { return this.formData.get('password'); }
  get fecha() { return this.formData.get('fecha'); }

}
