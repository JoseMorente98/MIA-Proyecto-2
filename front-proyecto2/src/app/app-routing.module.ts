import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageComponent } from './page/page.component';
import { RegistroComponent } from './registro/registro.component';
import { NoPageComponent } from './shared/no-page/no-page.component';

const routes: Routes = [
  { path: 'login',
    //canActivate: [HomeGuard],
    component: LoginComponent,  
  },
  { path: 'register',
    //canActivate: [HomeGuard],
    component: RegistroComponent,  
  },
  {
    path: '',
    component: PageComponent,
    //canActivate: [ AuthGuard ],
    loadChildren: './page/page.module#PageModule'
  },
  { path: '**', component: NoPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
