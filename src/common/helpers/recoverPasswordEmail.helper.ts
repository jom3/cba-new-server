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
        user: "joamsmg@gmail.com",
        pass: "qfnvrvrgxlmqemee"
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
      from: `"Fred Fooo 👻" <joamsmg@gmail.com>`,
      to: `${email}`,
      subject: 'Hello ✔',
      text: 'Hello world?',
      html: `
        <h1>password</h1>
        <p>Tu usuario es: ${email}</p>
        <p>Tu contraseña es: ${password}</p>
     `
    });

  } catch (error) {
    console.log(error)
    throw new InternalServerErrorException(error)
  }
};
