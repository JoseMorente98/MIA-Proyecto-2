import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PAGES_ROUTES } from './page.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PageComponent } from './page.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ChatsComponent } from './chats/chats.component';
import { ProductosComponent } from './productos/productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ReporteComponent } from './reporte/reporte.component';

@NgModule({
  declarations: 
  [
    DashboardComponent,
    PageComponent,
    PerfilComponent,
    DenunciasComponent,
    CategoriasComponent,
    ChatsComponent,
    ProductosComponent,
    CarritoComponent,
    DetalleProductoComponent,
    ReporteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    PAGES_ROUTES,
    SimpleNotificationsModule.forRoot()
  ]
})
export class PageModule { }
