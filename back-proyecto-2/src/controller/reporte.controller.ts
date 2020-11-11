import { query, Response } from 'express';
import OracleConnection from '../oracle/oracle';

export default class ReporteController {
    private static _instance: ReporteController;

    constructor(
    ) {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAllToPublicaciones = async (req: any, res: Response) => {
        const query = `
            SELECT COUNT(*) AS CANTIDAD, PRODUCTO.USUARIO, USUARIO.NOMBRE, USUARIO.APELLIDO, USUARIO.CREDITO, USUARIO.EMAIL
            FROM PRODUCTO 
            INNER JOIN USUARIO ON PRODUCTO.USUARIO = USUARIO.ID 
            GROUP BY 
            PRODUCTO.USUARIO, USUARIO.EMAIL, USUARIO.NOMBRE, USUARIO.APELLIDO, USUARIO.CREDITO, USUARIO.EMAIL
            ORDER BY CANTIDAD DESC
            FETCH FIRST 10 ROWS ONLY
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        console.log(result)
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "cantidad": element[0],
                    "usuario": element[1],
                    "nombre": element[2],
                    "apellido": element[3],
                    "credito": element[4],
                    "email": element[5],
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

    getAllTopDenuncias = async (req: any, res: Response) => {
        const query = `
            SELECT COUNT(*) AS CANTIDAD, DENUNCIA.USUARIO, USUARIO.NOMBRE, USUARIO.APELLIDO, USUARIO.EMAIL, USUARIO.FECHA
            FROM DENUNCIA 
                INNER JOIN USUARIO ON DENUNCIA.USUARIO = USUARIO.ID 
            GROUP BY 
                DENUNCIA.USUARIO, USUARIO.EMAIL, USUARIO.NOMBRE, USUARIO.APELLIDO, USUARIO.EMAIL, USUARIO.FECHA
            ORDER BY CANTIDAD DESC
            FETCH FIRST 10 ROWS ONLY
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        console.log(result)
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "cantidad": element[0],
                    "usuario": element[1],
                    "nombre": element[2],
                    "apellido": element[3],
                    "email": element[4],
                    "fecha": element[5],
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


    getAllMenosCredito = async (req: any, res: Response) => {
        const query = `
            SELECT * FROM USUARIO
            ORDER BY CREDITO ASC
            FETCH FIRST 10 ROWS ONLY
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            console.log(result)
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "nombre": element[1],
                    "apellido": element[2],
                    "email": element[3],
                    "password": element[4],
                    "picture": element[5],
                    "rol": element[6],
                    "fecha": element[7],
                    "credito": element[8],
                    "activo": element[9],
                    "pais": element[10],
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

    getAllMasCredito = async (req: any, res: Response) => {
        const query = `
            SELECT * FROM USUARIO
            ORDER BY CREDITO DESC
            FETCH FIRST 10 ROWS ONLY
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            console.log(result)
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "nombre": element[1],
                    "apellido": element[2],
                    "email": element[3],
                    "password": element[4],
                    "picture": element[5],
                    "rol": element[6],
                    "fecha": element[7],
                    "credito": element[8],
                    "activo": element[9],
                    "pais": element[10],
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

    getAllMasMeGusta = async (req: any, res: Response) => {
        const query = `
            SELECT COUNT(*) AS CANTIDAD, PRODUCTO.NOMBRE, USUARIO.NOMBRE, USUARIO.APELLIDO FROM MEGUSTA
            INNER JOIN PRODUCTO ON MEGUSTA.PRODUCTO = PRODUCTO.ID
            INNER JOIN USUARIO ON PRODUCTO.USUARIO = USUARIO.ID
            WHERE MEGUSTA.ESTADO = 1
            GROUP BY MEGUSTA.PRODUCTO, PRODUCTO.NOMBRE, PRODUCTO.ID, USUARIO.NOMBRE, USUARIO.APELLIDO
            ORDER BY CANTIDAD DESC
            FETCH FIRST 10 ROWS ONLY
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            console.log(result)
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "cantidad": element[0],
                    "nombreProducto": element[1],
                    "nombre": element[2],
                    "apellido": element[3]
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

    getAllMasNoMeGusta = async (req: any, res: Response) => {
        const query = `
            SELECT COUNT(*) AS CANTIDAD, PRODUCTO.NOMBRE, USUARIO.NOMBRE, USUARIO.APELLIDO FROM MEGUSTA
            INNER JOIN PRODUCTO ON MEGUSTA.PRODUCTO = PRODUCTO.ID
            INNER JOIN USUARIO ON PRODUCTO.USUARIO = USUARIO.ID
            WHERE MEGUSTA.ESTADO = 2
            GROUP BY MEGUSTA.PRODUCTO, PRODUCTO.NOMBRE, PRODUCTO.ID, USUARIO.NOMBRE, USUARIO.APELLIDO
            ORDER BY CANTIDAD DESC
            FETCH FIRST 10 ROWS ONLY
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            console.log(result)
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "cantidad": element[0],
                    "nombreProducto": element[1],
                    "nombre": element[2],
                    "apellido": element[3]
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

    getAllProductoMasVendido = async (req: any, res: Response) => {
        const query = `
            SELECT SUM(CANTIDAD) AS CANTIDAD, PRODUCTO, PRODUCTO.NOMBRE, USUARIO.NOMBRE, USUARIO.APELLIDO FROM DETALLEVENTA
            INNER JOIN PRODUCTO ON DETALLEVENTA.PRODUCTO = PRODUCTO.ID
            INNER JOIN USUARIO ON PRODUCTO.USUARIO = USUARIO.ID
            GROUP BY PRODUCTO, PRODUCTO.NOMBRE, USUARIO.NOMBRE, USUARIO.APELLIDO
            ORDER BY CANTIDAD DESC
            FETCH FIRST 10 ROWS ONLY
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            console.log(result)
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "cantidad": element[0],
                    "nombreProducto": element[2],
                    "nombre": element[3],
                    "apellido": element[4]
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

    getAllPaises = async (req: any, res: Response) => {
        const query = `
            SELECT COUNT(*) AS CANTIDAD, SUM(CREDITO) AS CREDITO, PAIS, PAIS.NOMBRE FROM USUARIO
            INNER JOIN PAIS ON USUARIO.PAIS = PAIS.ID 
            GROUP BY PAIS, PAIS.NOMBRE
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            console.log(result)
            let data:any[] = [];
            let data2:any[] = [];
            await result.rows.map(async (element: any[]) => {
                let dataSchema = {
                    "cantidad": element[0],
                    "credito": element[1],
                    "pais": element[2],
                    "nombre": element[3]
                }
                console.log(element)
                await data.push(dataSchema);
            });
            console.log("===========LONGITUD================")
            console.log(data)
            
            await data.forEach(async (element:any) => {
                console.log(element)
                let numero = await this.obtenerCantidadProducto(+element.pais);
                let data = {
                    cantidad: element.cantidad,
                    cantidadProducto: numero,
                    credito: element.credito,
                    pais: element.pais,
                    nombre: element.nombre,
                }
                console.log(data)
                data2.push(data)
            });
            
            setTimeout(() => {
            return res.json(data2);
                
            }, 2000);
        } else {
            return res.status(400).json({
                ok: false,
                status: 400,
                error: "No existen datos."
            });
        }
    }

    async obtenerCantidadProducto(id:any):Promise<number> {
        let numero = 0;
        const query = `
            SELECT COUNT(*) AS CANTIDAD FROM PRODUCTO
            INNER JOIN USUARIO ON PRODUCTO.USUARIO = USUARIO.ID 
            WHERE USUARIO.PAIS = ${id}
        `;
    
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            console.log(result)
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "cantidad": element[0]
                }
                data.push(dataSchema);
            });
            
            numero = data[0].cantidad;
        } else {
            numero = 0;
        }

        return numero;
    }

}