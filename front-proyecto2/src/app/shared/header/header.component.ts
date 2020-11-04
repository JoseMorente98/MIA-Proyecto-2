import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  email:string;
  nombre:string;
  picture:string;

  constructor() { }

  ngOnInit(): void {
    this.email = localStorage.getItem('currentEmail');
    this.nombre = localStorage.getItem('currentNombre');
    this.picture = localStorage.getItem('currentPicture');
  }

  logOut() {
    localStorage.clear();
  }

}
