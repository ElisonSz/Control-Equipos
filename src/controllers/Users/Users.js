const services = require('../../services/Users/Users')
const User = {}

User.getUser = async(req,res)=>{
   let result= await services.getUsers();
   if(result.errno){
       res.status(500).json(result.errno)
   }else if(result.length>0){
       res.status(200).json(result)
   }else{
       res.status(404).json(result)
   }
}

User.getOneUser = async (req,res)=>{
    const id = req.params.id;
    let result = await services.getOneUser(id);
    if(result.errno){
        res.status(500).json(result.errno)
    }else if(result.length>0){
        res.status(200).json(result)
    }else{
        res.status(404).json(result)
    }
}

User.createUser = async (req,res)=>{
    const data = req.body;
    console.log(data)
    if(data){
        let result = await services.createUser(data);
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
}

User.updateUser = async (req,res)=>{
    const data = req.body;
    const id = data.id;
    delete data.id;

    if(data && id){
        let result = await services.updateUser(data,id);
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

module.exports = User;