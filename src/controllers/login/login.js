const services = require("../../services/login/login")
const helpers = require("../../helpers/helpers")
module.exports = {

    validar: async (req, res) => {
        
        const data = req.body;
        const USER = data.USER;
        const PASS = data.PASS;
        
        if (USER && PASS) {
            
            let result = await services.validar(USER);
            if (result.errno) {
                res.status(500).json("Error de servidor")
            } else if (result.length > 0) {
                let comparar = await helpers.comparar(PASS,result[0].PASS)
                if(comparar){
                    ID_USUARIO = result[0].ID_USUARIO;
                ROL = result[0].ROL;
                ok = true;
                res.status(200).json({ ID_USUARIO, ROL, ok })
                }else{
                    ok = false
                    res.status(403).json({ok})
                }
                
            } else {
                ok = false
                res.status(403).json({ ok })
            }
        }else{
            res.status(400).json("Faltan datos importantes")
        }
    }
}
