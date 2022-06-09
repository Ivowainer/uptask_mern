import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"

export const registrar = async (req, res) => {
    const { email } = req.body

    //Evitar registros duplicados
    const existeUsuario = await Usuario.findOne({ email })

    if(existeUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ msg: error.message })
    }

    //Guarda usuario 
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId()

        const usuarioAlmacenado = await usuario.save()

        res.json(usuarioAlmacenado)

    } catch (error) {
        console.log(error)
    }
}

export const autenticar = async (req, res) => {
    const { email, password } = req.body

    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email })

    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message })
    }

    //Comprobar si el usuario está confirmado
    if(!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({ msg: error.message })
    }

    //Comprobar password
    if(await usuario.comprobarPassword(password)){
        console.log('es correcto')
    } else {
        const error = new Error('La contraseña es incorrecta')
        return res.status(403).json({ 
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
         })
    }
}

export const confirmar = async (req, res) => {
    res.send(req.params.token)
}