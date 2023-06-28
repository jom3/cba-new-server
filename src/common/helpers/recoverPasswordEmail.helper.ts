import {createTransport} from 'nodemailer';
import { InternalServerErrorException } from '@nestjs/common';
import { Persona } from 'src/personas/entities/persona.entity';

export const RecoverPasswordEmail = async (password: string, email:string) => {
  try {

    let transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
      },
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    await transporter.sendMail({
      from: `"Centro Boliviano Americano" <${process.env.MAILER_USER}>`,
      to: `${email}`,
      subject: '🌐Cento Boliviano Americano🌐',
      text: 'Reinicio de contraseña para el inicio de sesión',
      html: `
        <h1 align="center">CENTRO BOLIVIANO AMERICANO</h1>
        <h3>Datos importantes para el usuario, la institución no se hace cargo de perdidas o robo</h3>
        <p>Tu nueva contraseña es: ${password}</p>
        <h3>**Recuerda cambiar esta contraseña por otra mas segura luego de iniciar sesion por primera vez**</h3>
     `
    });

  } catch (error) {
    console.log(error)
    throw new InternalServerErrorException(error)
  }
};
