import { Component, OnInit } from '@angular/core';
import { BitacoraService } from 'src/app/service/bitacora.service';
import { ReporteService } from 'src/app/service/reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  bitacoras:any[] = [];
  topPublicaciones:any[] = [];
  topDenuncias:any[] = [];
  topMasCredito:any[] = [];
  topMenosCredito:any[] = [];
  megusta:any[] = [];
  nomegusta:any[] = [];
  paises:any[] = [];
  productos:any[] = [];
  carrito:any[] = [];

  constructor(
    public bitacoraService: BitacoraService,
    public reporteService: ReporteService,
  ) { }

  ngOnInit(): void {
    this.getAll()
    this.getAllPaises()
    this.getAllProductoMasVendido();
    this.getAllTopPublicacion();
    this.getAllTopDenuncia();
    this.getAllTopMasCredito();
    this.getAllTopMenosCredito();
    this.getAllTopMasMeGusta();
    this.getAllTopMasNoMeGusta();
  }

  onChangeASC(deviceValue) {
    console.log(deviceValue);
    if(deviceValue == 'ASC') {
      this.getAll()
    } else if(deviceValue == 'DESC'){
      this.getAllDESC()
    } else {
      this.getAll()
    }
  }

  getAll() {
    this.bitacoraService.getAll()
    .subscribe((res) => {
      console.log(res);
      this.bitacoras = [];
      this.bitacoras = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  getAllDESC() {
    this.bitacoraService.getAllDESC()
    .subscribe((res) => {
      console.log(res);
      this.bitacoras = [];
      this.bitacoras = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  getAllTopPublicacion() {
    this.reporteService.getAllTopPublicacion()
    .subscribe((res) => {
      console.log(res);
      this.topPublicaciones = [];
      this.topPublicaciones = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  getAllTopDenuncia() {
    this.reporteService.getAllTopDenuncias()
    .subscribe((res) => {
      console.log(res);
      this.topDenuncias = [];
      this.topDenuncias = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  getAllTopMasCredito() {
    this.reporteService.getAllTopMasCredito()
    .subscribe((res) => {
      console.log(res);
      this.topMasCredito = [];
      this.topMasCredito = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  getAllTopMenosCredito() {
    this.reporteService.getAllTopMenosCredito()
    .subscribe((res) => {
      console.log(res);
      this.topMenosCredito = [];
      this.topMenosCredito = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  getAllTopMasMeGusta() {
    this.reporteService.getAllTopMasMeGusta()
    .subscribe((res) => {
      console.log(res);
      this.megusta = [];
      this.megusta = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  getAllTopMasNoMeGusta() {
    this.reporteService.getAllTopMasNoMeGusta()
    .subscribe((res) => {
      console.log(res);
      this.nomegusta = [];
      this.nomegusta = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  getAllProductoMasVendido() {
    this.reporteService.getAllProductoMasVendido()
    .subscribe((res) => {
      console.log(res);
      this.productos = [];
      this.productos = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

  getAllPaises() {
    this.reporteService.getAllPaises()
    .subscribe((res) => {
      console.log(res);
      this.paises = [];
      this.paises = res;
    }, (error) => {
      console.log("Ha ocurrido un error, por favor intente nuevamente.")
    });
  }

}
