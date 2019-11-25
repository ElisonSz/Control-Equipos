const template = "./plantillas/prestamos.odt"
const services = require("../../services/Prestamos/Prestamos")
const helpers = require("../../helpers/helpers")
const carbone = require("carbone");
const fs = require('fs');
const path = require('path')

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

        const data = req.data;
        if(!data){
            let result = await services.getPrestamos();
            if(result.errno){
                res.status(500).json("Error de servidor")
            }else if(result.length>0){
                res.status(200).json(result)
            }else{
                res.status(404).json(result)
            }

        }else{
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
        }
    },
    getIdPrestamo : async (req,res)=>{
        const id = req.params.id;
        let options = {
            convertTo : 'pdf' //can be docx, txt, ...
        };
        let result = await services.getIdPrestamos(id);
        if(result.errno){
            res.status(500).json("Error de servidor")
        }else if(result.length>0){
            console.table(result)
            helpers.addDate(result[0])
           carbone.render(template,result[0],options,(err,reporte)=>{
            if(err){
                res.status(500).json(err)
            }else{
                fs.writeFile("./tmp/simple.pdf",reporte,(err)=>{
                    if(err) return res.status(500).json(err)
                    res.type('application/pdf')
                    fs.unlinkSync("./tmp/simple.pdf")
                    return res.send(reporte)
                })
            }
           })
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