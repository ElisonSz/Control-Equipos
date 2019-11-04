const models = require('../../models/models')
const db = models.makeDb()
module.exports={
    getUsers: async()=>{
        let result
        try {
            await models.withTransaction(db,async()=>{
            result = await db.query("SELECT A.ID_USUARIO,A.NOMBRE,A.APELLIDO,A.CODIGO_EMPLEADO,A.TELEFONO,A.CORREO,A.USUARIO,A.PASS,A.ROL AS ID_ROL,B.NOMBRE_ROL FROM USUARIOS A INNER JOIN ROLES B ON A.ROL=B.ID_ROL && A.ACTIVO=1");
            })
        } catch (err) {
            return err
        }
        
       return result
    },

    getOneUser: async(id)=>{
        let result
        try {
            await models.withTransaction(db,async()=>{
            result = await db.query("SELECT A.ID_USUARIO,A.NOMBRE,A.APELLIDO,A.CODIGO_EMPLEADO,A.TELEFONO,A.CORREO,A.USUARIO,A.PASS,A.ROL AS ID_ROL,B.NOMBRE_ROL FROM USUARIOS A INNER JOIN ROLES B ON A.ROL=B.ID_ROL WHERE A.ID_USUARIO=? AND A.ACTIVO = 1",[id])
            })            
        } catch (err) {
            return err
        }
        return result
    },

    createUser: async(data)=>{
        let result
        try {
             await models.withTransaction(db,async()=>{
                 result = await db.query("INSERT INTO USUARIOS SET ? ",[data])
             })
        } catch (err) {
            return err
        }
        return result
    },

    updateUser : async (data,id)=>{
        let result
        try {
            await models.withTransaction(db,async()=>{
            result = await db.query("UPDATE USUARIOS SET ? WHERE ID_USUARIO=?",[data,id])
            })
        } catch (err) {
            return err
        }
        return result
    }
}