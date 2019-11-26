const models = require('../../models/models')
const db = models.makeDb()

module.exports = {

    validar : async (user) =>{
        let result;
        
        try {
            await models.withTransaction(db, async () =>{
                result = await db.query("SELECT ID_USUARIO,ROL,PASS FROM USUARIOS WHERE USUARIO=? AND ACTIVO=1",[user])
            })
        } catch (err) {
            return err
        }
        
        return result
    }

}