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
var ProductoController = /** @class */ (function () {
    function ProductoController() {
        var _this = this;
        this.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, data_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT * FROM PRODUCTO\n            WHERE PRODUCTO.ESTADO = 1\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            data_1 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "id": element[0],
                                    "nombre": element[1],
                                    "descripcion": element[2],
                                    "clave": element[3],
                                    "picture": element[4],
                                    "precio": element[5],
                                    "categoria": element[6],
                                    "usuario": element[7],
                                    "estado": element[8],
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
        this.getAllCategorias = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result, data_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            id: req.params.id
                        };
                        query = "\n            SELECT * FROM PRODUCTO\n            WHERE categoria = " + body.id + " AND ESTADO = 1\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            data_2 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "id": element[0],
                                    "nombre": element[1],
                                    "descripcion": element[2],
                                    "clave": element[3],
                                    "picture": element[4],
                                    "precio": element[5],
                                    "categoria": element[6],
                                    "usuario": element[7],
                                    "estado": element[8],
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
        this.getAllASC = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, data_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT * FROM PRODUCTO\n            WHERE PRODUCTO.ESTADO = 1\n            ORDER BY PRECIO ASC\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        console.log("CONSULTA");
                        console.log(result);
                        if (result) {
                            data_3 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "id": element[0],
                                    "nombre": element[1],
                                    "descripcion": element[2],
                                    "clave": element[3],
                                    "picture": element[4],
                                    "precio": element[5],
                                    "categoria": element[6],
                                    "usuario": element[7],
                                    "estado": element[8],
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
        this.getAllDESC = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, data_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n            SELECT * FROM PRODUCTO\n            WHERE PRODUCTO.ESTADO = 1\n            ORDER BY precio DESC\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result) {
                            data_4 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "id": element[0],
                                    "nombre": element[1],
                                    "descripcion": element[2],
                                    "clave": element[3],
                                    "picture": element[4],
                                    "precio": element[5],
                                    "categoria": element[6],
                                    "usuario": element[7],
                                    "estado": element[8],
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
        this.getSingle = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result, data_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            id: req.params.id
                        };
                        query = "\n            SELECT * FROM PRODUCTO WHERE id = " + body.id + "\n        ";
                        return [4 /*yield*/, oracle_1.default.selectQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            data_5 = [];
                            result.rows.map(function (element) {
                                var dataSchema = {
                                    "id": element[0],
                                    "nombre": element[1],
                                    "descripcion": element[2],
                                    "clave": element[3],
                                    "picture": element[4],
                                    "precio": element[5],
                                    "categoria": element[6],
                                    "usuario": element[7],
                                    "estado": element[8],
                                };
                                data_5.push(dataSchema);
                            });
                            if (data_5.length > 0) {
                                return [2 /*return*/, res.json(data_5[0])];
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
            var body, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            nombre: req.body.nombre,
                            descripcion: req.body.descripcion,
                            clave: req.body.clave,
                            picture: req.body.picture,
                            precio: req.body.precio,
                            categoria: req.body.categoria,
                            usuario: req.body.usuario,
                        };
                        query = "\n            INSERT INTO PRODUCTO(nombre, descripcion, clave, picture, precio, categoria, usuario) \n            VALUES ('" + body.nombre + "', '" + body.descripcion + "', '" + body.clave + "',\n            '" + body.picture + "', " + body.precio + ", " + body.categoria + ", " + body.usuario + ")\n        ";
                        return [4 /*yield*/, oracle_1.default.executeQuery(query)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            return [2 /*return*/, res.json({
                                    ok: true,
                                    status: 200,
                                    data: "Datos agregados correctamente :D"
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
        this.update = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            nombre: req.body.nombre,
                            descripcion: req.body.descripcion,
                            clave: req.body.clave,
                            picture: req.body.picture,
                            precio: req.body.precio,
                            categoria: req.body.categoria,
                            usuario: req.body.usuario,
                            id: req.params.id
                        };
                        query = "\n            UPDATE PRODUCTO SET \n            nombre = '" + body.nombre + "',\n            descripcion = '" + body.descripcion + "',\n            clave = '" + body.clave + "',\n            picture = '" + body.picture + "',\n            precio = '" + body.precio + "',\n            categoria = '" + body.categoria + "',\n            usuario = '" + body.usuario + "'\n            WHERE id = " + body.id + "\n        ";
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
                        query = "\n            DELETE FROM PRODUCTO WHERE id = " + body.id + "\n        ";
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
    ProductoController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return ProductoController;
}());
exports.default = ProductoController;
