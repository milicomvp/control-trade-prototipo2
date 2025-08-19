'use client';

import { useEffect, useState } from 'react';
import { useAnchorScroll } from '@/hooks/useAnchorScroll';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { navRef, scrollToId, onKeyActivate } = useAnchorScroll({
    offsetExtra: 8,
    onAfterScrollCloseMenu: () => setMenuOpen(false),
    enableHashOnLoad: true,
  });

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Cerrar con tecla ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const links = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'quienes-somos', label: 'Quiénes Somos' },
    { id: 'servicios', label: 'Servicios' },
    // { id: 'pensado-para-ti', label: 'Pensado para ti' },
    { id: 'cotizacion', label: 'Cotización' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <>
      {/* Barra superior */}
      <nav
        ref={navRef}
        className="bg-white shadow-md fixed w-full top-0 z-[50]"
        aria-label="Barra de navegación"
      >
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
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <svg
              className="w-7 h-7 text-blue-900"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => scrollToId(e, l.id)}
                onKeyDown={(e) => onKeyActivate(e, l.id)}
                className="text-blue-900 hover:text-green-600"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Menú móvil: overlay pantalla completa */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[60] bg-white md:hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Cabecera del overlay (logo + cerrar) */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center space-x-2">
              <img src="/images/logo.jpg" alt="Control Trade Logistics" className="h-12 w-auto" />
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú móvil"
              className="p-2"
            >
              <svg className="w-7 h-7 text-blue-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Lista vertical ocupando toda la pantalla */}
          <div className="px-6 py-8">
            <ul className="flex flex-col space-y-6 text-center">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => scrollToId(e, l.id)}
                    onKeyDown={(e) => onKeyActivate(e, l.id)}
                    className="block w-full text-2xl font-medium text-blue-900 hover:text-green-600 py-3"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA opcionales al final (si quieres) */}
          {/* <div className="px-6 pb-10 mt-auto">
            <a
              href="#cotizacion"
              onClick={(e) => scrollToId(e, 'cotizacion')}
              className="block w-full text-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Solicitar cotización
            </a>
          </div> */}
        </div>
      )}
    </>
  );
}
