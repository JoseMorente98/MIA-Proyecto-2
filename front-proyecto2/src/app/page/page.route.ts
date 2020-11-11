import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ChatsComponent } from './chats/chats.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProductosComponent } from './productos/productos.component';
import { ReporteComponent } from './reporte/reporte.component';

const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        //canActivate: [ VerificaTokenGuard ],
        data: { titulo: 'Dashboard' }
    },
    { path: 'perfil', component: PerfilComponent },
    { path: 'denuncias', component: DenunciasComponent },
    { path: 'categorias', component: CategoriasComponent },
    { path: 'chats', component: ChatsComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'producto/:id', component: DetalleProductoComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'reportes', component: ReporteComponent },
    
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
