import { query, Response } from 'express';
import OracleConnection from '../oracle/oracle';

export default class ProductoController {
    private static _instance: ProductoController;

    constructor(
    ) {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = async (req: any, res: Response) => {
        const query = `
            SELECT * FROM PRODUCTO
            WHERE PRODUCTO.ESTADO = 1
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "nombre": element[1],
                    "descripcion": element[2],
                    "clave": element[3],
                    "picture": element[4],
                    "precio": element[5],
                    "categoria": element[6],
                    "usuario": element[7],
                    "estado": element[8],
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

    getAllCategorias = async (req: any, res: Response) => {
        let body = {
            id : req.params.id
        }
        const query = `
            SELECT * FROM PRODUCTO
            WHERE categoria = ${body.id} AND ESTADO = 1
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "nombre": element[1],
                    "descripcion": element[2],
                    "clave": element[3],
                    "picture": element[4],
                    "precio": element[5],
                    "categoria": element[6],
                    "usuario": element[7],
                    "estado": element[8],
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

    getAllASC= async (req: any, res: Response) => {
        const query = `
            SELECT * FROM PRODUCTO
            WHERE PRODUCTO.ESTADO = 1
            ORDER BY PRECIO ASC
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        console.log("CONSULTA")
        console.log(result)
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "nombre": element[1],
                    "descripcion": element[2],
                    "clave": element[3],
                    "picture": element[4],
                    "precio": element[5],
                    "categoria": element[6],
                    "usuario": element[7],
                    "estado": element[8],
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

    getAllDESC = async (req: any, res: Response) => {
        const query = `
            SELECT * FROM PRODUCTO
            WHERE PRODUCTO.ESTADO = 1
            ORDER BY precio DESC
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
                    "clave": element[3],
                    "picture": element[4],
                    "precio": element[5],
                    "categoria": element[6],
                    "usuario": element[7],
                    "estado": element[8],
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
            SELECT * FROM PRODUCTO WHERE id = ${body.id}
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "nombre": element[1],
                    "descripcion": element[2],
                    "clave": element[3],
                    "picture": element[4],
                    "precio": element[5],
                    "categoria": element[6],
                    "usuario": element[7],
                    "estado": element[8],
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
            clave: req.body.clave,
            picture: req.body.picture,
            precio: req.body.precio,
            categoria: req.body.categoria,
            usuario: req.body.usuario,
        }

        const query = `
            INSERT INTO PRODUCTO(nombre, descripcion, clave, picture, precio, categoria, usuario) 
            VALUES ('${body.nombre}', '${body.descripcion}', '${body.clave}',
            '${body.picture}', ${body.precio}, ${body.categoria}, ${body.usuario})
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
            clave: req.body.clave,
            picture: req.body.picture,
            precio: req.body.precio,
            categoria: req.body.categoria,
            usuario: req.body.usuario,
            id : req.params.id
        }

        const query = `
            UPDATE PRODUCTO SET 
            nombre = '${body.nombre}',
            descripcion = '${body.descripcion}',
            clave = '${body.clave}',
            picture = '${body.picture}',
            precio = '${body.precio}',
            categoria = '${body.categoria}',
            usuario = '${body.usuario}'
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
            DELETE FROM PRODUCTO WHERE id = ${body.id}
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