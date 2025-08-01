import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { nombre, email, mensaje } = req.body;

  // Validaciones más estrictas
  if (
    !nombre?.trim() ||
    !email?.trim() ||
    !mensaje?.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({ message: "Datos inválidos o incompletos" });
  }

  try {
    // Configuración segura del transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: parseInt(process.env.EMAIL_PORT || "587") === 465, // true para SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verificar conexión antes de enviar
    await transporter.verify().catch((err) => {
      console.error("Error verificando conexión SMTP:", err);
      throw new Error("No se pudo establecer conexión con el servidor de correo");
    });

    // Enviar el correo
    await transporter.sendMail({
      from: `"Cotización Web" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `Nueva cotización de ${nombre}`,
      text: `
        Nombre: ${nombre}
        Email: ${email}
        Mensaje: ${mensaje}
      `,
      html: `
        <h2>Solicitud de Cotización</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    });

    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    res.status(500).json({ message: "Error enviando el correo" });
  }
}
