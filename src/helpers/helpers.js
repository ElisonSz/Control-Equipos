const cryptojs = require('crypto-js');
const bcrypt = require('bcrypt')
module.exports = {

    query: (data)=>{
        data = data.split(" ");
        
            let query = `SELECT A.ID_PRESTAMO,A.ID_USUARIO,CONCAT(U.NOMBRE,' ',U.APELLIDO) AS NOMBRE,U.CODIGO_EMPLEADO,U.CORREO AS CORREO_EMPLEADO,U.TELEFONO AS TELEFONO,(SELECT NOMBRE FROM CATEGORIAS WHERE ID_CATEGORIA=E.ID_CATEGORIA) AS CATEGORIA,E.ID_EQUIPO, E.NOMBRE AS NOMBRE_EQUIPO,E.NUMERO_SERIE AS SERIE,E.CARACTERISTICAS, A.ESTADO_SALIDA, A.ESTADO_ENTRADA, DATE_FORMAT(A.FECHA_SALIDA,'%m/%d/%Y') AS FECHA_SALIDA, DATE_FORMAT(A.FECHA_ENTRADA, '%m/%d/%Y') AS FECHA_ENTRADA, A.ID_EQUIPO FROM PRESTAMOS A INNER JOIN USUARIOS U ON A.ID_USUARIO=U.ID_USUARIO INNER JOIN EQUIPOS E ON A.ID_EQUIPO = E.ID_EQUIPO WHERE A.ESTADO = 1 AND E.ACTIVO = 1 AND E.ACTIVO=1 AND E.DISPONIBLE=1`
    
           for(let i=0;i<data.length;i++){
                query+= ` AND (U.NOMBRE LIKE '%${data[i]}%' OR U.APELLIDO LIKE '%${data[i]}%' OR U.CODIGO_EMPLEADO LIKE '%${data[i]}%' OR E.NOMBRE LIKE '%${data[i]}%' OR A.ID_PRESTAMO LIKE '%${data[i]}%')`
            }
            return query
    },

    addDate: (datos)=>{
    
       
       let hoy = new Date();
            let hora = hoy.getHours();
            let minutos = hoy.getMinutes();
            let segundos = hoy.getSeconds();
            let dd=hoy.getDate();
            let mm=hoy.getMonth()+1;
            let yyyy = hoy.getFullYear();
            if(mm<10){
                mm= '0' + mm;
            }
            if(dd<10){
                dd= '0' + dd;
            }
            if(minutos<10){
                minutos= '0' + minutos;
            }
    
            if(segundos<10){
                segundos= '0' + segundos;
            }
            datos['fecha_impreso'] = `${dd}/${mm}/${yyyy}`
           
        
    },


    encrypt: async (pass) =>{
        const hash = await bcrypt.hash(pass,10)
        return hash
    },
    comparar: async (pass,hash)=>{
        const result = await bcrypt.compare(pass,hash)
        return result
    },


}
