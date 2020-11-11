import { query, Response } from 'express';
import OracleConnection from '../oracle/oracle';

export default class LikeController {
    private static _instance: LikeController;

    constructor(
    ) {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = async (req: any, res: Response) => {
        const query = `
            SELECT * FROM MEGUSTA
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "estado": element[1],
                    "producto": element[2],
                    "usario": element[3],
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
            SELECT * FROM MEGUSTA 
            WHERE usuario = ${body.id} AND producto = ${body.id2}
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "estado": element[1],
                    "producto": element[2],
                    "usario": element[3],
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
            estado: req.body.estado,
            producto: req.body.producto,
            usuario: req.body.usuario,
        }

        const query = `
            SELECT * FROM MEGUSTA 
            WHERE usuario = ${body.usuario} AND producto = ${body.producto}
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "estado": element[1],
                    "producto": element[2],
                    "usario": element[3],
                }
                data.push(dataSchema);
            });
            
            if(data.length > 0) {
                //VALIDAR
                if(data[0].estado == 0) {
                    const query3 = `
                        UPDATE MEGUSTA SET 
                        estado = ${body.estado}
                        WHERE usuario = ${body.usuario} AND producto = ${body.producto}
                    `;
                    let result3:any = await OracleConnection.executeQuery(query3);
                    if(result3) {            
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
                } else if(data[0].estado == 1) {
                    const query3 = `
                        UPDATE MEGUSTA SET 
                        estado = ${body.estado}
                        WHERE usuario = ${body.usuario} AND producto = ${body.producto}
                    `;
                    let result3:any = await OracleConnection.executeQuery(query3);
                    if(result3) {            
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
                } else {
                    const query4 = `
                        UPDATE MEGUSTA SET 
                        estado = ${body.estado}
                        WHERE usuario = ${body.usuario} AND producto = ${body.producto}
                    `;
                    let result4:any = await OracleConnection.executeQuery(query4);
                    if(result4) {            
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
            } else {
                const query2 = `
                    INSERT INTO MEGUSTA(estado, producto, usuario) 
                    VALUES (${body.estado}, ${body.producto},
                    ${body.usuario})
                `;
                
                let result2:any = await OracleConnection.executeQuery(query2);
                if(result2) {            
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
        } else {
            const query2 = `
                INSERT INTO MEGUSTA(estado, producto, usuario) 
                VALUES (${body.estado}, ${body.producto},
                ${body.usuario})
            `;
            
            let result2:any = await OracleConnection.executeQuery(query2);
            if(result2) {            
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

    }

    update = async (req: any, res: Response) => {
        let body = {
            estado: req.body.estado,
            id : req.params.id
        }

        const query = `
            UPDATE MEGUSTA SET 
            estado = '${body.estado}'
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
            DELETE FROM MEGUSTA WHERE id = ${body.id}
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