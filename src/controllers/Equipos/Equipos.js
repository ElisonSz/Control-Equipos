const services = require('../../services/Equipos/Equipos')
const Equipo = {}


//!>>>>>>>>>>>>>>>>>>>>EQUIPOS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!//
Equipo.getEquipos = async(req,res)=>{
    let result= await services.getEquipos();
    if(result.errno){
        res.status(500).json(result.errno)
    }else if(result.length>0){
        res.status(200).json(result)
    }else{
        res.status(404).json(result)
    }
 },
 Equipo.getOneEquipo = async (req,res)=>{
    const id = req.params.id;
    let result = await services.getOneEquipo(id);
    if(result.errno){
        res.status(500).json(result.errno)
    }else if(result.length>0){
        res.status(200).json(result)
    }else{
        res.status(404).json(result)
    }
 },
 Equipo.createEquipo = async (req,res)=>{
    const data = req.body;
    console.log(data)
    if(data){
        let result = await services.createEquipo(data);
        console.log(result)
        if(result.errno){
            res.status(500).json('Error de servidor')
        }else if(result){
            res.status(201).json("Se creo con exito")
        }else{
            res.status(400).json("No ocurrio nada")
        }
    }else{
        res.status(400).json("faltan datos importantes")
    }
 },
 Equipo.updateEquipo = async (req,res)=>{
    const data = req.body;
    const id = data.id;
    delete data.id;

    if(data && id){
        let result = await services.updateEquipo(data,id);
        if(result.errno){
            console.log(result)
            res.status(500).json("Error de servidor")
        }else if(result.affectedRows>0){
            res.status(201).json("Se actualizo con exito")
        }else{
            res.status(400).json("NO ocurrio nada")
        }
    }
 }
 //!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>CATEGORIAS-EQUIPOS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!//
Equipo.getCtEquipo = async (req,res)=>{
    
    let result= await services.getCtEquipos();
    if(result.errno){
        res.status(500).json(result.errno)
    }else if(result.length>0){
        res.status(200).json(result)
    }else{
        res.status(404).json(result)
    }
},

Equipo.getCtOneEquipo = async (req,res)=>{
    const id = req.params.id;
    let result = await services.getCtOneEquipo(id);
    if(result.errno){
        res.status(500).json(result.errno)
    }else if(result.length>0){
        res.status(200).json(result)
    }else{
        res.status(404).json(result)
    }
},

Equipo.createCtEquipo = async (req,res)=>{
    const data = req.body;
    console.log(data)
    if(data){
        let result = await services.createCtEquipo(data);
        console.log(result)
        if(result.errno){
            res.status(500).json('Error de servidor')
        }else if(result){
            res.status(201).json("Se creo con exito")
        }else{
            res.status(400).json("No ocurrio nada")
        }
    }else{
        res.status(400).json("faltan datos importantes")
    }
},

Equipo.updateCtEquipo = async (req,res)=>{
    const data = req.body;
    const id = data.id;
    delete data.id;

    if(data && id){
        let result = await services.updateCtEquipo(data,id);
        if(result.errno){
            console.log(result)
            res.status(500).json("Error de servidor")
        }else if(result.affectedRows>0){
            res.status(201).json("Se actualizo con exito")
        }else{
            res.status(400).json("NO ocurrio nada")
        }
    }
}

module.exports = Equipo;