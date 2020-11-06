import { query, Response } from 'express';
import OracleConnection from '../oracle/oracle';

export default class CategoriaControlador {
    private static _instance: CategoriaControlador;

    constructor(
    ) {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = async (req: any, res: Response) => {
        const query = `
            SELECT * FROM CATEGORIA
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "nombre": element[1],
                    "descripcion": element[2],
                    "picture": element[3],
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
            SELECT * FROM CATEGORIA WHERE id = ${body.id}
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        console.log(result)
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "nombre": element[1],
                    "descripcion": element[2],
                    "picture": element[3],
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
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            picture: req.body.picture,
        }

        const query = `
            INSERT INTO CATEGORIA(nombre, descripcion, picture) 
            VALUES ('${body.nombre}', '${body.descripcion}', '${body.picture}')
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
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            picture: req.body.picture,
            id : req.params.id
        }

        const query = `
            UPDATE CATEGORIA SET 
            nombre = '${body.nombre}',
            descripcion = '${body.descripcion}',
            picture = '${body.picture}'
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
            DELETE FROM CATEGORIA WHERE id = ${body.id}
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