import { query, Response } from 'express';
import MailController from '../mail/mail';
import OracleConnection from '../oracle/oracle';
const nodemailer = require("nodemailer");

export default class DenunciaController {
    private static _instance: DenunciaController;

    constructor(
    ) {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = async (req: any, res: Response) => {
        const query = `
            SELECT * FROM DENUNCIA
            INNER JOIN PRODUCTO ON DENUNCIA.PRODUCTO = PRODUCTO.ID 
            INNER JOIN USUARIO ON DENUNCIA.USUARIO = USUARIO.ID 
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        console.log(result)
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "denuncia": element[1],
                    "fecha": element[2],
                    "estado": element[3],
                    "producto": element[4],
                    "usuario": element[5],
                    "nombreProducto": element[7],
                    "estadoProducto": element[14],
                    "nombre": element[16],
                    "apellido": element[17],
                    "correo": element[18],
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
            SELECT * FROM DENUNCIA
            INNER JOIN USUARIO ON DENUNCIA.USUARIO = USUARIO.ID 
            WHERE DENUNCIA.USUARIO = ${body.id} AND DENUNCIA.PRODUCTO = ${body.id2}
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        console.log(result)
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
                let dataSchema = {
                    "id": element[0],
                    "denuncia": element[1],
                    "fecha": element[2],
                    "nombre": element[7],
                    "apellido": element[8],
                    "picture": element[11],
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
            INSERT INTO DENUNCIA(descripcion, estado, producto, usuario) 
            VALUES ('${body.descripcion}', 1, ${body.producto},
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
            estado: req.body.estado,
            id : req.params.id
        }

        const query = `
            UPDATE DENUNCIA SET 
            descripcion = '${body.descripcion}',
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
            DELETE FROM DENUNCIA WHERE id = ${body.id}
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

    bloquear = async (req: any, res: Response) => {
        let body = {
            producto: req.body.producto,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            productoNombre: req.body.productoNombre,
            id : req.params.id
        }
        console.log(body)

        const query = `
            UPDATE DENUNCIA SET 
            estado = 0
            WHERE id = ${body.id}
        `;
        
        let result:any = await OracleConnection.executeQuery(query);
        if(result) {    
            const query2 = `
                UPDATE PRODUCTO SET 
                estado = 0
                WHERE id = ${body.producto}
            `;
            let result2:any = await OracleConnection.executeQuery(query2);
            if(result2) { 
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'josemorenteg98@gmail.com',
                        pass: 'rvliefzecigjpgjw'
                    }
                });

                transporter.sendMail({
                    from: '"Marketplace" <email@gmail.com>', // sender address
                    to: body.correo, // list of receivers
                    subject: 'Denuncia Comunitaria', // Subject line
                    text: 'Marketplace', // plain text body
                    html: MailController.getInstance().denunciarHTLM(body.nombre + ' ' + body.apellido, body.productoNombre)
                }, (error:any, info:any) => {
                    if (error){
                        res.json({
                            ok: false,
                            status: 400,
                            err: error
                        })
                    } else {
                        return res.json({
                            ok: true,
                            status: 200,
                            data: "Datos actualizados correctamente :D"
                        });
                    }
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    error: "Ha ocurrido un error."
                });
            }
        } else {
            return res.status(400).json({
                ok: false,
                status: 400,
                error: "Ha ocurrido un error."
            });
        }
    }

}