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

    getReservas : async ()=>{
        let result;
        try {
        await models.withTransaction(db, async ()=>{
            result = await db.query("SELECT A.ID_PRESTAMO,A.ID_USUARIO,CONCAT(U.NOMBRE,' ',U.APELLIDO) AS NOMBRE,U.CODIGO_EMPLEADO,U.CORREO AS CORREO_EMPLEADO,U.TELEFONO AS TELEFONO,(SELECT NOMBRE FROM CATEGORIAS WHERE ID_CATEGORIA=E.ID_CATEGORIA) AS CATEGORIA,E.ID_EQUIPO, E.NOMBRE AS NOMBRE_EQUIPO,E.NUMERO_SERIE AS SERIE,E.CARACTERISTICAS, A.ESTADO_SALIDA, A.ESTADO_ENTRADA, DATE_FORMAT(A.FECHA_SALIDA,'%m/%d/%Y') AS FECHA_SALIDA, DATE_FORMAT(A.FECHA_ENTRADA, '%m/%d/%Y') AS FECHA_ENTRADA, A.ID_EQUIPO FROM PRESTAMOS A INNER JOIN USUARIOS U ON A.ID_USUARIO=U.ID_USUARIO INNER JOIN EQUIPOS E ON A.ID_EQUIPO = E.ID_EQUIPO WHERE A.ESTADO = 3 AND E.ACTIVO = 1 AND E.ACTIVO=1 AND E.DISPONIBLE=1")
        })        
        } catch (err) {
            return err
        }
        return result
    },
    
     getPrestamosPendientes : async ()=>{
        let result;
        try {
        await models.withTransaction(db, async ()=>{
            result = await db.query("SELECT COUNT(*) as PRESTAMOS_PENDIENTES FROM PRESTAMOS WHERE ESTADO=1")
        })        
        } catch (err) {
            return err
        }
         console.log(result['PRESTAMOS_PENDIENTES'])
        return result
    },
    
    
    getPrestamosSolventes : async ()=>{
        let result;
        try {
        await models.withTransaction(db, async ()=>{
            result = await db.query("SELECT COUNT(*) as PRESTAMOS_SOLVENTES FROM PRESTAMOS WHERE ESTADO=2")
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

    getPrestamosForUser : async (id)=>{
        let result;
        try {
            await models.withTransaction(db,async()=>{
                result= await db.query("SELECT A.ID_PRESTAMO,A.ID_USUARIO,CONCAT(U.NOMBRE,' ',U.APELLIDO) AS NOMBRE,U.CODIGO_EMPLEADO,U.CORREO AS CORREO_EMPLEADO,U.TELEFONO AS TELEFONO,(SELECT NOMBRE FROM CATEGORIAS WHERE ID_CATEGORIA=E.ID_CATEGORIA) AS CATEGORIA,E.ID_EQUIPO, E.NOMBRE AS NOMBRE_EQUIPO,E.NUMERO_SERIE AS SERIE,E.CARACTERISTICAS, A.ESTADO_SALIDA, A.ESTADO_ENTRADA, DATE_FORMAT(A.FECHA_SALIDA,'%m/%d/%Y') AS FECHA_SALIDA, DATE_FORMAT(A.FECHA_ENTRADA, '%m/%d/%Y') AS FECHA_ENTRADA, A.ID_EQUIPO FROM PRESTAMOS A INNER JOIN USUARIOS U ON A.ID_USUARIO=U.ID_USUARIO INNER JOIN EQUIPOS E ON A.ID_EQUIPO = E.ID_EQUIPO WHERE A.ESTADO = 1 AND A.ID_USUARIO=?",[id])
            })
        } catch (err) {
            return err
        }
        return result
    },
    
    getReservaForUser : async (id)=>{
        let result;
        try {
            await models.withTransaction(db,async()=>{
                result= await db.query("SELECT A.ID_PRESTAMO,A.ID_USUARIO,CONCAT(U.NOMBRE,' ',U.APELLIDO) AS NOMBRE,U.CODIGO_EMPLEADO,U.CORREO AS CORREO_EMPLEADO,U.TELEFONO AS TELEFONO,(SELECT NOMBRE FROM CATEGORIAS WHERE ID_CATEGORIA=E.ID_CATEGORIA) AS CATEGORIA,E.ID_EQUIPO, E.NOMBRE AS NOMBRE_EQUIPO,E.NUMERO_SERIE AS SERIE,E.CARACTERISTICAS, A.ESTADO_SALIDA, A.ESTADO_ENTRADA, DATE_FORMAT(A.FECHA_SALIDA,'%m/%d/%Y') AS FECHA_SALIDA, DATE_FORMAT(A.FECHA_ENTRADA, '%m/%d/%Y') AS FECHA_ENTRADA, A.ID_EQUIPO FROM PRESTAMOS A INNER JOIN USUARIOS U ON A.ID_USUARIO=U.ID_USUARIO INNER JOIN EQUIPOS E ON A.ID_EQUIPO = E.ID_EQUIPO WHERE A.ESTADO = 3 AND A.ID_USUARIO=?",[id])
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
            result = await db.query("SELECT A.ID_PRESTAMO,A.ID_USUARIO,CONCAT(U.NOMBRE,' ',U.APELLIDO) AS NOMBRE,U.CODIGO_EMPLEADO,U.CORREO AS CORREO_EMPLEADO,U.TELEFONO AS TELEFONO,(SELECT NOMBRE FROM CATEGORIAS WHERE ID_CATEGORIA=E.ID_CATEGORIA) AS CATEGORIA,E.ID_EQUIPO, E.NOMBRE AS NOMBRE_EQUIPO,E.NUMERO_SERIE AS SERIE,E.CARACTERISTICAS, A.ESTADO_SALIDA, A.ESTADO_ENTRADA, DATE_FORMAT(A.FECHA_SALIDA,'%m/%d/%Y') AS FECHA_SALIDA, DATE_FORMAT(A.FECHA_ENTRADA, '%m/%d/%Y') AS FECHA_ENTRADA, A.ID_EQUIPO FROM PRESTAMOS A INNER JOIN USUARIOS U ON A.ID_USUARIO=U.ID_USUARIO INNER JOIN EQUIPOS E ON A.ID_EQUIPO = E.ID_EQUIPO WHERE A.ESTADO = 1 AND E.ACTIVO = 1 AND E.ACTIVO=1 AND E.DISPONIBLE=1 AND A.FECHA_SALIDA BETWEEN ? AND ?",[fecha_salida,fecha_entrada])
        })        
        } catch (err) {
            return err
        }
        return result
    },
    createPrestamo : async (data)=>{
        let id
        let result
        let idE
       let idprestamo
        try {

        result = await models.withTransaction(db, async ()=>{
        id = await db.query("INSERT INTO PRESTAMOS SET ?",[data])
        idprestamo = id.insertId
            
        idE = data.ID_EQUIPO;
        await db.query("UPDATE EQUIPOS SET DISPONIBLE=0 WHERE ID_EQUIPO=?",[idE])
            })
        } catch (err) {
            return err
        }
        
        return {result,idprestamo}
    },
    createReserva : async (data)=>{
        let id
        let result
        let idE
       let idReserva
        try {

        result = await models.withTransaction(db, async ()=>{
        id = await db.query("INSERT INTO PRESTAMOS SET ?",[data])
        idReserva = id.insertId
            await db.query("UPDATE PRESTAMOS SET ESTADO=3 WHERE=?",[idReserva])
        idE = data.ID_EQUIPO;
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
                result = await db.query("UPDATE PRESTAMOS SET ? WHERE ID_PRESTAMO=?",[data,id])
            })
        } catch (err) {
            return err
        }
        return result
    }
}
