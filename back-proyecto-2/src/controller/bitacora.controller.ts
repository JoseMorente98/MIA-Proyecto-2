import { query, Response } from 'express';
import OracleConnection from '../oracle/oracle';

export default class BitacoraController {
    private static _instance: BitacoraController;

    constructor(
    ) {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = async (req: any, res: Response) => {
        const query = `
            SELECT * FROM BITACORA
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "nombre": element[1]
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
            id : req.params.id
        }

        const query = `
            SELECT * FROM BITACORA WHERE id = ${body.id}
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "nombre": element[1]
                }
                data.push(dataSchema);
            });
            
            if(data.length > 0) {
                return res.json(data[0])
            } else {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    error: "No existen datos."
                });
            }  
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
            INSERT INTO BITACORA(descripcion, usuario) 
            VALUES ('${body.descripcion}',
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
            UPDATE BITACORA SET 
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
            DELETE FROM BITACORA WHERE id = ${body.id}
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