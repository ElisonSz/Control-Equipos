const models = require('../../models/models')
const db = models.makeDb()

module.exports = {

    validar : async (user,pass) =>{
        let result;
        
        try {
            await models.withTransaction(db, async () =>{
                result = await db.query("SELECT ID_USUARIO,ROL FROM usuarios WHERE USUARIO=? AND PASS=?",[user,pass])
            })
        } catch (err) {
            return err
        }
        
        return result
    }

}