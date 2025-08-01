'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="#inicio" className="flex items-center space-x-2">
          <img src="/images/logo.jpg" alt="Control Trade Logistics" className="h-14 w-auto" />
        </Link>

        {/* Botón para menú móvil */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6 text-blue-900"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                menuOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16M4 18h16'
              }
            />
          </svg>
        </button>

        {/* Menú principal */}
        <div
          className={`md:flex space-x-6 ${
            menuOpen ? 'block mt-4' : 'hidden'
          } md:block`}
        >
          <a href="#inicio" className="text-blue-900 hover:text-green-600">
            Inicio
          </a>
          <a href="#servicios" className="text-blue-900 hover:text-green-600">
            Servicios
          </a>
          <a href="#ventajas" className="text-blue-900 hover:text-green-600">
            Ventajas
          </a>
          <a href="#cotizacion" className="text-blue-900 hover:text-green-600">
            Cotización
          </a>
          <a href="#contacto" className="text-blue-900 hover:text-green-600">
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
}
