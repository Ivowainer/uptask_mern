import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
    console.log(datos)
    const { email, nombre, token } = datos

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "fc959e27a5362c",
          pass: "55279fb2973de4"
        }
    });

    // Información del email
    const info = await transport.sendMail({
        from: ' "Uptask - Administrador de Proyectos" <cuentas@uptask.com>', 
        to: email,
        subject: "Uptask - Confirma tu cuenta",
        text: "Confirma tu cuenta en UpTask",
        html: `
            <p>Hola: ${nombre}, confirma tu cuenta en UpTask</p>
            <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta </a>
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    })
}
