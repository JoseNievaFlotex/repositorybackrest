import { getConnection, sql, queries } from "../database";

export const getUser = async (req, res) => 
{
    try{
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllUser);
         res.json(result.recordset);
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }
}


export const createUser = async (req, res) => 
{
    try{

        const {username, password, dateregister, dateout, typeuser } = req.body;
        let {state} = req.body;
        state = 1;
        let dateinit = req.body;
        if(username == null || password == null  || typeuser == null){
            return res.status(400).json({msg: "Bad Request. Llenar todos los campos"});
        }
    
        const pool = await getConnection();
        await pool.request()
        .input("nombre_usuario", sql.VarChar, username)
        .input("contraseña", sql.VarChar, password)
        .input("fecha_Registro", sql.Date, dateregister)
        .input("estado", sql.Bit, state)
        .input("fecha_Inicio", sql.DateTime, dateinit)
        .input("fecha_Salida", sql.DateTime, dateout)
        .input("tipo_usuario", sql.VarChar, typeuser)
        .query(queries.createUser)
    
        res.json({username, password, dateinit,dateregister, dateout, typeuser,state});
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const getUserById = async (req, res) => {
    
    const {id} = req.params;

    const pool = await getConnection();
    const result = await pool.request()
    .input("Id", id)
    .query(queries.getUserById);
    res.send(result.recordset[0]);
};

export const DeleteUserById = async (req, res) => {
    
    const {id} = req.params;

    const pool = await getConnection();
    const result = await pool.request()
    .input("Id", id)
    .query(queries.deleteUserById);

    res.sendStatus(204);
};

export const updateUserById = async ( req, res) => {
    const {username, password,typeuser} = req.body;
    const {id} = req.params;

    if((username == null || password == null || typeuser == null) )
    {
        return res.status(400).json({msg:"Bad Request. Llenar todos los campos"});
    }
    const pool = await getConnection();
     await pool.request()
     .input("nombre_usuario", sql.VarChar, username)
     .input("contraseña", sql.VarChar, password)
     .input("tipo_usuario", sql.VarChar, typeuser)
    .input('id', sql.Int, id)
    .query(queries.updateUserById);

    res.json({username, password,typeuser});
};