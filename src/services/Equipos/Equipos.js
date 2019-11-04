const models = require('../../models/models')
const db = models.makeDb()
module.exports={
    
    getEquipos : async ()=>{
        let result;

        try {
            await models.withTransaction(db,async()=>{
                result = await db.query("SELECT A.ID_EQUIPO, A.NOMBRE, A.CARACTERISTICAS, A.NUMERO_SERIE, A.ID_CATEGORIA, A.ACTIVO, A.DISPONIBLE FROM EQUIPOS A INNER JOIN CATEGORIAS B ON A.ID_CATEGORIA = B.ID_CATEGORIA")
            })
        } catch (err) {
            return err
        }
        return result
    },

    getOneEquipo : async (id)=>{
        let result;

        try {
            await models.withTransaction(db,async()=>{
                result = await db.query("SELECT A.ID_EQUIPO, A.NOMBRE, A.CARACTERISTICAS, A.NUMERO_SERIE, A.ID_CATEGORIA, A.ACTIVO, A.DISPONIBLE FROM EQUIPOS A INNER JOIN CATEGORIAS B ON A.ID_CATEGORIA = B.ID_CATEGORIA WHERE A.ID_EQUIPO=?",[id])
            })
        } catch (err) {
            return err
        }
        return result
    }
    
}