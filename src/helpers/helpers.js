module.exports = {

    query: (data)=>{
        data = data.split(" ");
        
            let query = `SELECT A.ID_PRESTAMO,A.ID_USUARIO,CONCAT(U.NOMBRE,' ',U.APELLIDO) AS NOMBRE,U.CODIGO_EMPLEADO, E.NOMBRE AS NOMBRE_EQUIPO,E.NUMERO_SERIE, A.ESTADO_SALIDA, A.ESTADO_ENTRADA, DATE_FORMAT(A.FECHA_SALIDA,'%m/%d/%Y') AS FECHA_SALIDA, DATE_FORMAT(A.FECHA_ENTRADA, '%m/%d/%Y') AS FECHA_ENTRADA, A.ID_EQUIPO FROM PRESTAMOS A INNER JOIN USUARIOS U ON A.ID_USUARIO=U.ID_USUARIO INNER JOIN EQUIPOS E ON A.ID_EQUIPO = E.ID_EQUIPO WHERE A.ESTADO = 1 AND E.ACTIVO = 1 AND U.ACTIVO=1 AND E.DISPONIBLE=1`
    
           for(let i=0;i<data.length;i++){
                query+= ` AND (U.NOMBRE LIKE '%${data[i]}%' OR U.APELLIDO LIKE '%${data[i]}%' OR U.CODIGO_EMPLEADO LIKE '%${data[i]}%')`
            }
            return query
    }


}