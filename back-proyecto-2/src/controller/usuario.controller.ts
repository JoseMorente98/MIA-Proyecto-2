import { query, Response } from 'express';
import MailController from '../mail/mail';
import OracleConnection from '../oracle/oracle';
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

export default class UsuarioController {
    private static _instance: UsuarioController;

    constructor(
    ) {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = async (req: any, res: Response) => {
        const query = `
            SELECT * FROM USUARIO
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            console.log(result)
            let data:any[] = [];
            result.rows.map((element: any[]) => {
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
            SELECT * FROM USUARIO WHERE id = ${body.id}
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
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
            
            return res.json(data[0])
        } else {
            return res.status(400).json({
                ok: false,
                status: 400,
                error: "No existen datos."
            });
        }
    }


    login = async (req: any, res: Response) => {
        let body = {
            email: req.body.email,
            password: req.body.password
        }
        const query = `
            SELECT * FROM USUARIO WHERE
            email = '${body.email}'
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
            console.log(data)
            console.log(data[0])
            if(!bcrypt.compareSync(body.password, data[0].password)) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    error: "No existen datos."
                });
            } else {
                return res.json(data[0])
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
            apellido: req.body.apellido,
            email: req.body.email,
            rol: req.body.rol,
            password: bcrypt.hashSync(req.body.password , 10),
            picture: req.body.picture,
            fecha: req.body.fecha,
            credito: req.body.credito,
            activo: req.body.activo,
            pais: req.body.pais,
        }

        const query = `
            INSERT INTO USUARIO(nombre, apellido, email, password, 
            rol, picture, fecha, credito, activo, pais) 
            VALUES ('${body.nombre}', '${body.apellido}', '${body.email}', '${body.password}', '${body.rol}',
            '${body.picture}', TO_DATE('${body.fecha}', 'yyyy-mm-dd'), ${body.credito}, '${body.activo}', ${body.pais})
        `;
        
        let result:any = await OracleConnection.executeQuery(query);
        console.log(result)
        if(result) {   
            
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'josemorenteg98@gmail.com',
                    pass: 'rvliefzecigjpgjw'
                }
            });

            transporter.sendMail({
                from: '"Marketplace" <email@gmail.com>', // sender address
                to: body.email, // list of receivers
                subject: 'Usuario Creado', // Subject line
                text: 'Marketplace', // plain text body
                html: MailController.getInstance().registroHTLM(body.nombre + ' ' + body.apellido, body.email, req.body.password, "1")
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
                        data: "Datos agregados correctamente :D"
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
    }

    update = async (req: any, res: Response) => {
        let body = {
            id : req.params.id,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            picture: req.body.picture,
            fecha: req.body.fecha,
            credito: req.body.credito,
        }

        const query = `
            UPDATE USUARIO SET 
            nombre = '${body.nombre}',
            apellido = '${body.apellido}',
            picture = '${body.picture}',
            fecha = TO_DATE('${body.fecha}', 'yyyy-mm-dd'),
            credito = ${body.credito}
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
            DELETE FROM USUARIO WHERE id = ${body.id}
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

    recovery = async (req: any, res: Response) => {
        let body = {
            email: req.body.email,
            password: req.body.password
        }
        const query = `
            SELECT * FROM USUARIO WHERE
            email = '${body.email}'
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
                subject: 'Recuperación de Contraseña', // Subject line
                text: 'Marketplace', // plain text body
                html: MailController.getInstance().actualizacionResetHTLM(data[0].nombre + ' ' + data[0].apellido, data[0].id)
            }, (error:any, info:any) => {
                if (error){
                    res.json({
                        ok: false,
                        status: 400,
                        err: error
                    })
                } else {
                    res.json(data[0])
                }
            });

        } else {
            return res.status(400).json({
                ok: false,
                status: 400,
                error: "No existen datos."
            });
        }
    }

    reset = async (req: any, res: Response) => {
        let body = {
            id : req.params.id,
            password: bcrypt.hashSync(req.body.password , 10)
        }

        const query = `
            SELECT * FROM USUARIO WHERE id = ${body.id}
        `;
        
        let result:any = await OracleConnection.selectQuery(query);
        if(result) {
            let data:any[] = [];
            result.rows.map((element: any[]) => {
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
            
            const query = `
                UPDATE USUARIO SET 
                password = '${body.password}'
                WHERE id = ${body.id}
            `;
            
            let result2:any = await OracleConnection.executeQuery(query);
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
                    to: data[0].email, // list of receivers
                    subject: 'Cambio de Contraseña', // Subject line
                    text: 'Marketplace', // plain text body
                    html: MailController.getInstance().actualizacionHTLM(data[0].nombre + ' ' + data[0].apellido, data[0].email, req.body.password)
                }, (error:any, info:any) => {
                    if (error){
                        res.json({
                            ok: false,
                            status: 400,
                            err: error
                        })
                    } else {
                        res.json(data[0])
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
                error: "No existen datos."
            });
        }
    }

    activar = async (req: any, res: Response) => {
        let body = {
            email: req.body.email,
        }

        const query = `
            UPDATE USUARIO SET 
            activo = 'Activo'
            WHERE email = '${body.email}'
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

}