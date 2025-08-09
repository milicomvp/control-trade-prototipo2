'use client';

import { useState } from 'react';
import { useAnchorScroll } from '@/hooks/useAnchorScroll';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { navRef, scrollToId, onKeyActivate } = useAnchorScroll({
    offsetExtra: 8,
    onAfterScrollCloseMenu: () => setMenuOpen(false),
    enableHashOnLoad: true,
  });

  return (
    <nav ref={navRef} className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => scrollToId(e, 'inicio')}
          onKeyDown={(e) => onKeyActivate(e, 'inicio')}
          className="flex items-center space-x-2"
        >
          <img src="/images/logo.jpg" alt="Control Trade Logistics" className="h-14 w-auto" />
        </a>

        {/* Botón móvil */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Menú */}
        <div className={`md:flex space-x-6 ${menuOpen ? 'block mt-4' : 'hidden'} md:block`}>
          <a href="#inicio" onClick={(e) => scrollToId(e, 'inicio')} onKeyDown={(e) => onKeyActivate(e, 'inicio')} className="text-blue-900 hover:text-green-600">
            Inicio
          </a>
          <a href="#quienes-somos" onClick={(e) => scrollToId(e, 'quienes-somos')} onKeyDown={(e) => onKeyActivate(e, 'quienes-somos')} className="text-blue-900 hover:text-green-600">
            Quiénes Somos
          </a>
          <a href="#porqueelegirnos" onClick={(e) => scrollToId(e, 'porqueelegirnos')} onKeyDown={(e) => onKeyActivate(e, 'porqueelegirnos')} className="text-blue-900 hover:text-green-600">
            ¿Por qué elegirnos?
          </a>
          <a href="#pensado-para-ti" onClick={(e) => scrollToId(e, 'pensado-para-ti')} onKeyDown={(e) => onKeyActivate(e, 'pensado-para-ti')} className="text-blue-900 hover:text-green-600">
            Pensado para ti
          </a>
          <a href="#cotizacion" onClick={(e) => scrollToId(e, 'cotizacion')} onKeyDown={(e) => onKeyActivate(e, 'cotizacion')} className="text-blue-900 hover:text-green-600">
            Cotización
          </a>
          <a href="#contacto" onClick={(e) => scrollToId(e, 'contacto')} onKeyDown={(e) => onKeyActivate(e, 'contacto')} className="text-blue-900 hover:text-green-600">
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
}
