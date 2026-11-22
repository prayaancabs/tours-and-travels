(function () {
  const form = document.getElementById('pollachiEnquiryForm');
  if (!form) return;

  const byId = id => document.getElementById(id);
  const previewModalEl = byId('mtpPreviewModal');
  const previewModal = previewModalEl && window.bootstrap ? new bootstrap.Modal(previewModalEl) : null;
  const WHATSAPP_NUMBER = '919500530043';
  let previewMessage = '';

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function localDateTimeMin() {
    const now = new Date();
    const pad = value => String(value).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }

  function formatLocalDateTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }

  const pickup = byId('mtpPickupDateTime');
  const dropDate = byId('mtpDropDateTime');
  const minimum = localDateTimeMin();
  pickup.min = minimum;

  function syncDropMinimum() {
    dropDate.min = pickup.value || minimum;
    if (pickup.value && dropDate.value && dropDate.value < pickup.value) dropDate.value = '';
    dropDate.setCustomValidity('');
  }

  pickup.addEventListener('change', syncDropMinimum);
  pickup.addEventListener('input', syncDropMinimum);
  dropDate.addEventListener('change', () => {
    if (pickup.value && dropDate.value && dropDate.value < pickup.value) {
      dropDate.setCustomValidity('Drop date and time cannot be earlier than pickup date and time.');
      dropDate.reportValidity();
    } else {
      dropDate.setCustomValidity('');
    }
  });
  syncDropMinimum();

  byId('mtpPreviewBtn').addEventListener('click', () => {
    if (pickup.value && dropDate.value && dropDate.value < pickup.value) {
      dropDate.setCustomValidity('Drop date and time cannot be earlier than pickup date and time.');
      dropDate.reportValidity();
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const accommodation = form.querySelector('input[name="mtpAccommodation"]:checked');
    const data = {
      from: byId('mtpFrom').value.trim(),
      destination: byId('mtpDestination').value.trim(),
      drop: byId('mtpDrop').value.trim(),
      pickup: formatLocalDateTime(pickup.value),
      dropDateTime: formatLocalDateTime(dropDate.value),
      vehicle: byId('mtpVehicle').value,
      passengers: byId('mtpPassengers').value,
      accommodation: accommodation ? accommodation.value : 'No'
    };

    const labels = {
      from: 'Pickup / From',
      destination: 'Destination',
      drop: 'Drop Location',
      pickup: 'Pickup Date & Time',
      dropDateTime: 'Drop Date & Time',
      vehicle: 'Vehicle',
      passengers: 'Passengers',
      accommodation: 'Accommodation'
    };

    byId('mtpPreviewContent').innerHTML = Object.entries(data)
      .map(([key, value]) => `<div class="preview-line"><strong>${labels[key]}</strong><span>${escapeHtml(value)}</span></div>`)
      .join('');

    previewMessage = encodeURIComponent(
`Prayaan Cabs Pollachi - Travel Enquiry

Pickup / From: ${data.from}
Destination: ${data.destination}
Drop Location: ${data.drop}
Pickup Date & Time: ${data.pickup}
Drop Date & Time: ${data.dropDateTime}
Vehicle: ${data.vehicle}
Passengers: ${data.passengers}
Accommodation: ${data.accommodation}

Please share availability and trip details.`);

    previewModal && previewModal.show();
  });

  byId('mtpEditPreview').addEventListener('click', () => previewModal && previewModal.hide());
  byId('mtpSubmitWhatsapp').addEventListener('click', () => {
    if (!previewMessage) return;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${previewMessage}`, '_blank');
  });
})();
