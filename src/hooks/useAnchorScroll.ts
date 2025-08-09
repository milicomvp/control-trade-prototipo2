'use client';

import { useEffect, useRef, useState } from 'react';

type Options = {
  offsetExtra?: number;             // margen adicional sobre el alto del navbar
  onAfterScrollCloseMenu?: () => void; // callback para cerrar menú móvil
  enableHashOnLoad?: boolean;       // ajusta scroll si la página carga con #hash
};

export function useAnchorScroll({
  offsetExtra = 8,
  onAfterScrollCloseMenu,
  enableHashOnLoad = true,
}: Options = {}) {
  const navRef = useRef<HTMLElement | null>(null);
  const [navHeight, setNavHeight] = useState(0);

  // Mide la altura del navbar y actualiza en resize
  useEffect(() => {
    const update = () => setNavHeight(navRef.current?.offsetHeight || 0);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Si llega un hash en la URL, corrige el scroll al montar
  useEffect(() => {
    if (!enableHashOnLoad) return;
    if (typeof window === 'undefined') return;

    const hash = window.location.hash?.replace('#', '');
    if (!hash) return;

    const el = document.getElementById(hash);
    if (!el) return;

    // esperar al paint para tener medidas correctas
    requestAnimationFrame(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - navHeight - offsetExtra;
      window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior }); // sin animación al cargar
    });
  }, [enableHashOnLoad, navHeight, offsetExtra]);

  // Scroll con offset y cierre del menú
  const scrollToId = (e: React.MouseEvent | React.KeyboardEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - navHeight - offsetExtra;
    window.scrollTo({ top: y, behavior: 'smooth' });
    history.replaceState?.(null, '', `#${id}`);
    onAfterScrollCloseMenu?.();
  };

  // Handler accesible para teclado (Enter/Espacio)
  const onKeyActivate = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      scrollToId(e, id);
    }
  };

  return { navRef, scrollToId, onKeyActivate };
}
