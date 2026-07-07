
(function(){
  const modeBtns = document.querySelectorAll('.booking-mode-btn');
  const enquiryPanel = document.getElementById('enquiryPanel');
  const onlinePanel = document.getElementById('onlinePanel');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.bookingMode;
      enquiryPanel?.classList.toggle('active', mode === 'enquiry');
      onlinePanel?.classList.toggle('active', mode === 'online');
      if (mode === 'online' && typeof initAutocomplete === 'function') {
        setTimeout(initAutocomplete, 100);
      }
    });
  });

  const destination = document.getElementById('destination');
  const pickup = document.getElementById('pickup');
  const drop = document.getElementById('drop');
  const pickupDate = document.getElementById('pickupDate');
  const dropDate = document.getElementById('dropDate');
  const vehicle = document.getElementById('vehicle');
  const passengers = document.getElementById('passengers');
  const accommodation = document.getElementById('accommodation');
  const adults = document.getElementById('adults');
  const children = document.getElementById('children');
  const locationFields = document.getElementById('locationFields');
  const dateFields = document.getElementById('dateFields');
  const vehicleFields = document.getElementById('vehicleFields');
  const stayFields = document.getElementById('stayFields');
  const guestFields = document.getElementById('guestFields');
  const previewBtn = document.getElementById('previewBtn');
  const previewContent = document.getElementById('previewContent');
  const sendWhatsapp = document.getElementById('sendWhatsapp');
  const whatsappNumber = '919500530043';
  let finalMessage = '';

  function showField(field){ if(field) field.classList.add('show'); }
  function hideField(field){ if(field) field.classList.remove('show'); }
  function formatDateTime(value){
    if(!value) return '';
    return new Date(value).toLocaleString('en-IN', {
      day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit', hour12:true
    });
  }
  destination?.addEventListener('input', () => {
    if(destination.value.trim().length > 1) showField(locationFields);
  });
  [pickup, drop].forEach(input => input?.addEventListener('input', () => {
    if(pickup?.value.trim() && drop?.value.trim()) showField(dateFields);
  }));
  [pickupDate, dropDate].forEach(input => input?.addEventListener('change', () => {
    if(pickupDate?.value && dropDate?.value) showField(vehicleFields);
  }));
  [vehicle, passengers].forEach(input => {
    input?.addEventListener('input', () => { if(vehicle?.value && passengers?.value) showField(stayFields); });
    input?.addEventListener('change', () => { if(vehicle?.value && passengers?.value) showField(stayFields); });
  });
  accommodation?.addEventListener('change', () => {
    if(accommodation.value === 'Yes') showField(guestFields);
    else { hideField(guestFields); if(adults) adults.value=''; if(children) children.value=''; }
  });
  function validateForm(){
    if(!destination?.value.trim()){ alert('Please enter where you are planning to visit.'); return false; }
    if(!pickup?.value.trim() || !drop?.value.trim()){ alert('Please enter pickup and drop location.'); return false; }
    if(!pickupDate?.value || !dropDate?.value){ alert('Please select pickup and drop date/time.'); return false; }
    if(!vehicle?.value || !passengers?.value){ alert('Please select vehicle and passenger count.'); return false; }
    if(!accommodation?.value){ alert('Please select accommodation option.'); return false; }
    if(accommodation.value === 'Yes' && (!adults?.value || children?.value === '')){
      alert('Please enter adult and child count.'); return false;
    }
    return true;
  }
  previewBtn?.addEventListener('click', () => {
    if(!validateForm()) return;
    const stayNeeded = accommodation.value;
    finalMessage = `Hello Prayaan Cabs,\n\nI want to enquire about a trip.\n\nDestination: ${destination.value}\nPickup Location: ${pickup.value}\nDrop Location: ${drop.value}\nPickup Date & Time: ${formatDateTime(pickupDate.value)}\nDrop Date & Time: ${formatDateTime(dropDate.value)}\nVehicle: ${vehicle.value}\nPassenger Count: ${passengers.value}\nAccommodation Needed: ${stayNeeded}\n${stayNeeded === 'Yes' ? `Adult Count: ${adults.value}\nChild Count: ${children.value}\nNote: Children above 10 years will be considered as adults.` : ''}\n\nPlease share the package details.`;
    if(previewContent){
      previewContent.innerHTML = `
        <p><strong>Destination:</strong> ${destination.value}</p>
        <p><strong>Pickup:</strong> ${pickup.value}</p>
        <p><strong>Drop:</strong> ${drop.value}</p>
        <p><strong>Pickup Date & Time:</strong> ${formatDateTime(pickupDate.value)}</p>
        <p><strong>Drop Date & Time:</strong> ${formatDateTime(dropDate.value)}</p>
        <p><strong>Vehicle:</strong> ${vehicle.value}</p>
        <p><strong>Passengers:</strong> ${passengers.value}</p>
        <p><strong>Accommodation:</strong> ${stayNeeded}</p>
        ${stayNeeded === 'Yes' ? `<p><strong>Adults:</strong> ${adults.value}</p><p><strong>Children:</strong> ${children.value}</p><p><strong>Note:</strong> Children above 10 years will be considered as adults.</p>` : ''}`;
    }
    bootstrap.Modal.getOrCreateInstance(document.getElementById('previewModal')).show();
  });
  sendWhatsapp?.addEventListener('click', () => {
    if(!finalMessage) return;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMessage)}`, '_blank');
  });
})();
