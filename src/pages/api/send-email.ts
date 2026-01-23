import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

/**
 * Cargar variables de entorno:
 * 1) process.env normal (si el hosting las inyecta)
 * 2) fallback a ../.local/.env (persistente en Hostinger)
 */
dotenv.config();
dotenv.config({
  path: path.resolve(process.cwd(), "../.local/.env"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

  // Leer variables de entorno
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT || "465");
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;

  // Verificación explícita (evita errores silenciosos)
  const missing = [
    !host && "EMAIL_HOST",
    !process.env.EMAIL_PORT && "EMAIL_PORT",
    !user && "EMAIL_USER",
    !pass && "EMAIL_PASS",
    !from && "EMAIL_FROM",
    !to && "EMAIL_TO",
  ].filter(Boolean);

  if (missing.length > 0) {
    return res.status(500).json({
      message: "Faltan variables de entorno de email en el servidor",
      missing,
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // Hostinger SMTP SSL
      auth: {
        user,
        pass,
      },
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
      replyTo: email, // para responder directo al cliente
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

    return res.status(200).json({
      message: "Correo enviado correctamente",
    });
  } catch (err: unknown) {
    const e = err as {
      name?: string;
      message?: string;
      code?: string;
      response?: string;
      command?: string;
    };

    console.error("SMTP ERROR REAL:", e);

    return res.status(500).json({
      message: "Error enviando el correo",
      error: {
        name: e?.name,
        message: e?.message,
        code: e?.code,
        response: e?.response,
        command: e?.command,
      },
    });
  }
}
