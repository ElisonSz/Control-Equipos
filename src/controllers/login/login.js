const services = require("../../services/login/login")

module.exports = {

    validar: async (req, res) => {
        const data = req.body;
        const user = data.user;
        const pass = data.pass;

        if (user && pass) {
            let result = await services.validar(user, pass);
            if (result.errno) {
                res.status(500).json("Error de servidor")
            } else if (result.length > 0) {

                ID_USUARIO = result[0].ID_USUARIO;
                ROL = result[0].ROL;
                ok = true;
                res.status(200).json({ ID_USUARIO, ROL, ok })
            } else {
                ok = false
                res.status(403).json({ ok })
            }
        }
    },

    logout: async (req, res) => {

    }
}
