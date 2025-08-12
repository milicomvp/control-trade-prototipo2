import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Método no permitido" });

  const { nombre, email, mensaje } = req.body;

  // Validación básica
  if (
    !nombre?.trim() ||
    !email?.trim() ||
    !mensaje?.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({ message: "Datos inválidos o incompletos" });
  }

  try {
    const port = parseInt(process.env.EMAIL_PORT || "587");
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port,
      secure: port === 465, // SSL si es 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verificar conexión SMTP
    await transporter.verify();

    // Enviar correo
    await transporter.sendMail({
      from: `"Cotización Web" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `Nueva cotización de ${nombre}`,
      html: `
        <h2>Solicitud de Cotización</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap">${mensaje}</p>
      `,
    });

    return res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (err) {
    console.error("SMTP error:", err);
    return res.status(500).json({ message: "Error enviando el correo" });
  }
}
