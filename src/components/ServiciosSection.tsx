'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import Image from 'next/image';

export default function ServiciosSection() {
  const servicios = [
    {
      titulo: "Servicio Marítimo",
      img: "/images/servicio-maritimo.jpg",
      desc: `
En **CONTROL TRADE LOGISTICS** desarrollamos soluciones especializadas en transporte marítimo para cargas de gran volumen, sobredimensionadas o proyectos especiales.  
Trabajamos con los principales operadores navieros y gestionamos el tipo de contenedor más adecuado según cada operación.  
También ofrecemos la opción de carga consolidada (**LCL**), ideal para volúmenes menores, lo que permite agrupar órdenes y reducir costos.  

**Nuestra experiencia garantiza eficiencia, planificación precisa y una operación segura de principio a fin.**
      `,
    },
    {
      titulo: "Servicio Terrestre Nacional e Internacional",
      img: "/images/servicio-terrestre.jpg",
      desc: `
El sistema de gestión logística integral y multimodal de **CONTROL TRADE LOGISTICS** está diseñado para optimizar recursos y asegurar una comunicación ágil con todos los actores de la cadena de transporte.  

Coordinamos cada embarque con precisión, adaptándonos a las necesidades específicas de cada cliente.  

✅ Contamos con un equipo especializado capaz de diagnosticar, planificar y perfeccionar procesos logísticos.  
✅ Conectamos unidades de carga según el tipo y destino, en cualquier punto geográfico.  

**Entregamos soluciones dinámicas, confiables y enfocadas en resultados.**
      `,
    },
    {
      titulo: "Servicio Aéreo",
      img: "/images/servicio-aereo.jpg",
      desc: `
En **CONTROL TRADE LOGISTICS** contamos con una red global de agentes estratégicamente ubicados que nos permite gestionar operaciones aéreas de forma ágil y segura.  

✈️ Nuestro enfoque está orientado a la **eficiencia operativa** y una **respuesta rápida**, garantizando la entrega oportuna de cada embarque.  

Gracias a nuestras alianzas confiables, aseguramos soluciones personalizadas que cumplen con los tiempos exigentes del comercio internacional.  
**Siempre priorizando el cumplimiento y la trazabilidad en cada etapa del proceso.**
      `,
    },
    {
      titulo: "Seguro de Transporte de Mercancías",
      img: "/images/seguro-mercancias.jpg",
      desc: `
Proteger tu carga durante el transporte es fundamental para evitar pérdidas.  

En **CONTROL TRADE LOGISTICS** ofrecemos **seguros especializados** que cubren todos los riesgos asociados al traslado, tanto en importaciones como exportaciones.  

🔒 Adaptamos cada póliza a las particularidades de tu operación, asegurando cobertura efectiva desde el origen hasta el destino final.  

Nuestro servicio no solo protege tu inversión, también brinda **tranquilidad y respaldo** ante cualquier eventualidad que pueda surgir durante el tránsito internacional.
      `,
    },
    {
      titulo: "Transporte de Cargas de Proyectos Especiales",
      img: "/images/proyectos-especiales.jpg",
      desc: `
En **CONTROL TRADE LOGISTICS** nos especializamos en el manejo de cargas complejas, desde mercancía regular hasta sobredimensionada o fuera de estándar.  
- Brindamos soluciones logísticas a medida para cada tipo de proyecto, considerando tiempos, rutas y restricciones técnicas. 


📦 **Nuestro servicio incluye:**  
- Asesoría experta  
- Embalajes personalizados  
- Inspecciones en terreno  
- Verificación documental  
- Gestión de permisos  

Acompañamos al cliente en cada etapa del proceso, asegurando un flujo operativo **seguro, eficiente y alineado** con los requerimientos de su carga.
      `,
    },
  ];

// Tipado correcto para los componentes de Markdown (sin "any")
  const mdComponents: Components = {
    p: ({ node, ...props }) => (
      <p className="text-gray-700 leading-relaxed mb-3" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-3" {...props} />
    ),
    li: ({ node, ...props }) => <li className="marker:text-green-600" {...props} />,
    strong: ({ node, ...props }) => <strong className="text-blue-900" {...props} />,
  };

  return (
    <section id="servicios" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
          Servicios Especializados
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {servicios.map((servicio, idx) => (
            <div
              key={idx}
              className="border border-blue-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
            >
              {/* next/image para optimizar LCP y cumplir ESLint */}
              <Image
                src={servicio.img}
                alt={servicio.titulo}
                width={1200}
                height={600}
                className="w-full h-48 object-cover"
                priority={false}
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-green-700 mb-4">
                  {servicio.titulo}
                </h3>
                <ReactMarkdown components={mdComponents}>
                  {servicio.desc}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
