const services = require("../../services/Prestamos/Prestamos")
const helpers = require("../../helpers/helpers")
const carbone = require("carbone");
module.exports ={

    createPrestamo : async (req,res)=>{
        const data = req.body;
        
        if(data){
            let result = await services.createPrestamo(data);            
            if(result.errno){
                res.status(500).json("Error de servidor")
            }else if(result.length>0){
                res.status(201).json(result)
                
            }else { 
                res.status(400).json("Ocurrio un error")
            }
        }
    },

    getPrestamo : async (req,res)=>{
        let result = await services.getPrestamos();
        if(result.errno){
            res.status(500).json("Error de servidor")
        }else if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json(result)
        }
    },

    getDataPrestamos : async (req,res)=>{
        const data = req.params.data;
      
        console.log(data)
           let datos = helpers.query(data);

        if(datos){
            let result = await services.getDataPrestamos(datos);
            if(result.errno){
                res.status(500).json("Error de servidor")
            }else if(result.length>0){
                res.status(200).json(result)
            }else{
                res.status(404).json(result)
            }
        }else{
            res.status(400).json("Faltan datos importantes");
        }
    },

    getPrestamoForDate : async (req,res)=>{
        const data = req.body;
        const fecha_entrada = data.FECHA_ENTRADA;
        const fecha_salida = data.FECHA_SALIDA;
        console.log(data)
        if(fecha_salida && fecha_entrada){
            let result = await services.getPrestamosForDate(fecha_entrada,fecha_salida);
            if(result.errno){
                res.status(500).json("Error de servidor")
            }else if(result.length>0){
                res.status(200).json(result)
            }else{
                res.status(404).json(result)
            }
        }else{
            res.status(400).json("Faltan datos importantes");
        }
    },

    updatePrestamo : async (req,res)=>{
        const data = req.body;
        const id = data.id;
        delete data.id;
       
        if(data && id){
            let result = await services.updatePrestamo(data,id);            
            if(result.errno){
                res.status(500).json("Error de servidor")
            }else if(result.affectedRows>0){
                res.status(201).json("Se actualizó con exito")
            }else{
                res.status(400).json("No se pudo actualizar")
            }
        }else{
            res.status(400).json("Faltan datos importantes")
        }
    }
}