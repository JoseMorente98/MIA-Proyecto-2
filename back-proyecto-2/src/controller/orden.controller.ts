import { query, Response } from 'express';
import MailController from '../mail/mail';
import OracleConnection from '../oracle/oracle';
const nodemailer = require("nodemailer");

export default class OrdenController {
    private static _instance: OrdenController;

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
            detalle: req.body.detalle,
            usuario: req.body.usuario,
            total: req.body.total,
            correo: req.body.correo,
            nombreCompleto: req.body.nombreCompleto,
        }
        console.log(body)
        const query = `
            INSERT INTO VENTA(usuario, total) 
            VALUES ('${body.usuario}',
            ${body.total})
        `;
        let result:any = await OracleConnection.executeQuery(query);
        if(result) {       
            
            const query2 = `
                SELECT *
                FROM (SELECT * FROM VENTA
                ORDER BY ID DESC)
                WHERE ROWNUM = 1
            `;
            let result2:any = await OracleConnection.selectQuery(query2);
            if(result2) {
                let data:any[] = [];
                result2.rows.map((element: any[]) => {
                    let dataSchema = {
                        "id": element[0],
                        "usuario": element[1],
                        "total": element[2],
                    }
                    data.push(dataSchema);
                });
                if(data.length > 0) {
                    body.detalle.forEach(async (element:any) => {
                        await this.agregarDetalle(
                            element.id, data[0].id,
                            element.cantidad,
                            element.subtotal,
                            element.usuario,
                            element.nombre)
                    });


                    /**
                     * ENVIAR DETALLE DE COMPRA
                     */
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
                        subject: 'Factura No.' + data[0].id, // Subject line
                        text: 'Marketplace', // plain text body
                        html: MailController.getInstance()
                        .productoCompra(body.detalle, body.nombreCompleto, body.total)
                    }, (error:any, info:any) => {
                        if (error){
                            return res.json(data[0])
                        } else {
                            return res.json(data[0])
                        }
                    });
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
        } else {
            return res.status(400).json({
                ok: false,
                status: 400,
                error: "Ha ocurrido un error."
            });
        }
    }


    async agregarDetalle(producto:number, venta:number, cantidad:number, subtotal:number, usuario:number, productoNombre:string) {
        const query = `
            INSERT INTO DETALLEVENTA(producto, venta, cantidad, subtotal) 
            VALUES (${producto},${venta},${cantidad},${subtotal})
        `;
        let result:any = await OracleConnection.executeQuery(query);
        if(result) {
            await this.buscarUsuario(usuario, subtotal, cantidad, productoNombre);
            console.log("Detalle Incrustado")
        } else {
            console.log("No se ha incrustado detalle;")
        }
    }

    buscarUsuario = async (usuario:number, subtotal:number, cantidad:number, productoNombre:string) => {
        const query = `
            SELECT * FROM USUARIO WHERE id = ${usuario}
        `;
        
        let result2:any = await OracleConnection.selectQuery(query);
        if(result2) {
            let data:any[] = [];
            result2.rows.map((element: any[]) => {
                let categorySchema = {
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
                data.push(categorySchema);
            });
            
            
            /**
             * ACTUALIZAR CREDITOS USUARIO
             */
            let nuevoCredito = data[0].credito + subtotal;

            const query2 = `
                UPDATE USUARIO SET 
                credito = ${nuevoCredito}
                WHERE id = ${usuario}
            `;
            
            let result3:any = await OracleConnection.executeQuery(query2);
            if(result3) {            
                
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'josemorenteg98@gmail.com',
                        pass: 'rvliefzecigjpgjw'
                    }
                });
    
                transporter.sendMail({
                    from: '"Marketplace" <email@gmail.com>', // sender address
                    to: data[0].email, // list of receivers
                    subject: 'Producto Vendido', // Subject line
                    text: 'Marketplace', // plain text body
                    html: MailController.getInstance()
                    .compraHTML(data[0].nombre + ' ' + data[0].apellido, productoNombre, cantidad.toString(), subtotal.toString())
                }, (error:any, info:any) => {
                    if (error){
                        console.log("Correo no enviado")
                    } else {
                        console.log("Correo enviado")
                    }
                });
            } else {
                console.log("No se ha actualizado")
            }
        } else {
            console.log("Usuario No Encontrado")
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