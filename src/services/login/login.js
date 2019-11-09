const models = require('../../models/models')
const db = models.makeDb()

module.exports = {

    validar : async (user,pass) =>{
        let result;
        
        try {
            await models.withTransaction(db, async () =>{
                result = await db.query("SELECT ID_USUARIO,ROL FROM USUARIOS WHERE USUARIO=? AND PASS=? AND ACTIVO=1",[user,pass])
            })
        } catch (err) {
            return err
        }
        
        return result
    }

}