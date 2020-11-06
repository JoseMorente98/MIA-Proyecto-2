"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mail_1 = __importDefault(require("../mail/mail"));
var oracle_1 = __importDefault(require("../oracle/oracle"));
var bcrypt = require('bcrypt');
var nodemailer = require("nodemailer");
var UsuarioController = /** @class */ (function () {
    function UsuarioController() {
        var _this = this;
        this.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, data_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT * FROM USUARIO\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            console.log(result);
                            data_1 = [];
                            result.rows.map(function (element) {
                                var categorySchema = {
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
                                };
                                data_1.push(categorySchema);
                            });
                            return [2 /*return*/, res.json(data_1)];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "No existen datos."
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.getSingle = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result, data_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            id: req.params.id
                        };
                        query = "\n            SELECT * FROM USUARIO WHERE id = " + body.id + "\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            data_2 = [];
                            result.rows.map(function (element) {
                                var categorySchema = {
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
                                };
                                data_2.push(categorySchema);
                            });
                            return [2 /*return*/, res.json(data_2[0])];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "No existen datos."
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.login = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result, data_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            email: req.body.email,
                            password: req.body.password
                        };
                        query = "\n            SELECT * FROM USUARIO WHERE\n            email = '" + body.email + "'\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            console.log(result);
                            data_3 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
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
                                };
                                data_3.push(dataSchema);
                            });
                            console.log(data_3);
                            console.log(data_3[0]);
                            if (!bcrypt.compareSync(body.password, data_3[0].password)) {
                                return [2 /*return*/, res.status(400).json({
                                        ok: false,
                                        status: 400,
                                        error: "No existen datos."
                                    })];
                            }
                            else {
                                return [2 /*return*/, res.json(data_3[0])];
                            }
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "No existen datos."
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result, transporter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            nombre: req.body.nombre,
                            apellido: req.body.apellido,
                            email: req.body.email,
                            rol: req.body.rol,
                            password: bcrypt.hashSync(req.body.password, 10),
                            picture: req.body.picture,
                            fecha: req.body.fecha,
                            credito: req.body.credito,
                            activo: req.body.activo,
                            pais: req.body.pais,
                        };
                        query = "\n            INSERT INTO USUARIO(nombre, apellido, email, password, \n            rol, picture, fecha, credito, activo, pais) \n            VALUES ('" + body.nombre + "', '" + body.apellido + "', '" + body.email + "', '" + body.password + "', '" + body.rol + "',\n            '" + body.picture + "', TO_DATE('" + body.fecha + "', 'yyyy-mm-dd'), " + body.credito + ", '" + body.activo + "', " + body.pais + ")\n        ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result) {
                            transporter = nodemailer.createTransport({
                                service: 'Gmail',
                                auth: {
                                    user: 'josemorenteg98@gmail.com',
                                    pass: 'rvliefzecigjpgjw'
                                }
                            });
                            transporter.sendMail({
                                from: '"Marketplace" <email@gmail.com>',
                                to: body.email,
                                subject: 'Usuario Creado',
                                text: 'Marketplace',
                                html: mail_1.default.getInstance().registroHTLM(body.nombre + ' ' + body.apellido, body.email, req.body.password, "1")
                            }, function (error, info) {
                                if (error) {
                                    res.json({
                                        ok: false,
                                        status: 400,
                                        err: error
                                    });
                                }
                                else {
                                    return res.json({
                                        ok: true,
                                        status: 200,
                                        data: "Datos agregados correctamente :D"
                                    });
                                }
                            });
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "Ha ocurrido un error."
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.update = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            id: req.params.id,
                            nombre: req.body.nombre,
                            apellido: req.body.apellido,
                            picture: req.body.picture,
                            fecha: req.body.fecha,
                            credito: req.body.credito,
                        };
                        query = "\n            UPDATE USUARIO SET \n            nombre = '" + body.nombre + "',\n            apellido = '" + body.apellido + "',\n            picture = '" + body.picture + "',\n            fecha = TO_DATE('" + body.fecha + "', 'yyyy-mm-dd'),\n            credito = " + body.credito + "\n            WHERE id = " + body.id + "\n        ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, res.json({
                                    ok: true,
                                    status: 200,
                                    data: "Datos actualizados correctamente :D"
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "Ha ocurrido un error."
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            id: req.params.id
                        };
                        query = "\n            DELETE FROM USUARIO WHERE id = " + body.id + "\n        ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, res.json({
                                    ok: true,
                                    status: 200,
                                    data: "Datos eliminados correctamente :D"
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "No existen datos."
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.recovery = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result, data_4, transporter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            email: req.body.email,
                            password: req.body.password
                        };
                        query = "\n            SELECT * FROM USUARIO WHERE\n            email = '" + body.email + "'\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            console.log(result);
                            data_4 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
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
                                };
                                data_4.push(dataSchema);
                            });
                            transporter = nodemailer.createTransport({
                                service: 'Gmail',
                                auth: {
                                    user: 'josemorenteg98@gmail.com',
                                    pass: 'rvliefzecigjpgjw'
                                }
                            });
                            transporter.sendMail({
                                from: '"Marketplace" <email@gmail.com>',
                                to: data_4[0].email,
                                subject: 'Recuperación de Contraseña',
                                text: 'Marketplace',
                                html: mail_1.default.getInstance().actualizacionResetHTLM(data_4[0].nombre + ' ' + data_4[0].apellido, data_4[0].id)
                            }, function (error, info) {
                                if (error) {
                                    res.json({
                                        ok: false,
                                        status: 400,
                                        err: error
                                    });
                                }
                                else {
                                    res.json(data_4[0]);
                                }
                            });
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "No existen datos."
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.reset = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result, data_5, query_1, result2, transporter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            id: req.params.id,
                            password: bcrypt.hashSync(req.body.password, 10)
                        };
                        query = "\n            SELECT * FROM USUARIO WHERE id = " + body.id + "\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 3];
                        data_5 = [];
                        result.rows.map(function (element) {
                            var categorySchema = {
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
                            };
                            data_5.push(categorySchema);
                        });
                        query_1 = "\n                UPDATE USUARIO SET \n                password = '" + body.password + "'\n                WHERE id = " + body.id + "\n            ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query_1)];
                    case 2:
                        result2 = _a.sent();
                        if (result2) {
                            transporter = nodemailer.createTransport({
                                service: 'Gmail',
                                auth: {
                                    user: 'josemorenteg98@gmail.com',
                                    pass: 'rvliefzecigjpgjw'
                                }
                            });
                            transporter.sendMail({
                                from: '"Marketplace" <email@gmail.com>',
                                to: data_5[0].email,
                                subject: 'Cambio de Contraseña',
                                text: 'Marketplace',
                                html: mail_1.default.getInstance().actualizacionHTLM(data_5[0].nombre + ' ' + data_5[0].apellido, data_5[0].email, req.body.password)
                            }, function (error, info) {
                                if (error) {
                                    res.json({
                                        ok: false,
                                        status: 400,
                                        err: error
                                    });
                                }
                                else {
                                    res.json(data_5[0]);
                                }
                            });
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "Ha ocurrido un error."
                                })];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, res.status(400).json({
                            ok: false,
                            status: 400,
                            error: "No existen datos."
                        })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.activar = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            email: req.body.email,
                        };
                        query = "\n            UPDATE USUARIO SET \n            activo = 'Activo'\n            WHERE email = '" + body.email + "'\n        ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, res.json({
                                    ok: true,
                                    status: 200,
                                    data: "Datos actualizados correctamente :D"
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "Ha ocurrido un error."
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
    }
    UsuarioController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return UsuarioController;
}());
exports.default = UsuarioController;
