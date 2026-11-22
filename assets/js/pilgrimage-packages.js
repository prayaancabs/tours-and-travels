(function () {
  const packages = window.PRAYAAN_PILGRIMAGE_PACKAGES || [];
  const config = window.PRAYAAN_PILGRIMAGE_CONFIG || {};
  const origin = config.origin || 'Coimbatore';
  const brand = config.brand || 'Prayaan Cabs';
  const WHATSAPP_NUMBER = '919500530043';

  const byId = id => document.getElementById(id);
  const grid = byId('packageGrid');
  const buttons = document.querySelectorAll('.duration-pill');
  const packageModalEl = byId('packageModal');
  const previewModalEl = byId('previewPackageModal');
  const packageModal = packageModalEl && window.bootstrap ? new bootstrap.Modal(packageModalEl) : null;
  const previewModal = previewModalEl && window.bootstrap ? new bootstrap.Modal(previewModalEl) : null;
  let selectedPackage = null;
  let previewMessage = '';

  const durationMeta = {
    ALL: {label:'All Packages', title:`All pilgrimage routes from ${origin}`, hash:'all-pilgrimage-packages'},
    '1D': {label:'1 Day', title:'Nearby same-day pilgrimage trips', hash:'1day'},
    '2D': {label:'2 Days / 1 Night', title:'Major pilgrimage destinations', hash:'2days1night'},
    '3D': {label:'3 Days / 2 Nights', title:'Temple combinations and circuits', hash:'3days2nights'},
    '4D': {label:'4 Days / 3 Nights', title:'Extended pilgrimage circuits', hash:'4days3nights'}
  };

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  }
  function setText(id, value) { const el=byId(id); if(el) el.textContent=value || ''; }
  function setHtml(id, value) { const el=byId(id); if(el) el.innerHTML=value || ''; }
  function countLabel(n) { return `${n} ${n===1?'package':'packages'}`; }
  function getPackage(id) { return packages.find(item => item.id === id); }

  function updateCounts() {
    Object.keys(durationMeta).forEach(d => {
      const n = d === 'ALL' ? packages.length : packages.filter(p => p.duration === d).length;
      const el = byId(`count-${d}`); if(el) el.textContent = countLabel(n);
    });
  }

  function setActive(d) {
    buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.duration === d));
    const meta = durationMeta[d] || durationMeta.ALL;
    setText('activeDurationLabel', meta.label);
    setText('activeDurationTitle', meta.title);
  }

  function render(d='ALL') {
    if(!grid) return;
    const filtered = d === 'ALL' ? packages : packages.filter(p => p.duration === d);
    setText('packageCount', countLabel(filtered.length));
    grid.innerHTML = filtered.map(item => `
      <article class="tour-mini-card pilgrimage-card" id="${escapeHtml(item.id)}" data-package-id="${escapeHtml(item.id)}" tabindex="-1">
        <div class="mini-card-image">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" onerror="this.onerror=null;this.src='/images/bg.jpg';">
          <span class="mini-duration">${escapeHtml(item.nights)}</span>
        </div>
        <div class="mini-card-content">
          <div class="mini-card-top"><span>${escapeHtml(item.category)}</span><small>#${escapeHtml(item.id)}</small></div>
          <h3>${escapeHtml(item.title)}</h3>
          <p class="mini-route"><i class="bi bi-geo-alt-fill"></i><span>${escapeHtml(item.route)}</span></p>
          <div class="mini-card-footer">
            <span><i class="bi bi-calendar2-week"></i>${escapeHtml(item.nights)}</span>
            <span><i class="bi bi-map"></i>${item.itinerary.length} day plan</span>
          </div>
          <div class="mini-actions">
            <button class="more-details-btn" type="button" data-open-package="${escapeHtml(item.id)}" data-action="details">More Details</button>
            <button class="quick-enquire-btn" type="button" data-open-package="${escapeHtml(item.id)}" data-action="enquire">Enquire Now</button>
          </div>
        </div>
      </article>`).join('');

    grid.querySelectorAll('[data-open-package]').forEach(btn => btn.addEventListener('click', () => {
      const id=btn.dataset.openPackage; history.pushState(null,'',`#${id}`); openPackage(id,btn.dataset.action);
    }));
  }

  function activateTab(target) {
    if(!packageModalEl || !window.bootstrap) return;
    const trigger=packageModalEl.querySelector(`[data-bs-target="${target}"]`);
    if(trigger) bootstrap.Tab.getOrCreateInstance(trigger).show();
  }

  function openPackage(id, action='details') {
    selectedPackage=getPackage(id); if(!selectedPackage || !packageModal) return;
    const dest=byId('packageDestination'); if(dest) dest.value=selectedPackage.title;
    setText('modalPackageDuration',selectedPackage.nights);
    setText('modalPackageTitle',selectedPackage.title);
    setText('modalPackageRoute',selectedPackage.route);
    setText('modalPackageId',selectedPackage.id);
    setText('modalOverviewDuration',selectedPackage.nights);
    setText('modalOverviewCategory',selectedPackage.category);
    setText('modalOverviewRoute',selectedPackage.route);
    setText('modalOverviewSummary',selectedPackage.summary);
    const badges=[...(selectedPackage.badges||[]), `From ${origin}`];
    setHtml('modalPackageBadges',badges.map(b=>`<span>${escapeHtml(b)}</span>`).join(''));
    setHtml('modalItinerary',(selectedPackage.itinerary||[]).map((step,i)=>`<div class="itinerary-item"><strong>${i+1}</strong><span>${escapeHtml(step)}</span></div>`).join(''));
    packageModal.show();
    setTimeout(()=>activateTab(action==='enquire'?'#packageEnquiryTab':'#packageItineraryTab'),120);
  }

  function showFromHash() {
    const hash = decodeURIComponent((window.location.hash || '').replace(/^#/,'')); if(!hash) return false;
    const duration = Object.keys(durationMeta).find(d => durationMeta[d].hash === hash);
    if(duration){ setActive(duration); render(duration); setTimeout(()=>{ const t=byId(hash)||document.querySelector('.tour-browser-section'); t&&t.scrollIntoView({behavior:'smooth',block:'start'}); },160); return true; }
    const found=getPackage(hash); if(!found) return false;
    setActive(found.duration); render(found.duration);
    setTimeout(()=>{ const t=byId(hash); if(t){ t.scrollIntoView({behavior:'smooth',block:'center'}); t.classList.add('highlight-package'); setTimeout(()=>t.classList.remove('highlight-package'),2200); } },160);
    return true;
  }

  buttons.forEach(btn => btn.addEventListener('click',()=>{
    const d=btn.dataset.duration; const h=btn.dataset.durationHash || durationMeta[d]?.hash;
    setActive(d); render(d); if(h) history.pushState(null,'',`#${h}`);
  }));

  [byId('goToEnquiryTab'),byId('goToEnquiryTabFromItinerary')].forEach(btn=>btn&&btn.addEventListener('click',()=>activateTab('#packageEnquiryTab')));

  function localMin(){ const d=new Date(),p=n=>String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`; }
  function formatDT(v){ if(!v)return ''; const d=new Date(v); return Number.isNaN(d.getTime())?v:d.toLocaleString('en-IN',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}); }
  function setupDates(){ const p=byId('packagePickupDateTime'),d=byId('packageDropDateTime'); if(!p||!d)return; const min=localMin(); p.min=min; const sync=()=>{d.min=p.value||min; if(d.value&&p.value&&d.value<p.value)d.value=''; d.setCustomValidity('');}; p.addEventListener('change',sync); d.addEventListener('change',()=>{ if(p.value&&d.value&&d.value<p.value){d.setCustomValidity('Drop date and time cannot be earlier than pickup date and time.');d.reportValidity();}else d.setCustomValidity('');}); sync(); }

  byId('previewPackageBtn')?.addEventListener('click',()=>{
    if(!selectedPackage)return;
    const form=byId('packageEnquiryForm'); const p=byId('packagePickupDateTime')?.value||'', d=byId('packageDropDateTime')?.value||'';
    if(p&&d&&d<p){ const el=byId('packageDropDateTime'); el.setCustomValidity('Drop date and time cannot be earlier than pickup date and time.');el.reportValidity();return; }
    if(form&&!form.checkValidity()){form.reportValidity();return;}
    const data={
      package:selectedPackage.title, packageId:selectedPackage.id, duration:selectedPackage.nights, route:selectedPackage.route,
      from:byId('packageFrom').value.trim(), destination:selectedPackage.title, drop:byId('packageDrop').value.trim(),
      pickupDateTime:formatDT(p), dropDateTime:formatDT(d), vehicle:byId('vehicleSelect').value,
      passengers:byId('passengerCount').value, accommodation:byId('packageAccommodation').value
    };
    const itinerary=(selectedPackage.itinerary||[]).map(s=>`- ${s}`).join('\n');
    const msg=`${brand} - Pilgrimage Tour Enquiry\n\nPackage: ${data.package}\nPackage ID: ${data.packageId}\nDuration: ${data.duration}\nRoute: ${data.route}\n\nFrom: ${data.from}\nDestination: ${data.destination}\nDrop: ${data.drop}\nPickup: ${data.pickupDateTime}\nDrop Date & Time: ${data.dropDateTime}\nVehicle: ${data.vehicle}\nPassengers: ${data.passengers}\nAccommodation: ${data.accommodation}\n\nItinerary:\n${itinerary}\n\nPlease share availability and final package details.`;
    previewMessage=encodeURIComponent(msg);
    const labels={package:'Package',packageId:'Package ID',duration:'Duration',route:'Route',from:'From',destination:'Destination',drop:'Drop',pickupDateTime:'Pickup Date & Time',dropDateTime:'Drop Date & Time',vehicle:'Vehicle',passengers:'Passengers',accommodation:'Accommodation'};
    setHtml('packagePreviewContent',Object.entries(data).map(([k,v])=>`<div class="preview-line"><strong>${labels[k]}</strong><span>${escapeHtml(v)}</span></div>`).join(''));
    packageModal?.hide(); setTimeout(()=>previewModal?.show(),220);
  });
  byId('editPackagePreview')?.addEventListener('click',()=>{previewModal?.hide();setTimeout(()=>{packageModal?.show();setTimeout(()=>activateTab('#packageEnquiryTab'),120);},220);});
  byId('sendPackageWhatsapp')?.addEventListener('click',()=>{if(previewMessage)window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${previewMessage}`,'_blank');});

  updateCounts(); setupDates(); if(!showFromHash()){setActive('ALL');render('ALL');} window.addEventListener('hashchange',showFromHash);
})();
