import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { nombre, email, mensaje } = req.body as {
    nombre?: string;
    email?: string;
    mensaje?: string;
  };

  // Validación básica
  if (
    !nombre?.trim() ||
    !email?.trim() ||
    !mensaje?.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({ message: "Datos inválidos o incompletos" });
  }

  // Validación de variables de entorno (evita errores silenciosos)
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT || "465");
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;

  if (!host || !user || !pass || !from || !to || !port) {
    return res.status(500).json({ message: "Faltan variables de entorno de email en el servidor" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // ✅ Hostinger: 465 = SSL
      auth: {
        user,
        pass,
      },
      // Opcional: timeout para evitar cuelgues en producción
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 20_000,
    });

    // Verificar conexión SMTP
    await transporter.verify();

    // Enviar correo
    await transporter.sendMail({
      from: `"Cotización Web" <${from}>`,
      to,
      replyTo: email, // ✅ para que al responder, le respondan al cliente
      subject: `Nueva cotización de ${nombre}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`,
      html: `
        <h2>Solicitud de Cotización</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap">${mensaje}</p>
      `,
    });

    return res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (err: any) {
    console.error("SMTP ERROR REAL:", err);

    return res.status(500).json({
      message: "Error enviando el correo",
      error: {
        name: err?.name,
        message: err?.message,
        code: err?.code,
        response: err?.response,
        command: err?.command,
      },
    });
  }
}
