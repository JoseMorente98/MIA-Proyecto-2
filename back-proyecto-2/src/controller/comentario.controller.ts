import { query, Response } from 'express';
import OracleConnection from '../oracle/oracle';

export default class ComentarioController {
    private static _instance: ComentarioController;

    constructor(
    ) {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = async (req: any, res: Response) => {
        const query = `
            SELECT * FROM COMENTARIO
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "descripcion": element[1],
                    "fecha": element[2],
                    "producto": element[3],
                    "usuario": element[4],
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
            SELECT * FROM COMENTARIO
            INNER JOIN USUARIO ON COMENTARIO.USUARIO = USUARIO.ID 
            WHERE COMENTARIO.USUARIO = ${body.id} AND COMENTARIO.PRODUCTO = ${body.id2}
        `;
        let result:any = await OracleConnection.selectQuery(query);
        console.log(result)

        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "comentario": element[1],
                    "fecha": element[2],
                    "nombre": element[6],
                    "apellido": element[7],
                    "picture": element[10],
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
            descripcion: req.body.descripcion,
            producto: req.body.producto,
            usuario: req.body.usuario,
        }

        const query = `
            INSERT INTO COMENTARIO(descripcion, producto, usuario) 
            VALUES ('${body.descripcion}', ${body.producto},
            ${body.usuario})
        `;
        
        let result:any = await OracleConnection.executeQuery(query);
        if(result) {            
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
            UPDATE COMENTARIO SET 
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
            DELETE FROM COMENTARIO WHERE id = ${body.id}
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