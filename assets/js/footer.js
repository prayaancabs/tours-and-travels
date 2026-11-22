(function () {
  const mount = document.getElementById('site-footer');
  if (!mount) return;

  const path = window.location.pathname.toLowerCase();
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
  const actionUrl = locationSection === 'coimbatore' ? '/index.html#booking' : `${sectionBase}/index.html#enquiry`;
  const privacyUrl = locationSection === 'coimbatore' ? '/privacy-policy.html' : `${sectionBase}/privacy-policy.html`;
  const deleteUrl = locationSection === 'coimbatore' ? '/delete-account.html' : `${sectionBase}/delete-account.html`;
  const areaName = isMettupalayam ? 'Mettupalayam' : (isPollachi ? 'Pollachi' : (isTiruppur ? 'Tiruppur' : (isPalakkad ? 'Palakkad' : 'Coimbatore')));

  mount.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-topline">
          <div>
            <span class="footer-kicker">Prayaan Cabs · ${areaName}</span>
            <h3>Professional travel, handled properly.</h3>
          </div>
          <div class="footer-top-actions">
            <a href="tel:+919500530043"><i class="bi bi-telephone-fill"></i> Call Reservations</a>
            <a class="footer-wa" href="https://wa.me/919500530043?text=Hello%20Prayaan%20Cabs%2C%20I%20need%20cab%20service." target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i> WhatsApp</a>
          </div>
        </div>

        <div class="footer-grid">
          <div class="footer-about">
            <a class="footer-brand" href="${homeUrl}"><img src="/images/Logo.png" alt="Prayaan Cabs logo"></a>
            <p>Premium cab rentals, tour packages, airport transfers and corporate travel support across South India.</p>
            <h5 class="footer-area-heading">Service Areas</h5>
            <div class="footer-service-tags footer-area-tags">
              <a href="/tour-packages.html">Coimbatore</a>
              <a href="/mettupalayam/tour-packages.html">Mettupalayam</a>
              <a href="/pollachi/tour-packages.html">Pollachi</a>
              <a href="/tiruppur/tour-packages.html">Tiruppur</a>
              <a href="/palakkad/tour-packages.html">Palakkad</a>
            </div>
          </div>
          <div>
            <h5>Company</h5>
            <a href="${homeUrl}">Home</a>
            <a href="${servicesUrl}">Services</a>
            <a href="${packagesUrl}">Tour Packages</a>
            <a href="${pilgrimageUrl}">Pilgrimage Tours</a>
            <a href="${fleetsUrl}">Our Fleets</a>
            <a href="${aboutUrl}">About Us</a>
          </div>
          <div>
            <h5>Support</h5>
            <a href="${privacyUrl}">Privacy Policy</a>
            <a href="${deleteUrl}">Delete Account</a>
            <a href="${actionUrl}">${locationSection === 'coimbatore' ? 'Book Online' : 'Send Enquiry'}</a>
          </div>
          <div class="footer-contact">
            <h5>Contact</h5>
            <p><i class="bi bi-telephone-fill"></i><a href="tel:+919500530043">+91 95005 30043</a></p>
            <p><i class="bi bi-envelope-fill"></i><a href="mailto:prayaancabs@gmail.com">prayaancabs@gmail.com</a></p>
            <p><i class="bi bi-geo-alt-fill"></i><span>6/391 B, Near SBIOA School, Sathyabhama Nagar, Pattanam, Coimbatore - 641016</span></p>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© 2026 Prayaan Cabs. All Rights Reserved.</span>
          <span>Designed &amp; Developed by <a href="https://marcinmind.in" rel="noopener" target="_blank">Marc in Mind Technologies</a></span>
        </div>
      </div>
    </footer>

    <div class="bottom-contact-bar" aria-label="Quick contact">
      <a href="tel:+919500530043"><i class="bi bi-telephone-fill"></i><span>Call</span></a>
      <a href="https://wa.me/919500530043?text=Hello%20Prayaan%20Cabs%2C%20I%20need%20cab%20service." rel="noopener" target="_blank"><i class="bi bi-whatsapp"></i><span>WhatsApp</span></a>
    </div>`;
})();
