import OracleConnection from "../oracle/oracle";

export default class SocketServer {
    private static _instance: SocketServer;
    private io:any;

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    constructor() {}

    public listenServer(socket:any) {
        this.io = socket;
        this.io.on('connection', (client:any) => {
            console.log("Usuario conectado :D");

            client.emit('enviarMensaje', {
                usuario: 'Administrador',
                mensaje: 'Bienvenido a la aplicación'
            })

            client.on('disconnect', () => {
                console.log("Cliente desconectado D:");
            })

            //LISTEN CLIENT
            client.on('enviarMensaje', (data:any, callback:any)=> {
                console.log(data);

                client.broadcast.emit('enviarMensaje', data)
            })
        })
    }

    public send() {
        this.io.emit('enviarMensaje', {
            saludar: 'Hola a BRODCAST'
        });
    }


    public async sendMessage(usuario:any, usuario2:any) {
        let body = {
            id : usuario,
            id2 : usuario2,
        }

        const query = `
            SELECT MENSAJE.usuario1, MENSAJE.usuario2, MENSAJE.id, MENSAJE.mensaje, MENSAJE.fecha FROM MENSAJE
            WHERE usuario1 = ${body.id} AND usuario2 = ${body.id2}
            UNION 
            SELECT MENSAJE.usuario1, MENSAJE.usuario2, MENSAJE.id, MENSAJE.mensaje, MENSAJE.fecha FROM MENSAJE
            WHERE usuario1 = ${body.id2} AND usuario2 = ${body.id}
            ORDER BY id
        `;
        let result:any = await OracleConnection.selectQuery(query);
        console.log(result)
        let data:any[] = [];
        if(result) {
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "usuario1": element[0],
                    "usuario2": element[1],
                    "id": element[2],
                    "mensaje": element[3],
                    "hora": element[4],
                }
                data.push(dataSchema);
            });
        }

        this.io.emit('enviarMensaje', {
            status: 200,
            ok: true,
            data: data,
            usuario1: usuario,
            usuario2: usuario2,
        });
    }


}