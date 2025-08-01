'use client';
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [formData, setFormData] = useState({ nombre: "", email: "", mensaje: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Mensaje enviado correctamente");
        setFormData({ nombre: "", email: "", mensaje: "" });
      } else {
        setStatus("❌ Error enviando el mensaje");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Error de conexión");
    }
  };

  return (
    <>
      {/* HERO */}
      <section id="inicio" className="bg-gradient-to-r from-blue-100 to-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-blue-900 mb-6">
            Somos especialistas en importación de vehículos, maquinaria y más
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Control Trade Logistics ofrece soluciones puerta a puerta para tus envíos internacionales
          </p>
          <a href="#cotizacion" className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
            Solicita tu Cotización
          </a>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">Servicios Especializados</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                titulo: "Importación de Maquinaria",
                img: "/images/maquinaria.jpeg",
                desc: "Gestionamos la internación de maquinaria pesada desde cualquier país con todos los trámites aduaneros incluidos.",
              },
              {
                titulo: "Casas Rodantes y Motorhomes",
                img: "/images/motorhome.png",
                desc: "Nos especializamos en la logística y legalización de motorhomes para uso recreativo o comercial.",
              },
              {
                titulo: "Lanchas y Motos de Agua",
                img: "/images/lanchas.png",
                desc: "Transporte seguro y expedito de embarcaciones desde EE.UU. y Europa hasta su puerto de destino.",
              },
              {
                titulo: "Repuestos y Accesorios",
                img: "/images/repuestos.jpg",
                desc: "Envío y liberación rápida de repuestos automotrices y accesorios industriales.",
              },
            ].map((servicio, idx) => (
              <div
                key={idx}
                className="border border-blue-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={servicio.img}
                  alt={servicio.titulo}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    {servicio.titulo}
                  </h3>
                  <p className="text-gray-700">{servicio.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENTAJAS */}
      <section id="ventajas" className="bg-blue-50 py-16">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Trámites sin complicaciones</h3>
            <p className="text-gray-700">Nos encargamos de toda la documentación, autorizaciones y validaciones aduaneras.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Logística puerta a puerta</h3>
            <p className="text-gray-700">Recibimos tu carga, gestionamos el embarque y te lo entregamos donde lo necesites.</p>
          </div>
        </div>
      </section>

      {/* COTIZACIÓN */}
      <section id="cotizacion" className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Solicita tu Cotización</h2>
          <p className="text-gray-700 mb-8">Completa el siguiente formulario y te contactaremos a la brevedad para enviarte una propuesta personalizada.</p>

          <form className="grid gap-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500" />
            <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500" />
            <textarea name="mensaje" placeholder="Detalle de la solicitud" rows={4} value={formData.mensaje} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 placeholder-gray-500"></textarea>
            <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">Enviar Solicitud</button>
            {status && <p className="mt-2 text-center">{status}</p>}
          </form>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="bg-blue-900 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-3">Contáctanos</h3>
            <p>Email: contacto@controltrade.cl</p>
            <p>Tel: +56 9 1234 5678</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3">Ubicación</h3>
            <p>Santiago, Chile</p>
          </div>
        </div>
      </section>
    </>
  );
}
