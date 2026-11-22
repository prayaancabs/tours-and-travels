(function () {
  const packages = window.PRAYAAN_PACKAGES || [];

  const grid = document.getElementById('packageGrid');
  const durationButtons = document.querySelectorAll('.duration-pill');
  const packageModalEl = document.getElementById('packageModal');
  const previewModalEl = document.getElementById('previewPackageModal');

  const packageModal = packageModalEl && window.bootstrap ? new bootstrap.Modal(packageModalEl) : null;
  const previewModal = previewModalEl && window.bootstrap ? new bootstrap.Modal(previewModalEl) : null;

  const WHATSAPP_NUMBER = '919500530043';

  let selectedPackage = null;
  let previewMessage = '';

  const byId = id => document.getElementById(id);

  const durationMeta = {
    ALL: {
      label: 'All Packages',
      title: 'Every Mettupalayam tour route',
      hash: 'all-tour-packages'
    },
    '1D': {
      label: '1 Day',
      title: 'Same-day tour packages',
      hash: 'one-day-tour-packages'
    },
    '2D': {
      label: '2 Days',
      title: 'Short weekend packages',
      hash: 'two-day-tour-packages'
    },
    '3D': {
      label: '3 Days',
      title: 'Best family getaway plans',
      hash: 'three-day-tour-packages'
    },
    '4D': {
      label: '4 Days',
      title: 'Relaxed multi-city packages',
      hash: 'four-day-tour-packages'
    },
    '5D': {
      label: '5 Days',
      title: 'Long holiday packages',
      hash: 'five-day-tour-packages'
    },
    '6D': {
      label: '6 Days',
      title: 'Extended South India routes',
      hash: 'six-day-tour-packages'
    },
    '7D': {
      label: '7 Days',
      title: 'Full vacation packages',
      hash: 'seven-day-tour-packages'
    }
};

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));
  }

  function shortText(text, limit = 105) {
    const clean = String(text || '').trim();
    return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean;
  }

  function packageCountLabel(count) {
    return `${count} ${count === 1 ? 'package' : 'packages'}`;
  }

  function setText(id, value) {
    const el = byId(id);
    if (el) el.textContent = value || '';
  }

  function setHtml(id, value) {
    const el = byId(id);
    if (el) el.innerHTML = value || '';
  }

  function getPackageById(id) {
    return packages.find(item => String(item.id) === String(id));
  }

  function getHashId() {
    if (!window.location.hash) return '';

    try {
      return decodeURIComponent(window.location.hash.slice(1)).trim();
    } catch (error) {
      return window.location.hash.slice(1).trim();
    }
  }


  function updateDurationCounts() {
    Object.keys(durationMeta).forEach(duration => {
      const count = duration === 'ALL'
        ? packages.length
        : packages.filter(item => item.duration === duration).length;

      const countEl = byId(`count-${duration}`);
      if (countEl) countEl.textContent = packageCountLabel(count);
    });
  }

  function setActiveDuration(duration) {
    durationButtons.forEach(button => {
      button.classList.toggle('active', button.dataset.duration === duration);
    });

    const meta = durationMeta[duration] || durationMeta.ALL;

    setText('activeDurationLabel', meta.label);
    setText('activeDurationTitle', meta.title);
  }

  function renderCards(duration = 'ALL') {
    if (!grid) return;

    const filtered = duration === 'ALL'
      ? packages
      : packages.filter(item => item.duration === duration);

    setText('packageCount', packageCountLabel(filtered.length));

    if (!filtered.length) {
      grid.innerHTML = `
        <div class="tour-empty-state">
          <i class="bi bi-search"></i>
          <h4>No packages found</h4>
          <p>Please choose another duration.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <article class="tour-mini-card" id="${escapeHtml(item.id)}" data-package-id="${escapeHtml(item.id)}" tabindex="-1">
        <div class="mini-card-image">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy">
          <span class="mini-duration">${escapeHtml(item.nights)}</span>
        </div>

        <div class="mini-card-content">
          <div class="mini-card-top">
            <span>${escapeHtml(item.category || 'Tour')}</span>
            <small>${escapeHtml(item.id)}</small>
          </div>

          <h3>${escapeHtml(item.title)}</h3>

          <p class="mini-route">
            <i class="bi bi-geo-alt-fill"></i>
            <span>${escapeHtml(item.route)}</span>
          </p>

          <div class="mini-card-footer">
            <span>
              <i class="bi bi-calendar2-week"></i>
              ${escapeHtml(item.nights)}
            </span>

            <span>
              <i class="bi bi-map"></i>
              ${item.itinerary ? item.itinerary.length : 0} day plan
            </span>
          </div>

          <div class="mini-actions">
            <button class="more-details-btn" type="button" data-open-package="${escapeHtml(item.id)}" data-action="details">
              More Details
            </button>

            <button class="quick-enquire-btn" type="button" data-open-package="${escapeHtml(item.id)}" data-action="enquire">
              Enquire Now
            </button>
          </div>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('[data-open-package]').forEach(button => {
      button.addEventListener('click', () => {
        const packageId = button.dataset.openPackage;
        const action = button.dataset.action;

        if (packageId) {
          history.pushState(null, '', `#${packageId}`);
        }

        openPackage(packageId, action);
      });
    });
  }

  function activateModalTab(targetSelector) {
    if (!packageModalEl || !window.bootstrap) return;

    const trigger = packageModalEl.querySelector(`[data-bs-target="${targetSelector}"]`);
    if (!trigger) return;

    bootstrap.Tab.getOrCreateInstance(trigger).show();
  }

  function openPackage(id, action = 'details') {
    selectedPackage = getPackageById(id);
    if (!selectedPackage || !packageModal) return;

    const fromField = byId('packageFrom');
    const destinationField = byId('packageDestination');
    const dropField = byId('packageDrop');
    if (destinationField) destinationField.value = selectedPackage.title;

    setText('modalPackageDuration', selectedPackage.nights);
    setText('modalPackageTitle', selectedPackage.title);
    setText('modalPackageRoute', selectedPackage.route);

    setText('modalPackageId', selectedPackage.id);
    setText('modalOverviewDuration', selectedPackage.nights);
    setText('modalOverviewCategory', selectedPackage.category || '-');
    setText('modalOverviewRoute', selectedPackage.route);
    setText('modalOverviewSummary', selectedPackage.summary);

    const badges = [
      ...(selectedPackage.badges || []),
      selectedPackage.duration.replace('D', ' Day'),
      'From Mettupalayam'
    ];

    setHtml('modalPackageBadges', badges
      .map(badge => `<span>${escapeHtml(badge)}</span>`)
      .join(''));

    setHtml('modalItinerary', (selectedPackage.itinerary || [])
      .map((step, index) => `
        <div class="itinerary-item">
          <strong>${index + 1}</strong>
          <span>${escapeHtml(step)}</span>
        </div>
      `)
      .join(''));

    packageModal.show();

    setTimeout(() => {
      if (action === 'enquire') {
        activateModalTab('#packageEnquiryTab');
      } else {
        activateModalTab('#packageItineraryTab');
      }
    }, 120);
  }

  function scrollToPackage(id) {
    const target = byId(id);
    if (!target) return;

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    target.focus({ preventScroll: true });
    target.classList.add('highlight-package');

    setTimeout(() => {
      target.classList.remove('highlight-package');
    }, 2200);
  }

  function showFromHash() {
    const hash = window.location.hash ? window.location.hash.slice(1) : '';
    if (!hash) return false;

    const durationFromHash = Object.keys(durationMeta).find(duration => {
      return durationMeta[duration].hash === hash;
    });

    if (durationFromHash) {
      setActiveDuration(durationFromHash);
      renderCards(durationFromHash);

      setTimeout(() => {
        const target = document.getElementById(hash) || document.querySelector('.tour-browser-section');

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 180);

      return true;
    }

    const found = packages.find(item => item.id === hash);
    if (!found) return false;

    setActiveDuration(found.duration);
    renderCards(found.duration);

    setTimeout(() => {
      const target = document.getElementById(hash);

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        target.classList.add('highlight-package');

        setTimeout(() => {
          target.classList.remove('highlight-package');
        }, 2200);
      }
    }, 180);

    return true;
  }

  durationButtons.forEach(button => {
    button.addEventListener('click', () => {
      const duration = button.dataset.duration;
      const hash = button.dataset.durationHash || durationMeta[duration]?.hash;

      setActiveDuration(duration);
      renderCards(duration);

      if (hash) {
        history.pushState(null, '', `#${hash}`);
      }
    });
  });

  const goToEnquiryButtons = [
    byId('goToEnquiryTab'),
    byId('goToEnquiryTabFromItinerary')
  ];

  goToEnquiryButtons.forEach(button => {
    if (!button) return;

    button.addEventListener('click', () => {
      activateModalTab('#packageEnquiryTab');
    });
  });

  function localDateTimeMin() {
    const now = new Date();
    const pad = value => String(value).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }

  function formatLocalDateTime(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function configureDateTimeValidation() {
    const pickup = byId('packagePickupDateTime');
    const drop = byId('packageDropDateTime');
    if (!pickup || !drop) return;

    const minimum = localDateTimeMin();
    pickup.min = minimum;

    const syncDropMinimum = () => {
      drop.min = pickup.value || minimum;
      if (drop.value && pickup.value && drop.value < pickup.value) drop.value = '';
      drop.setCustomValidity('');
    };

    pickup.addEventListener('change', syncDropMinimum);
    drop.addEventListener('change', () => {
      if (pickup.value && drop.value && drop.value < pickup.value) {
        drop.setCustomValidity('Drop date and time cannot be earlier than pickup date and time.');
        drop.reportValidity();
      } else {
        drop.setCustomValidity('');
      }
    });
    syncDropMinimum();
  }

  const previewButton = byId('previewPackageBtn');

  if (previewButton) {
    previewButton.addEventListener('click', () => {
      if (!selectedPackage) return;

      const form = byId('packageEnquiryForm');
      const pickupValue = byId('packagePickupDateTime')?.value || '';
      const dropValue = byId('packageDropDateTime')?.value || '';

      if (pickupValue && dropValue && dropValue < pickupValue) {
        const dropInput = byId('packageDropDateTime');
        dropInput.setCustomValidity('Drop date and time cannot be earlier than pickup date and time.');
        dropInput.reportValidity();
        return;
      }

      if (form && !form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const data = {
        package: selectedPackage.title,
        packageId: selectedPackage.id,
        duration: selectedPackage.nights,
        route: selectedPackage.route,
        from: byId('packageFrom').value.trim(),
        destination: selectedPackage.title,
        drop: byId('packageDrop').value.trim(),
        pickupDateTime: formatLocalDateTime(pickupValue),
        dropDateTime: formatLocalDateTime(dropValue),
        vehicle: byId('vehicleSelect').value,
        passengers: byId('passengerCount').value,
        accommodation: byId('packageAccommodation').value
      };

      const itineraryText = (selectedPackage.itinerary || []).map(step => `- ${step}`).join('\n');
      const message =
`Prayaan Cabs Mettupalayam - Tour Package Enquiry

Package: ${data.package}
Package ID: ${data.packageId}
Duration: ${data.duration}
Route: ${data.route}

From: ${data.from}
Destination: ${data.destination}
Drop: ${data.drop}
Pickup: ${data.pickupDateTime}
Drop Date & Time: ${data.dropDateTime}
Vehicle: ${data.vehicle}
Passengers: ${data.passengers}
Accommodation: ${data.accommodation}

Itinerary:
${itineraryText}

Please share availability and final package details.`;

      previewMessage = encodeURIComponent(message);

      const previewLabels = {
        package: 'Package', packageId: 'Package ID', duration: 'Duration', route: 'Route',
        from: 'From', destination: 'Destination', drop: 'Drop', pickupDateTime: 'Pickup Date & Time',
        dropDateTime: 'Drop Date & Time', vehicle: 'Vehicle', passengers: 'Passengers', accommodation: 'Accommodation'
      };

      setHtml('packagePreviewContent', Object.entries(data).map(([key, value]) => `
        <div class="preview-line"><strong>${previewLabels[key]}</strong><span>${escapeHtml(value)}</span></div>
      `).join(''));

      packageModal && packageModal.hide();
      setTimeout(() => { previewModal && previewModal.show(); }, 220);
    });
  }

  const editPreviewButton = byId('editPackagePreview');

  if (editPreviewButton) {
    editPreviewButton.addEventListener('click', () => {
      previewModal && previewModal.hide();

      setTimeout(() => {
        packageModal && packageModal.show();

        setTimeout(() => {
          activateModalTab('#packageEnquiryTab');
        }, 120);
      }, 220);
    });
  }

  const sendButton = byId('sendPackageWhatsapp');

  if (sendButton) {
    sendButton.addEventListener('click', () => {
      if (!previewMessage) return;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${previewMessage}`, '_blank');
    });
  }

  updateDurationCounts();
  configureDateTimeValidation();

  if (!showFromHash()) {
    setActiveDuration('ALL');
    renderCards('ALL');
  }

  window.addEventListener('hashchange', showFromHash);
})();
