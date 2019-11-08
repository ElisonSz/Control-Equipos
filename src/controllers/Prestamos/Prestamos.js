const services = require("../../services/Prestamos/Prestamos")
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

    updatePrestamo : async (req,res)=>{
        const data = req.body;
        const id = data.id;
        delete data.id;

    }
}