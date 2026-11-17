/* ==========================================================================
   RÍO HARDY – INTERACTIVIDAD Y FUNCIONALIDADES DINÁMICAS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar & Active Section Spy
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link spy
    const sections = ['proyecto', 'ubicacion', 'potencial', 'documentacion', 'contacto'];
    let currentSection = 'proyecto';
    const scrollPos = window.scrollY + 180;

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) {
        currentSection = id;
      }
    });

    navAnchors.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentSection}`);
    });
  });

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  navAnchors.forEach((a) => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // 2. Animated Counter & Unit Converter for 4,000 Hectáreas
  const counterEl = document.getElementById('counterHa');
  const surfaceValueEl = document.getElementById('surfaceValue');
  const surfaceToggleBtn = document.getElementById('surfaceUnitToggle');

  const animateCounter = (target, duration = 1300) => {
    if (!counterEl) return;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(eased * target);
      counterEl.textContent = val.toLocaleString('es-MX');
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counterEl.textContent = target.toLocaleString('es-MX');
      }
    };
    requestAnimationFrame(step);
  };

  animateCounter(4000);

  const surfaceUnits = [
    '4,000 HECTÁREAS',
    '40,000,000 M²',
    '9,884 ACRES (US)'
  ];
  let currentUnitIdx = 0;

  if (surfaceToggleBtn && surfaceValueEl) {
    surfaceToggleBtn.addEventListener('click', () => {
      currentUnitIdx = (currentUnitIdx + 1) % surfaceUnits.length;
      surfaceValueEl.style.opacity = '0';
      setTimeout(() => {
        surfaceValueEl.textContent = surfaceUnits[currentUnitIdx];
        surfaceValueEl.style.opacity = '1';
      }, 150);
    });
  }

  // 3. Ficha Técnica Drawer ("Conocer más del terreno")
  const toggleProyectoDrawerBtn = document.getElementById('toggleProyectoDrawer');
  const proyectoDrawer = document.getElementById('proyectoDrawer');
  const drawerBtnText = document.getElementById('drawerBtnText');

  if (toggleProyectoDrawerBtn && proyectoDrawer) {
    toggleProyectoDrawerBtn.addEventListener('click', () => {
      const isOpen = proyectoDrawer.classList.toggle('open');
      if (drawerBtnText) {
        drawerBtnText.textContent = isOpen ? 'Ocultar ficha técnica' : 'Conocer más del terreno';
      }
    });
  }

  // 4. Toggle Live Google Map in Ubicación Estratégica
  const toggleLiveMapBtn = document.getElementById('toggleLiveMapBtn');
  const liveMapDrawer = document.getElementById('liveMapDrawer');

  if (toggleLiveMapBtn && liveMapDrawer) {
    toggleLiveMapBtn.addEventListener('click', () => {
      const isOpen = liveMapDrawer.classList.toggle('open');
      toggleLiveMapBtn.classList.toggle('active', isOpen);
      const span = toggleLiveMapBtn.querySelector('span');
      if (span) {
        span.textContent = isOpen ? 'Ocultar Mapa Satelital Interactivo' : 'Ver Mapa Satelital Interactivo';
      }
    });
  }

  // 5. Interactive Potencial de Desarrollo Cards
  const sectorData = {
    agro: {
      title: 'Agroindustrial y Riego',
      badge: 'Vocación Primaria',
      desc: 'Planicie aluvial con colindancia directa al Río Colorado y Río Hardy (Burma), ideal para cultivos de exportación, forrajes de alto rendimiento, palma datilera y complejos agroindustriales con cercanía estratégica a la frontera con California y Arizona.',
      tags: ['Cultivos de Exportación', 'Doble Fuente de Agua Dulce', 'Logística Carretera 5', 'Escala Macro (4,000 Ha)']
    },
    turismo: {
      title: 'Turismo y Recreación',
      badge: 'Frente Fluvial y Estero',
      desc: 'Entorno natural privilegiado con frente al Río Hardy —único río navegable de Baja California—, el Río Colorado y el Estero del Choropo. Ideal para desarrollos ecoturísticos, marinas, clubes cinegéticos, glamping de lujo y villas campestres.',
      tags: ['Río Navegable', 'Ecoturismo y Marina', 'Estero y Laguna', 'Corredor Mexicali – San Felipe']
    },
    ganaderia: {
      title: 'Ganadería y Producción',
      badge: 'Alta Capacidad Productiva',
      desc: 'Superficie extensa de 4,000 hectáreas con disponibilidad hídrica para praderas inducidas, engorda tecnificada, producción lechera o complejos pecuarios integrados con producción propia de forraje en el mismo predio.',
      tags: ['4,000 Ha Continuas', 'Autonomía Forrajera', 'Agua Dulce Abundante', 'Fácil Acceso de Transporte']
    },
    energia: {
      title: 'Energía y Proyectos Sustentables',
      badge: 'Alta Radiación Solar',
      desc: 'Ubicado en una de las zonas con mayor irradiación solar de Norteamérica y gran extensión plana sin obstáculos, óptimo para parques fotovoltaicos a gran escala, bonos de carbono, conservación de humedales e infraestructura sustentable.',
      tags: ['Alta Irradiación Solar', 'Parques Fotovoltaicos', 'Bonos de Carbono / ESG', 'Reserva Bio-Hídrica']
    }
  };

  const potencialCards = document.querySelectorAll('.potencial-card');
  const sectorTitle = document.getElementById('sectorTitle');
  const sectorBadge = document.getElementById('sectorBadge');
  const sectorDesc = document.getElementById('sectorDesc');
  const sectorTags = document.getElementById('sectorTags');
  const sectorCtaBtn = document.getElementById('sectorCtaBtn');

  const selectSector = (key) => {
    const data = sectorData[key];
    if (!data) return;

    potencialCards.forEach((c) => {
      c.classList.toggle('active', c.dataset.sector === key);
    });

    if (sectorTitle) sectorTitle.textContent = data.title;
    if (sectorBadge) sectorBadge.textContent = data.badge;
    if (sectorDesc) sectorDesc.textContent = data.desc;
    if (sectorTags) {
      sectorTags.innerHTML = data.tags
        .map((t) => `<span class="potencial-tag">${t}</span>`)
        .join('');
    }
    if (sectorCtaBtn) {
      sectorCtaBtn.dataset.interest = data.title;
    }
  };

  potencialCards.forEach((card) => {
    card.addEventListener('click', () => selectSector(card.dataset.sector));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectSector(card.dataset.sector);
      }
    });
  });

  // Allow top highlights bar links with data-select-sector to switch sector too
  document.querySelectorAll('[data-select-sector]').forEach((item) => {
    item.addEventListener('click', () => {
      selectSector(item.dataset.selectSector);
    });
  });

  // Pre-fill form message when clicking Sector CTA or Legal Dossier CTA
  const leadMessageInput = document.getElementById('leadMessage');
  const leadNameInput = document.getElementById('leadName');

  if (sectorCtaBtn && leadMessageInput) {
    sectorCtaBtn.addEventListener('click', () => {
      const interest = sectorCtaBtn.dataset.interest || 'Agroindustrial y Riego';
      leadMessageInput.value = `Me interesa información para proyecto de: ${interest} (4,000 Ha Río Hardy).`;
      setTimeout(() => leadNameInput && leadNameInput.focus(), 500);
    });
  }

  const requestLegalDossierBtn = document.getElementById('requestLegalDossierBtn');
  if (requestLegalDossierBtn && leadMessageInput) {
    requestLegalDossierBtn.addEventListener('click', () => {
      leadMessageInput.value = 'Solicito carpeta legal y planos oficiales emitidos por INEGI para análisis.';
      setTimeout(() => leadNameInput && leadNameInput.focus(), 500);
    });
  }

  // 6. Lightbox Modal for Maps & Images
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('[data-lightbox-src]').forEach((el) => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-lightbox-src');
      const caption = el.getAttribute('data-lightbox-caption') || '';
      if (lightboxImg) lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      if (lightboxModal) lightboxModal.classList.add('open');
    });
  });

  const closeLightbox = () => {
    if (lightboxModal) lightboxModal.classList.remove('open');
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // 7. Lead Form Handling (Envío a contacto@reynosoinmobiliaria.com.mx)
  const leadForm = document.getElementById('leadForm');
  const formFeedback = document.getElementById('formFeedback');
  const targetEmail = 'contacto@reynosoinmobiliaria.com.mx';

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('leadName')?.value || '').trim();
      const email = (document.getElementById('leadEmail')?.value || '').trim();
      const phone = (document.getElementById('leadPhone')?.value || '').trim();
      const msg = (document.getElementById('leadMessage')?.value || '').trim();

      if (!name || !email || !phone) {
        formFeedback.style.color = '#ffd27d';
        formFeedback.textContent = 'Por favor completa tu nombre, correo electrónico y teléfono.';
        return;
      }

      const subject = encodeURIComponent(`Solicitud de Información: Terreno Río Hardy (4,000 Ha) - ${name}`);
      const body = encodeURIComponent(
        `Hola Mexicali Home (Reynoso & Asociados),\n\n` +
        `Solicito más información sobre el terreno en venta RÍO HARDY – GRUPO RÍO COLORADO (4,000 Hectáreas).\n\n` +
        `Datos de contacto:\n` +
        `• Nombre completo: ${name}\n` +
        `• Correo electrónico: ${email}\n` +
        `• Teléfono: ${phone}\n` +
        (msg ? `• Mensaje: ${msg}\n` : '')
      );

      const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;

      formFeedback.style.color = '#a8f0c6';
      formFeedback.innerHTML = `
        ¡Gracias, <strong>${name}</strong>! Abriendo tu cliente de correo para enviar la solicitud a <a href="${mailtoUrl}" style="text-decoration:underline; color:#f3dc99; font-weight:700;">${targetEmail}</a>
      `;
    });
  }
});
