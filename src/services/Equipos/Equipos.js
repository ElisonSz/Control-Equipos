const models = require('../../models/models')
const db = models.makeDb()
module.exports={
    //!>>>>>>>>>>>>>>>>>>>>EQUIPOS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!//
    getEquipos : async ()=>{
        let result;

        try {
            await models.withTransaction(db,async()=>{
                result = await db.query("SELECT A.ID_EQUIPO, A.NOMBRE, A.CARACTERISTICAS,B.NOMBRE AS CATEGORIA, A.NUMERO_SERIE, A.ID_CATEGORIA, A.ACTIVO, A.DISPONIBLE FROM EQUIPOS A INNER JOIN CATEGORIAS B ON A.ID_CATEGORIA = B.ID_CATEGORIA")
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
                result = await db.query("SELECT A.ID_EQUIPO, A.NOMBRE, A.CARACTERISTICAS,B.NOMBRE AS CATEGORIA, A.NUMERO_SERIE, A.ID_CATEGORIA, A.ACTIVO, A.DISPONIBLE FROM EQUIPOS A INNER JOIN CATEGORIAS B ON A.ID_CATEGORIA = B.ID_CATEGORIA WHERE A.ID_EQUIPO=?",[id])
            })
        } catch (err) {
            return err
        }
        return result
    },

    createEquipo : async (data) =>{
        let result;
        try {
            await models.withTransaction(db,async()=>{
                result = await db.query("INSERT INTO EQUIPOS SET ?",[data])
            })
        } catch (err) {
            return err
        }
        return result
    },

    updateEquipo : async (data,id)=>{
        let result;
        try {
            await models.withTransaction(db,async()=>{
                result = await db.query("UPDATE EQUIPOS SET ? WHERE ID_EQUIPO= ?",[data,id])
            })
        } catch (err) {
            return err
        }
        console.log(result)
        return result;
    },
   //!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>CATEGORIA-EQUIPOS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!//

   getCtEquipos : async ()=>{
    let result;
    try {
    await models.withTransaction(db,async()=>{
        result = await db.query("SELECT ID_CATEGORIA,NOMBRE,DESCRIPCION FROM CATEGORIAS");
    })        
    } catch (err) {
        return err
    }
    
    return result;
   },

   getCtOneEquipo : async (id)=>{
       let result;
       try {
        await models.withTransaction(db,async()=>{
            result = await db.query("SELECT ID_CATEGORIA,NOMBRE,DESCRIPCION FROM CATEGORIAS WHERE ID_CATEGORIA=?",[id])
        })           
       } catch (err) {
           return err
       }
       return result;
   },

   createCtEquipo : async (data)=>{
       let result;
       try {
           await models.withTransaction(db, async()=>{
               result = await db.query("INSERT INTO CATEGORIAS SET ?",[data])
           })
       } catch (err) {
           return err
       }
       return result
   },

   updateCtEquipo : async (data,id)=>{
       let result;
       try {
           await models.withTransaction(db, async()=>{
               result = await db.query("UPDATE EQUIPOS SET ? WHERE ID_CATEGORIA=?",[data,id])
           })
       } catch (err) {
           return err
       }
       return result
   } 
}