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
var nodemailer = require("nodemailer");
var OrdenController = /** @class */ (function () {
    function OrdenController() {
        var _this = this;
        this.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, data_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT * FROM BITACORA\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            data_1 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "id": element[0],
                                    "nombre": element[1]
                                };
                                data_1.push(dataSchema);
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
                        query = "\n            SELECT * FROM BITACORA WHERE id = " + body.id + "\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            data_2 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "id": element[0],
                                    "nombre": element[1]
                                };
                                data_2.push(dataSchema);
                            });
                            if (data_2.length > 0) {
                                return [2 /*return*/, res.json(data_2[0])];
                            }
                            else {
                                return [2 /*return*/, res.status(400).json({
                                        ok: false,
                                        status: 400,
                                        error: "No existen datos."
                                    })];
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
            var body, query, result, query2, result2, data_3, transporter;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            detalle: req.body.detalle,
                            usuario: req.body.usuario,
                            total: req.body.total,
                            correo: req.body.correo,
                            nombreCompleto: req.body.nombreCompleto,
                        };
                        console.log(body);
                        query = "\n            INSERT INTO VENTA(usuario, total) \n            VALUES ('" + body.usuario + "',\n            " + body.total + ")\n        ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 3];
                        query2 = "\n                SELECT *\n                FROM (SELECT * FROM VENTA\n                ORDER BY ID DESC)\n                WHERE ROWNUM = 1\n            ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query2)];
                    case 2:
                        result2 = _a.sent();
                        if (result2) {
                            data_3 = [];
                            result2.rows.map(function (element) {
                                var dataSchema = {
                                    "id": element[0],
                                    "usuario": element[1],
                                    "total": element[2],
                                };
                                data_3.push(dataSchema);
                            });
                            if (data_3.length > 0) {
                                body.detalle.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.agregarDetalle(element.id, data_3[0].id, element.cantidad, element.subtotal, element.usuario, element.nombre)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                transporter = nodemailer.createTransport({
                                    service: 'Gmail',
                                    auth: {
                                        user: 'josemorenteg98@gmail.com',
                                        pass: 'rvliefzecigjpgjw'
                                    }
                                });
                                transporter.sendMail({
                                    from: '"Marketplace" <email@gmail.com>',
                                    to: body.correo,
                                    subject: 'Factura No.' + data_3[0].id,
                                    text: 'Marketplace',
                                    html: mail_1.default.getInstance()
                                        .productoCompra(body.detalle, body.nombreCompleto, body.total)
                                }, function (error, info) {
                                    if (error) {
                                        return res.json(data_3[0]);
                                    }
                                    else {
                                        return res.json(data_3[0]);
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
                        }
                        else {
                            return [2 /*return*/, res.status(400).json({
                                    ok: false,
                                    status: 400,
                                    error: "No existen datos."
                                })];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, res.status(400).json({
                            ok: false,
                            status: 400,
                            error: "Ha ocurrido un error."
                        })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.buscarUsuario = function (usuario, subtotal, cantidad, productoNombre) { return __awaiter(_this, void 0, void 0, function () {
            var query, result2, data_4, nuevoCredito, query2, result3, transporter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT * FROM USUARIO WHERE id = " + usuario + "\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result2 = _a.sent();
                        if (!result2) return [3 /*break*/, 3];
                        data_4 = [];
                        result2.rows.map(function (element) {
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
                            data_4.push(categorySchema);
                        });
                        nuevoCredito = data_4[0].credito + subtotal;
                        query2 = "\n                UPDATE USUARIO SET \n                credito = " + nuevoCredito + "\n                WHERE id = " + usuario + "\n            ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query2)];
                    case 2:
                        result3 = _a.sent();
                        if (result3) {
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
                                subject: 'Producto Vendido',
                                text: 'Marketplace',
                                html: mail_1.default.getInstance()
                                    .compraHTML(data_4[0].nombre + ' ' + data_4[0].apellido, productoNombre, cantidad.toString(), subtotal.toString())
                            }, function (error, info) {
                                if (error) {
                                    console.log("Correo no enviado");
                                }
                                else {
                                    console.log("Correo enviado");
                                }
                            });
                        }
                        else {
                            console.log("No se ha actualizado");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        console.log("Usuario No Encontrado");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.update = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            descripcion: req.body.descripcion,
                            id: req.params.id
                        };
                        query = "\n            UPDATE BITACORA SET \n            descripcion = '" + body.descripcion + "'\n            WHERE id = " + body.id + "\n        ";
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
                        query = "\n            DELETE FROM BITACORA WHERE id = " + body.id + "\n        ";
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
    }
    OrdenController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    OrdenController.prototype.agregarDetalle = function (producto, venta, cantidad, subtotal, usuario, productoNombre) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            INSERT INTO DETALLEVENTA(producto, venta, cantidad, subtotal) \n            VALUES (" + producto + "," + venta + "," + cantidad + "," + subtotal + ")\n        ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.buscarUsuario(usuario, subtotal, cantidad, productoNombre)];
                    case 2:
                        _a.sent();
                        console.log("Detalle Incrustado");
                        return [3 /*break*/, 4];
                    case 3:
                        console.log("No se ha incrustado detalle;");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrdenController;
}());
exports.default = OrdenController;
