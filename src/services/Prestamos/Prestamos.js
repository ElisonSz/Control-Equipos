const models = require('../../models/models')
const db = models.makeDb()

module.exports = {

    getPrestamos : async ()=>{
        let result;
        try {
        await models.withTransaction(db, async ()=>{
            result = await db.query("SELECT A.ID_PRESTAMO,A.ID_USUARIO,CONCAT(U.NOMBRE,' ',U.APELLIDO) AS NOMBRE,U.CODIGO_EMPLEADO,U.CORREO AS CORREO_EMPLEADO,U.TELEFONO AS TELEFONO,(SELECT NOMBRE FROM CATEGORIAS WHERE ID_CATEGORIA=E.ID_CATEGORIA) AS CATEGORIA,E.ID_EQUIPO, E.NOMBRE AS NOMBRE_EQUIPO,E.NUMERO_SERIE AS SERIE,E.CARACTERISTICAS, A.ESTADO_SALIDA, A.ESTADO_ENTRADA, DATE_FORMAT(A.FECHA_SALIDA,'%m/%d/%Y') AS FECHA_SALIDA, DATE_FORMAT(A.FECHA_ENTRADA, '%m/%d/%Y') AS FECHA_ENTRADA, A.ID_EQUIPO FROM PRESTAMOS A INNER JOIN USUARIOS U ON A.ID_USUARIO=U.ID_USUARIO INNER JOIN EQUIPOS E ON A.ID_EQUIPO = E.ID_EQUIPO WHERE A.ESTADO = 1 AND E.ACTIVO = 1 AND E.ACTIVO=1 AND E.DISPONIBLE=1")
        })        
        } catch (err) {
            return err
        }
        return result
    },

    getIdPrestamos : async (id)=>{
        let result;
        try {
            await models.withTransaction(db,async()=>{
                result= await db.query("SELECT A.ID_PRESTAMO,A.ID_USUARIO,CONCAT(U.NOMBRE,' ',U.APELLIDO) AS NOMBRE,U.CODIGO_EMPLEADO,U.CORREO AS CORREO_EMPLEADO,U.TELEFONO AS TELEFONO,(SELECT NOMBRE FROM CATEGORIAS WHERE ID_CATEGORIA=E.ID_CATEGORIA) AS CATEGORIA,E.ID_EQUIPO, E.NOMBRE AS NOMBRE_EQUIPO,E.NUMERO_SERIE AS SERIE,E.CARACTERISTICAS, A.ESTADO_SALIDA, A.ESTADO_ENTRADA, DATE_FORMAT(A.FECHA_SALIDA,'%m/%d/%Y') AS FECHA_SALIDA, DATE_FORMAT(A.FECHA_ENTRADA, '%m/%d/%Y') AS FECHA_ENTRADA, A.ID_EQUIPO FROM PRESTAMOS A INNER JOIN USUARIOS U ON A.ID_USUARIO=U.ID_USUARIO INNER JOIN EQUIPOS E ON A.ID_EQUIPO = E.ID_EQUIPO WHERE A.ESTADO = 1 AND E.ACTIVO = 1 AND E.ACTIVO=1 AND E.DISPONIBLE=1 AND A.ID_PRESTAMO=?",[id])
            })
        } catch (err) {
            return err
        }
        return result
    },

    getDataPrestamos : async (data)=>{
        let result;
        try {
              await models.withTransaction(db, async ()=>{
                result = await db.query(data)
        })        
        } catch (err) {
            return err
        }
        
        return result
    },

    getPrestamosForDate : async (fecha_entrada,fecha_salida)=>{
        let result;
        try {
        await models.withTransaction(db, async ()=>{
            result = await db.query("SELECT A.ID_PRESTAMO,A.ID_USUARIO,CONCAT(U.NOMBRE,' ',U.APELLIDO) AS NOMBRE,U.CODIGO_EMPLEADO, E.NOMBRE AS NOMBRE_EQUIPO,E.NUMERO_SERIE, A.ESTADO_SALIDA, A.ESTADO_ENTRADA, DATE_FORMAT(A.FECHA_SALIDA,'%m/%d/%Y') AS FECHA_SALIDA, DATE_FORMAT(A.FECHA_ENTRADA, '%m/%d/%Y') AS FECHA_ENTRADA, A.ID_EQUIPO FROM prestamos A INNER JOIN usuarios U ON A.ID_USUARIO=U.ID_USUARIO INNER JOIN equipos E ON A.ID_EQUIPO = E.ID_EQUIPO WHERE A.ESTADO = 1 AND E.ACTIVO = 1 AND U.ACTIVO=1 AND E.DISPONIBLE=1 AND A.FECHA_SALIDA BETWEEN ? AND ?",[fecha_salida,fecha_entrada])
        })        
        } catch (err) {
            return err
        }
        return result
    },
    createPrestamo : async (data)=>{
        let id
        let result
        let idprestamo
        let idE
        let idEquipo
        try {

        result = await models.withTransaction(db, async ()=>{
        id = await db.query("INSERT INTO prestamos SET ?",[data])
        idprestamo = id.insertId
    
        idE = result[0].ID_EQUIPO;
        await db.query("UPDATE EQUIPOS SET DISPONIBLE=0 WHERE ID_EQUIPO=?",[idE])
            })
        } catch (err) {
            return err
        }
        return result
    },

    updatePrestamo : async (data,id)=>{
        
        let result;
        try {
            await models.withTransaction(db, async()=>{
                result = await db.query("UPDATE prestamos SET ? WHERE ID_PRESTAMO=?",[data,id])
            })
        } catch (err) {
            return err
        }
        return result
    }
}