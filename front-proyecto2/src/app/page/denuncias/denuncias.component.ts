import { Component, OnInit } from '@angular/core';
import { DenunciaService } from 'src/app/service/denuncia.service';

//SWAL
declare var swal:any;

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.scss']
})
export class DenunciasComponent implements OnInit {
  public data:any[] = [];

  constructor(
    public denunciaService: DenunciaService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.denunciaService.getAll()
    .subscribe((res) => {
      console.log(res)
      this.data = [];
      this.data = res;
      console.log(this.data)
    }, (error) => {
      console.log("Ha ocurrido un error.")
    });
  }

  bloquear(id:any, producto:any, productoNombre:any, correo: any, nombre: any, apellido:any) {
    let data = {
      id: id,
      producto: producto,
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      productoNombre: productoNombre,
    }
    this.denunciaService.bloquear(data)
    .subscribe((res) => {
      console.log(res)
      swal({
        title: "Producto Bloqueado",
        text: "El producto ha sido bloqueado exitosamente.",
        icon: "success",
      });
      this.getAll();
    }, (error) => {
      swal({
        title: "Error",
        text: "Ha ocurrido un error. Intente mas tarde nuevamente.",
        icon: "error",
      });
    });
  }

}
