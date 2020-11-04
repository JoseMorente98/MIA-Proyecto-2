import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NoPageComponent } from './no-page/no-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent, 
    NoPageComponent, 
    SidebarComponent
  ],
  exports: [
    HeaderComponent, 
    NoPageComponent, 
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
