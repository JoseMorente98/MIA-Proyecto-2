import oracledb from "oracledb";

export default class OracleConnection {
    private static _instance: OracleConnection;

    state: boolean = false;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    static async selectQuery(_query:any, _binds?:any, _options?:any) {
        let connection;
        try {
            connection = await oracledb.getConnection({
                user: 'TEST',
                password: '1234',
                connectString: '172.17.0.2:1521/orcl18'
            });
            //console.log(connection)

            if (connection) {
                console.log("Realizando consulta ORACLE :D")
                let result = await connection.execute(_query);
                connection.release();
                return result;            
            }
        } catch (_err) {
            //console.error(_err)
        } finally {
            if (connection) {
                try {
                    console.log("Cerrando conexión ORACLE :D")
                    await connection.close();
                } catch (err) {
                    //console.error(err);
                }
            }
        }
        return null;
    }

    static async executeQuery(_query:any, _binds?:oracledb.BindParameter[]) {
        let connection;
        try {
            connection = await oracledb.getConnection({
                user: 'TEST',
                password: '1234',
                connectString: '172.17.0.2:1521/orcl18'
            });

            if (connection) {
                console.log("Realizando consulta ORACLE :D")
                let option = { autoCommit: true }
                let binds = _binds || []
                let result = await connection.execute(_query, binds, option);
                connection.release();
                return result;            
            }
        } catch (_err) {
            console.error(_err)
        } finally {
            if (connection) {
                try {
                    console.log("Cerrando conexión ORACLE :D")
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
        return null;
    }

    
}