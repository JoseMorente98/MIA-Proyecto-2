import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MensajeService } from 'src/app/service/mensaje.service';
import { SocketService } from 'src/app/service/socket.service';
import { NotificationsService } from 'angular2-notifications';
import { Howl } from 'howler';

//SWAL
declare var swal:any;
//JQUERY
declare var $:any;

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  usuarios:any[] = [];
  mensajes:any[] = [];
  idUsuario = +localStorage.getItem('currentId')
  nombre = localStorage.getItem('currentNombre')
  picture = localStorage.getItem('currentPicture')
  formData:FormGroup;
  selectData:any;
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
  ioConnection: any;

  constructor(
    private usuarioService: UsuarioService,
    private mensajeService: MensajeService,
    private socketService: SocketService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.initIoConnection()
    this.getAllUsuarios();
    this.initializeForm(0, 0);
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((data: any) => {
        
        console.log(data);
        this.mensajes = data.data;
        if(data.usuario1 != this.idUsuario) {
          this.showNotification()
        }
      });

    this.socketService.onEvent('connect')
      .subscribe(() => {
        //console.log('Connected :D');
        this.notificationsService.success('Exito', 'El servidor se ha conectado.');
      });
      
    this.socketService.onEvent('disconnect')
      .subscribe(() => {
        //console.log('Disconnected D:');
        this.notificationsService.error('Error', 'El servidor se ha desconectado.');
      });
  }

  getAllUsuarios() {
    this.usuarioService.getAll()
    .subscribe((res) => {
      this.usuarios = [];
      this.usuarios = res;
    }, (error) => {
      console.log(error);
    })
  }

  getAllMessage(idUsuario1:number) {
    this.mensajeService.getAllMensaje(+localStorage.getItem('currentId'), idUsuario1)
    .subscribe((res) => {
      this.mensajes = [];
      console.log(res);
      this.mensajes = res;
    }, (error) => {
      console.log(error);
    })
  }

  initializeForm(idUsuario1:number, idUsuario2:number) {
    this.formData = new FormGroup({
      'usuario1': new FormControl(idUsuario1, [Validators.required]),
      'usuario2': new FormControl(idUsuario2, [Validators.required]),
      'mensaje': new FormControl('', [Validators.required])
    });
  }

  saveChanges() {
    console.log(this.formData.value)
    this.mensajeService.create(this.formData.value)
    .subscribe((res) => {
      console.log(res)
      this.getAllMessage(this.selectData.id)
      this.initializeForm(+localStorage.getItem('currentId'), this.selectData.id);
    }, (error) => {
      swal({
        title: "Error",
        text: "Ha ocurrido un error. Intente mas tarde nuevamente.",
        icon: "error",
      });
    });
  }

  seleccionarMensaje(data:any) {
    console.log(data)
    this.selectData = data;
    this.getAllMessage(data.id)
    this.initializeForm(+localStorage.getItem('currentId'), data.id);
  }

  get mensaje() { return this.formData.get('mensaje'); }


  public showNotification(): void {
		let sound = new Howl({
			src: ["../../../assets/music/iphone.mp3"],
			autoplay: true,
			onend: function() {
			  //console.log('El sonido de notificacion funciona correctamente');
			}
		});
		sound.play();
	}
}
