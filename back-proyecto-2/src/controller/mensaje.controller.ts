import { query, Response } from 'express';
import OracleConnection from '../oracle/oracle';
import SocketServer from '../socket/socket';

export default class MensajeController {
    private static _instance: MensajeController;

    constructor(
    ) {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = async (req: any, res: Response) => {
        const query = `
            SELECT * FROM MENSAJE
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "mensaje": element[1],
                    "fecha": element[2],
                    "usuario1": element[3],
                    "usuario2": element[4],
                }
                data.push(dataSchema);
            });
            
            return res.json(data)
        } else {
            return res.status(400).json({
                ok: false,
                status: 400,
                error: "No existen datos."
            });
        }
    }
    
    getSingle = async (req: any, res: Response) => {
        let body = {
            id : req.params.id,
            id2 : req.params.id2,
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

        if(result) {
            let data:any[] = [];
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
            
            return res.json(data)
        } else {
            return res.status(400).json({
                ok: false,
                status: 400,
                error: "No existen datos."
            });
        }
    }

    create = async (req: any, res: Response) => {
        let body = {
            mensaje: req.body.mensaje,
            usuario1: req.body.usuario1,
            usuario2: req.body.usuario2,
        }

        const query = `
            INSERT INTO MENSAJE(mensaje, usuario1, usuario2) 
            VALUES ('${body.mensaje}', ${body.usuario1},
            ${body.usuario2})
        `;
        
        let result:any = await OracleConnection.executeQuery(query);
        if(result) {       
            SocketServer.getInstance().sendMessage(body.usuario1, body.usuario2);     
            return res.json({
                ok: true,
                status: 200,
                data: "Datos agregados correctamente :D"
            });
        } else {
            return res.status(400).json({
                ok: false,
                status: 400,
                error: "Ha ocurrido un error."
            });
        }
    }

    update = async (req: any, res: Response) => {
        let body = {
            descripcion: req.body.descripcion,
            id : req.params.id
        }

        const query = `
            UPDATE MENSAJE SET 
            descripcion = '${body.descripcion}'
            WHERE id = ${body.id}
        `;
        
        let result:any = await OracleConnection.executeQuery(query);
        if(result) {            
            return res.json({
                ok: true,
                status: 200,
                data: "Datos actualizados correctamente :D"
            });
        } else {
            return res.status(400).json({
                ok: false,
                status: 400,
                error: "Ha ocurrido un error."
            });
        }
    }

    delete = async (req: any, res: Response) => {
        let body = {
            id : req.params.id
        }

        const query = `
            DELETE FROM MENSAJE WHERE id = ${body.id}
        `;
        
        let result:any = await OracleConnection.executeQuery(query);
        if(result) {
            return res.json({
                ok: true,
                status: 200,
                data: "Datos eliminados correctamente :D"
            });
        } else {
            return res.status(400).json({
                ok: false,
                status: 400,
                error: "No existen datos."
            });
        }
    }

}