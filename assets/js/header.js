(function () {
  const mount = document.getElementById('site-header');
  if (!mount) return;

  const path = window.location.pathname.toLowerCase();
  const page = (path.split('/').pop() || 'index.html').toLowerCase();
  const isMettupalayam = path.includes('/mettupalayam/');
  const isPollachi = path.includes('/pollachi/');
  const isTiruppur = path.includes('/tiruppur/');
  const isPalakkad = path.includes('/palakkad/');
  const locationSection = isMettupalayam ? 'mettupalayam' : (isPollachi ? 'pollachi' : (isTiruppur ? 'tiruppur' : (isPalakkad ? 'palakkad' : 'coimbatore')));
  const sectionBase = locationSection === 'coimbatore' ? '' : `/${locationSection}`;

  const homeUrl = `${sectionBase}/index.html`;
  const servicesUrl = `${sectionBase}/services.html`;
  const packagesUrl = `${sectionBase}/tour-packages.html`;
  const pilgrimageUrl = `${sectionBase}/pilgrimage-tour-packages.html`;
  const fleetsUrl = `${sectionBase}/our-fleets.html`;
  const aboutUrl = `${sectionBase}/about.html`;
  const primaryActionUrl = locationSection === 'coimbatore' ? '/index.html#booking' : `${sectionBase}/index.html#enquiry`;
  const primaryActionLabel = locationSection === 'coimbatore' ? 'Book Online' : 'Enquire Now';
  const brandLabel = isMettupalayam ? 'Prayaan Cabs Mettupalayam' : (isPollachi ? 'Prayaan Cabs Pollachi' : (isTiruppur ? 'Prayaan Cabs Tiruppur' : (isPalakkad ? 'Prayaan Cabs Palakkad' : 'Prayaan Cabs')));

  const active = (file) => page === file ? ' active' : '';
  const activeMobile = (file) => page === file ? ' active-mobile' : '';

  const tourDurations = [
    ['1 Day', 'one-day-tour-packages'],
    ['2 Days', 'two-day-tour-packages'],
    ['3 Days', 'three-day-tour-packages'],
    ['4 Days', 'four-day-tour-packages'],
    ['5 Days', 'five-day-tour-packages'],
    ['6 Days', 'six-day-tour-packages'],
    ['7 Days', 'seven-day-tour-packages']
  ];

  const pilgrimageDurations = [
    ['1 Day', '1day'],
    ['2 Days / 1 Night', '2days1night'],
    ['3 Days / 2 Nights', '3days2nights'],
    ['4 Days / 3 Nights', '4days3nights']
  ];

  const desktopTourLinks = tourDurations.map(([label, hash]) => `
    <a href="${packagesUrl}#${hash}" role="menuitem">
      <span>${label}</span>
      <i class="bi bi-arrow-right"></i>
    </a>`).join('');

  const mobileTourLinks = tourDurations.map(([label, hash]) => `
    <a href="${packagesUrl}#${hash}">${label} Tour Packages</a>`).join('');

  const desktopPilgrimageLinks = pilgrimageDurations.map(([label, hash]) => `
    <a href="${pilgrimageUrl}#${hash}" role="menuitem">
      <span>${label}</span>
      <i class="bi bi-arrow-right"></i>
    </a>`).join('');

  const mobilePilgrimageLinks = pilgrimageDurations.map(([label, hash]) => `
    <a href="${pilgrimageUrl}#${hash}">${label}</a>`).join('');

  mount.innerHTML = `
    <nav class="navbar navbar-expand-lg site-navbar fixed-top" id="siteNavbar" aria-label="Main navigation">
      <div class="container">
        <a class="navbar-brand brand-mark" href="${homeUrl}" aria-label="${brandLabel} home">
          <img src="/images/Logo.png" alt="${brandLabel}" class="brand-logo">
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu" aria-label="Open menu">
          <i class="bi bi-list"></i>
        </button>

        <div class="collapse navbar-collapse justify-content-end d-none d-lg-flex">
          <ul class="navbar-nav align-items-center">
            <li class="nav-item"><a class="nav-link${active('index.html')}" href="${homeUrl}">Home</a></li>
            <li class="nav-item"><a class="nav-link${active('services.html')}" href="${servicesUrl}">Services</a></li>
            <li class="nav-item nav-tour-dropdown">
              <a class="nav-link tour-dropdown-trigger${active('tour-packages.html')}" href="${packagesUrl}" aria-haspopup="true" aria-expanded="false">
                <span>Tour Packages</span><i class="bi bi-chevron-down"></i>
              </a>
              <div class="tour-header-dropdown" role="menu" aria-label="Tour packages by duration">
                ${desktopTourLinks}
              </div>
            </li>
            <li class="nav-item nav-tour-dropdown nav-pilgrimage-dropdown">
              <a class="nav-link tour-dropdown-trigger${active('pilgrimage-tour-packages.html')}" href="${pilgrimageUrl}" aria-haspopup="true" aria-expanded="false">
                <span>Pilgrimage Tours</span><i class="bi bi-chevron-down"></i>
              </a>
              <div class="tour-header-dropdown" role="menu" aria-label="Pilgrimage tours by duration">
                ${desktopPilgrimageLinks}
              </div>
            </li>
            <li class="nav-item"><a class="nav-link${active('our-fleets.html')}" href="${fleetsUrl}">Our Fleets</a></li>
            <li class="nav-item"><a class="nav-link${active('about.html')}" href="${aboutUrl}">About Us</a></li>
          </ul>
          <a class="nav-reservation d-none d-xl-flex" href="tel:+919500530043" aria-label="Call Prayaan Cabs">
            <i class="bi bi-telephone-fill"></i>
            <span><small>Reservations</small><strong>+91 95005 30043</strong></span>
          </a>
          <a class="nav-book-btn" href="${primaryActionUrl}"><i class="bi bi-car-front-fill"></i><span>${primaryActionLabel}</span></a>
        </div>
      </div>
    </nav>

    <div class="offcanvas offcanvas-start site-mobile-menu" id="mobileMenu" tabindex="-1" aria-label="Mobile navigation">
      <div class="offcanvas-header">
        <a href="${homeUrl}" class="mobile-menu-brand" aria-label="${brandLabel} home"><img src="/images/Logo.png" alt="${brandLabel}"></a>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="mobile-menu-label">Navigate</div>
        <a class="${activeMobile('index.html')}" href="${homeUrl}"><i class="bi bi-house-door"></i> Home</a>
        <a class="${activeMobile('services.html')}" href="${servicesUrl}"><i class="bi bi-grid"></i> Services</a>

        <div class="mobile-tour-group${page === 'tour-packages.html' ? ' active-mobile-group' : ''}">
          <button class="mobile-tour-toggle" type="button" aria-expanded="false" aria-controls="mobileTourSubmenu">
            <span><i class="bi bi-luggage"></i> Tour Packages</span>
            <i class="bi bi-chevron-down mobile-tour-chevron"></i>
          </button>
          <div class="mobile-tour-submenu" id="mobileTourSubmenu">
            ${mobileTourLinks}
          </div>
        </div>

        <div class="mobile-tour-group${page === 'pilgrimage-tour-packages.html' ? ' active-mobile-group' : ''}">
          <button class="mobile-tour-toggle" type="button" aria-expanded="false" aria-controls="mobilePilgrimageSubmenu">
            <span><i class="bi bi-bank"></i> Pilgrimage Tours</span>
            <i class="bi bi-chevron-down mobile-tour-chevron"></i>
          </button>
          <div class="mobile-tour-submenu" id="mobilePilgrimageSubmenu">
            ${mobilePilgrimageLinks}
          </div>
        </div>
        <a class="${activeMobile('our-fleets.html')}" href="${fleetsUrl}"><i class="bi bi-car-front"></i> Our Fleets</a>
        <a class="${activeMobile('about.html')}" href="${aboutUrl}"><i class="bi bi-building"></i> About Us</a>
        <a class="mobile-cta" href="${primaryActionUrl}"><i class="bi bi-car-front-fill"></i> ${primaryActionLabel}</a>
        <div class="mobile-contact-card">
          <span>Booking assistance</span>
          <a href="tel:+919500530043"><i class="bi bi-telephone-fill"></i> +91 95005 30043</a>
          <a href="https://wa.me/919500530043?text=Hello%20Prayaan%20Cabs%2C%20I%20need%20cab%20service." target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i> WhatsApp Support</a>
        </div>
      </div>
    </div>`;

  mount.querySelectorAll('.nav-tour-dropdown').forEach(desktopDropdown => {
    const desktopTrigger = desktopDropdown.querySelector('.tour-dropdown-trigger');
    if (!desktopTrigger) return;
    desktopDropdown.addEventListener('mouseenter', () => desktopTrigger.setAttribute('aria-expanded', 'true'));
    desktopDropdown.addEventListener('mouseleave', () => desktopTrigger.setAttribute('aria-expanded', 'false'));
    desktopDropdown.addEventListener('focusin', () => desktopTrigger.setAttribute('aria-expanded', 'true'));
    desktopDropdown.addEventListener('focusout', event => {
      if (!desktopDropdown.contains(event.relatedTarget)) desktopTrigger.setAttribute('aria-expanded', 'false');
    });
  });

  mount.querySelectorAll('.mobile-tour-group').forEach(mobileGroup => {
    const mobileToggle = mobileGroup.querySelector('.mobile-tour-toggle');
    if (!mobileToggle) return;
    mobileToggle.addEventListener('click', () => {
      const open = mobileGroup.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
})();
