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
var oracle_1 = __importDefault(require("../oracle/oracle"));
var ReporteController = /** @class */ (function () {
    function ReporteController() {
        var _this = this;
        this.getAllToPublicaciones = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, data_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT COUNT(*) AS CANTIDAD, PRODUCTO.USUARIO, USUARIO.NOMBRE, USUARIO.APELLIDO, USUARIO.CREDITO, USUARIO.EMAIL\n            FROM PRODUCTO \n            INNER JOIN USUARIO ON PRODUCTO.USUARIO = USUARIO.ID \n            GROUP BY \n            PRODUCTO.USUARIO, USUARIO.EMAIL, USUARIO.NOMBRE, USUARIO.APELLIDO, USUARIO.CREDITO, USUARIO.EMAIL\n            ORDER BY CANTIDAD DESC\n            FETCH FIRST 10 ROWS ONLY\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result) {
                            data_1 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "cantidad": element[0],
                                    "usuario": element[1],
                                    "nombre": element[2],
                                    "apellido": element[3],
                                    "credito": element[4],
                                    "email": element[5],
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
        this.getAllTopDenuncias = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, data_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT COUNT(*) AS CANTIDAD, DENUNCIA.USUARIO, USUARIO.NOMBRE, USUARIO.APELLIDO, USUARIO.EMAIL, USUARIO.FECHA\n            FROM DENUNCIA \n                INNER JOIN USUARIO ON DENUNCIA.USUARIO = USUARIO.ID \n            GROUP BY \n                DENUNCIA.USUARIO, USUARIO.EMAIL, USUARIO.NOMBRE, USUARIO.APELLIDO, USUARIO.EMAIL, USUARIO.FECHA\n            ORDER BY CANTIDAD DESC\n            FETCH FIRST 10 ROWS ONLY\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result) {
                            data_2 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "cantidad": element[0],
                                    "usuario": element[1],
                                    "nombre": element[2],
                                    "apellido": element[3],
                                    "email": element[4],
                                    "fecha": element[5],
                                };
                                data_2.push(dataSchema);
                            });
                            return [2 /*return*/, res.json(data_2)];
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
        this.getAllMenosCredito = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, data_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT * FROM USUARIO\n            ORDER BY CREDITO ASC\n            FETCH FIRST 10 ROWS ONLY\n        ";
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
                            return [2 /*return*/, res.json(data_3)];
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
        this.getAllMasCredito = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, data_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT * FROM USUARIO\n            ORDER BY CREDITO DESC\n            FETCH FIRST 10 ROWS ONLY\n        ";
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
                            return [2 /*return*/, res.json(data_4)];
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
        this.getAllMasMeGusta = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, data_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT COUNT(*) AS CANTIDAD, PRODUCTO.NOMBRE, USUARIO.NOMBRE, USUARIO.APELLIDO FROM MEGUSTA\n            INNER JOIN PRODUCTO ON MEGUSTA.PRODUCTO = PRODUCTO.ID\n            INNER JOIN USUARIO ON PRODUCTO.USUARIO = USUARIO.ID\n            WHERE MEGUSTA.ESTADO = 1\n            GROUP BY MEGUSTA.PRODUCTO, PRODUCTO.NOMBRE, PRODUCTO.ID, USUARIO.NOMBRE, USUARIO.APELLIDO\n            ORDER BY CANTIDAD DESC\n            FETCH FIRST 10 ROWS ONLY\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            console.log(result);
                            data_5 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "cantidad": element[0],
                                    "nombreProducto": element[1],
                                    "nombre": element[2],
                                    "apellido": element[3]
                                };
                                data_5.push(dataSchema);
                            });
                            return [2 /*return*/, res.json(data_5)];
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
        this.getAllMasNoMeGusta = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, data_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT COUNT(*) AS CANTIDAD, PRODUCTO.NOMBRE, USUARIO.NOMBRE, USUARIO.APELLIDO FROM MEGUSTA\n            INNER JOIN PRODUCTO ON MEGUSTA.PRODUCTO = PRODUCTO.ID\n            INNER JOIN USUARIO ON PRODUCTO.USUARIO = USUARIO.ID\n            WHERE MEGUSTA.ESTADO = 2\n            GROUP BY MEGUSTA.PRODUCTO, PRODUCTO.NOMBRE, PRODUCTO.ID, USUARIO.NOMBRE, USUARIO.APELLIDO\n            ORDER BY CANTIDAD DESC\n            FETCH FIRST 10 ROWS ONLY\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            console.log(result);
                            data_6 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "cantidad": element[0],
                                    "nombreProducto": element[1],
                                    "nombre": element[2],
                                    "apellido": element[3]
                                };
                                data_6.push(dataSchema);
                            });
                            return [2 /*return*/, res.json(data_6)];
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
        this.getAllProductoMasVendido = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, data_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT SUM(CANTIDAD) AS CANTIDAD, PRODUCTO, PRODUCTO.NOMBRE, USUARIO.NOMBRE, USUARIO.APELLIDO FROM DETALLEVENTA\n            INNER JOIN PRODUCTO ON DETALLEVENTA.PRODUCTO = PRODUCTO.ID\n            INNER JOIN USUARIO ON PRODUCTO.USUARIO = USUARIO.ID\n            GROUP BY PRODUCTO, PRODUCTO.NOMBRE, USUARIO.NOMBRE, USUARIO.APELLIDO\n            ORDER BY CANTIDAD DESC\n            FETCH FIRST 10 ROWS ONLY\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            console.log(result);
                            data_7 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "cantidad": element[0],
                                    "nombreProducto": element[2],
                                    "nombre": element[3],
                                    "apellido": element[4]
                                };
                                data_7.push(dataSchema);
                            });
                            return [2 /*return*/, res.json(data_7)];
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
        this.getAllPaises = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, data_8, data2_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT COUNT(*) AS CANTIDAD, SUM(CREDITO) AS CREDITO, PAIS, PAIS.NOMBRE FROM USUARIO\n            INNER JOIN PAIS ON USUARIO.PAIS = PAIS.ID \n            GROUP BY PAIS, PAIS.NOMBRE\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 4];
                        console.log(result);
                        data_8 = [];
                        data2_1 = [];
                        return [4 /*yield*/, result.rows.map(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                var dataSchema;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            dataSchema = {
                                                "cantidad": element[0],
                                                "credito": element[1],
                                                "pais": element[2],
                                                "nombre": element[3]
                                            };
                                            console.log(element);
                                            return [4 /*yield*/, data_8.push(dataSchema)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        console.log("===========LONGITUD================");
                        console.log(data_8);
                        return [4 /*yield*/, data_8.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                var numero, data;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log(element);
                                            return [4 /*yield*/, this.obtenerCantidadProducto(+element.pais)];
                                        case 1:
                                            numero = _a.sent();
                                            data = {
                                                cantidad: element.cantidad,
                                                cantidadProducto: numero,
                                                credito: element.credito,
                                                pais: element.pais,
                                                nombre: element.nombre,
                                            };
                                            console.log(data);
                                            data2_1.push(data);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        setTimeout(function () {
                            return res.json(data2_1);
                        }, 2000);
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, res.status(400).json({
                            ok: false,
                            status: 400,
                            error: "No existen datos."
                        })];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
    }
    ReporteController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    ReporteController.prototype.obtenerCantidadProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var numero, query, result, data_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        numero = 0;
                        query = "\n            SELECT COUNT(*) AS CANTIDAD FROM PRODUCTO\n            INNER JOIN USUARIO ON PRODUCTO.USUARIO = USUARIO.ID \n            WHERE USUARIO.PAIS = " + id + "\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            console.log(result);
                            data_9 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "cantidad": element[0]
                                };
                                data_9.push(dataSchema);
                            });
                            numero = data_9[0].cantidad;
                        }
                        else {
                            numero = 0;
                        }
                        return [2 /*return*/, numero];
                }
            });
        });
    };
    return ReporteController;
}());
exports.default = ReporteController;
