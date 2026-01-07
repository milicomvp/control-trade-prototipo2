'use client';
import { useState } from "react";
import ServiciosSection from "@/components/ServiciosSection";


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
            Desde tu primera importación hasta el éxito global
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Somos especialistas en logística internacional para importadores, exportadores y PYMEs.
            <br />
            Con metodología, control y eficiencia, llevamos tu operación al siguiente nivel.
          </p>

          {/* Contenedor de botones */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="#cotizacion"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Cotiza tu operación
            </a>
            <a
              href="#cotizacion"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Solicita asesoría gratuita
            </a>
          </div>
        </div>
      </section>


      {/* QUIÉNES SOMOS */}
      <section id="quienes-somos" className="bg-blue-50 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center md:text-left">
          {/* Título */}
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Quiénes Somos
          </h2>

          {/* Contenido */}
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              En <strong>Control Trade Logistics SPA</strong> ayudamos a importadores, exportadores y PYMEs a
              gestionar sus operaciones de comercio exterior con rapidez, eficiencia y una
              metodología clara.
            </p>
            <p>
              Somos una empresa nueva, pero fundada sobre más de 21 años de experiencia en el
              rubro logístico, especialmente en freight forwarding, manejo de cargas de proyecto,
              coordinación de transporte internacional y operaciones de importación y exportación.
            </p>
            <p>
              Nuestro fundador, <strong>Javier Herrera Jorquera</strong>, ha desarrollado su trayectoria en
              empresas líderes del sector, desempeñando roles clave en la coordinación operativa y
              comercial. Su enfoque combina visión estratégica, capacidad de ejecución y un
              profundo conocimiento del comercio internacional.
            </p>
            <p>
              Conocemos los desafíos reales de quienes comienzan a importar o exportar, así como
              las exigencias de quienes ya están en movimiento. Por eso, ofrecemos soluciones
              integrales con un alto estándar de control, comunicación y responsabilidad.
            </p>
            <p>
              No solo movemos carga, impulsamos tu negocio.
            </p>
          </div>

          {/* Cita / Promesa */}
          <blockquote className="mt-8 text-lg font-semibold text-blue-800 italic text-center">
            “Nuestra promesa: metodología, control y soluciones reales para tu negocio internacional.”
          </blockquote>
        </div>
      </section>


      {/* SERVICIOS */}
      <ServiciosSection/>
      

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
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Cobertura internacional</h3>
            <p className="text-gray-700">Red global de agentes y aliados estratégicos para tus envíos.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Metodología y control</h3>
            <p className="text-gray-700">Aplicamos procedimientos probados con seguimiento profesional en cada etapa.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Rapidez operativa</h3>
            <p className="text-gray-700">Optimizamos tiempos y procesos desde origen hasta destino.</p>
          </div>
        </div>
      </section>

      {/* PENSADO PARA TI */}
      <section id="pensado-para-ti" className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Título */}
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            Pensado para ti
          </h2>

          {/* Lista de elementos */}
          <ul className="space-y-4 text-lg text-gray-700 mb-8">
            <li className="flex items-center justify-center space-x-2">
              <span className="text-green-600 text-xl">✔</span>
              <span>Nuevos Importadores</span>
            </li>
            <li className="flex items-center justify-center space-x-2">
              <span className="text-green-600 text-xl">✔</span>
              <span>Exportadores en expansión</span>
            </li>
            <li className="flex items-center justify-center space-x-2">
              <span className="text-green-600 text-xl">✔</span>
              <span>PYMEs que buscan internacionalizarse</span>
            </li>
          </ul>

          {/* Pie de sección */}
          <p className="text-xl font-bold text-blue-900 mb-8">
            Conectamos tu negocio con el mundo.
          </p>
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
            <textarea name="mensaje" placeholder="Detalle de la solicitud" rows={4} value={formData.mensaje} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-600"></textarea>
            <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">Enviar Solicitud</button>
            {status && <p className="mt-2 text-center text-gray-500">{status}</p>}
          </form>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="bg-blue-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-3">Contáctanos</h3>
            <p>Email: javier.herrera@controltradelogistics.com</p>
            <p>Tel: +56 9 9516 8240</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3">Ubicación</h3>
            <p>Hernan Cortez Nro.2974, Ñuñoa, Santiago de Chile.</p>
          </div>
        </div>
      </section>
    </>
  );
}
