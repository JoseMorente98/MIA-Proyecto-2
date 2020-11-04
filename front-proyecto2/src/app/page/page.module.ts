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
    CarritoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    PAGES_ROUTES
  ]
})
export class PageModule { }
