
  /* ==========================================================
     12-HOUR FORMATTER (NEW) — For all pickup & return times
     ========================================================== */
  function formatDateTime12h(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  }

  /* ===========================
       GLOBAL DATA + VARIABLES
     =========================== */
     /* ====== Data & State ====== */
     const vehiclePricing = {
       oneway: {
         'Swift Dzire / Toyota Etios': { perKm: 15, icon: 'fa-car', image: 'images/sedan.png', category: 'Sedan' },
         'Mahindra Xylo / Ertiga / Marazzo': { perKm: 20, icon: 'fa-car-side', image: 'images/ertiga.png', category: 'SUV' },
         'Innova': { perKm: 22, icon: 'fa-shuttle-van', image: 'images/innova.png', category: 'MPV' },
         'Innova Crysta (6+1)': { perKm: 26, icon: 'fa-van-shuttle', image: 'images/crysta.png', category: 'Premium MPV' },
         'Innova Crysta (7+1)': { perKm: 26, icon: 'fa-van-shuttle', image: 'images/crysta.png', category: 'Premium MPV' }
       },
       roundtrip: {
         'Swift Dzire / Toyota Etios': { dayRent: 2200, perKm: 13, icon: 'fa-car', image: 'images/sedan.png', category: 'Sedan' },
         'Mahindra Xylo / Ertiga':     { dayRent: 2400, perKm: 14, icon: 'fa-car-side', image: 'images/xuv.png', category: 'SUV' },
         'Innova':                     { dayRent: 3000, perKm: 15, icon: 'fa-shuttle-van', image: 'images/innova.png', category: 'MPV' },
         'Innova Crysta (6+1)':        { dayRent: 3500, perKm: 18, icon: 'fa-van-shuttle', image: 'images/crysta.png', category: 'Premium MPV' },
         'Innova Crysta (7+1)':        { dayRent: 3500, perKm: 18, icon: 'fa-van-shuttle', image: 'images/crysta.png', category: 'Premium MPV' },
         'Traveller':                  { dayRent: 4200, perKm: 21, icon: 'fa-bus', image: 'images/tempo.png', category: '12/14-seater TT' }
       },
       local: {
         '4hrs': {
           'Swift Dzire or equivalent':         { packageRate: 1450, freeKm: 40, extraPerKm: 14, extraHour: 380, icon: 'fa-car', image: 'images/sedan.png', category: 'Sedan' },
           'Ertiga':        { packageRate: 1720, freeKm: 40, extraPerKm: 17, extraHour: 430, icon: 'fa-car', image: 'images/ertiga.png', category: 'MPV' },
           'Innova':              { packageRate: 2200, freeKm: 40, extraPerKm: 18, extraHour: 480, icon: 'fa-shuttle-van', image: 'images/innova.png', category: 'MPV' },
           'Innova Crysta (6+1)': { packageRate: 2500, freeKm: 40, extraPerKm: 22, extraHour: 580, icon: 'fa-van-shuttle', image: 'images/crysta.png', category: 'Premium MPV' },
           'Innova Crysta (7+1)': { packageRate: 2500, freeKm: 40, extraPerKm: 22, extraHour: 580, icon: 'fa-van-shuttle', image: 'images/crysta.png', category: 'Premium MPV' },
           'Traveller':           { packageRate: 3000, freeKm: 40, extraPerKm: 19, extraHour: 450, icon: 'fa-bus', image: 'images/tempo.png', category: '12/14-seater TT' }
         },
         '8hrs': {
           'Swift Dzire or equivalent':         { packageRate: 2880, freeKm: 80, extraPerKm: 14, extraHour: 350, icon: 'fa-car', image: 'images/sedan.png', category: 'Sedan' },
           'Ertiga':        { packageRate: 3440, freeKm: 80, extraPerKm: 17, extraHour: 430, icon: 'fa-car', image: 'images/ertiga.png', category: 'MPV' },
           'Innova':              { packageRate: 3840, freeKm: 80, extraPerKm: 18, extraHour: 480, icon: 'fa-shuttle-van', image: 'images/innova.png', category: 'MPV' },
           'Innova Crysta (6+1)': { packageRate: 4640, freeKm: 80, extraPerKm: 22, extraHour: 580, icon: 'fa-van-shuttle', image: 'images/crysta.png', category: 'Premium MPV' },
           'Innova Crysta (7+1)': { packageRate: 4640, freeKm: 80, extraPerKm: 22, extraHour: 580, icon: 'fa-van-shuttle', image: 'images/crysta.png', category: 'Premium MPV' },
           'Traveller':           { packageRate: 4800, freeKm: 80, extraPerKm: 19, extraHour: 500, icon: 'fa-bus', image: 'images/tempo.png', category: '12/14-seater TT' }
         },
         '10hrs': {
           'Swift Dzire or equivalent':         { packageRate: 3600, freeKm: 100, extraPerKm: 14, extraHour: 360, icon: 'fa-car', image: 'images/sedan.png', category: 'Sedan' },
           'Ertiga':        { packageRate: 4300, freeKm: 100, extraPerKm: 17, extraHour: 430, icon: 'fa-car', image: 'images/ertiga.png', category: 'MPV' },
           'Innova':              { packageRate: 4800, freeKm: 100, extraPerKm: 18, extraHour: 480, icon: 'fa-shuttle-van', image: 'images/innova.png', category: 'MPV' },
           'Innova Crysta (6+1)': { packageRate: 5800, freeKm: 100, extraPerKm: 22, extraHour: 580, icon: 'fa-van-shuttle', image: 'images/crysta.png', category: 'Premium MPV' },
           'Innova Crysta (7+1)': { packageRate: 5800, freeKm: 100, extraPerKm: 22, extraHour: 580, icon: 'fa-van-shuttle', image: 'images/crysta.png', category: 'Premium MPV' },
           'Traveller':           { packageRate: 5300, freeKm: 100, extraPerKm: 19, extraHour: 500, icon: 'fa-bus', image: 'images/tempo.png', category: '12/14-seater TT' }
         },
         '12hrs': {
           'Swift Dzire or equivalent':         { packageRate: 4320, freeKm: 120, extraPerKm: 14, extraHour: 360, icon: 'fa-car', image: 'images/sedan.png', category: 'Sedan' },
           'Ertiga':        { packageRate: 5160, freeKm: 120, extraPerKm: 17, extraHour: 430, icon: 'fa-car', image: 'images/ertiga.png', category: 'MPV' },
           'Innova':              { packageRate: 5760, freeKm: 120, extraPerKm: 18, extraHour: 480, icon: 'fa-shuttle-van', image: 'images/innova.png', category: 'MPV' },
           'Innova Crysta (6+1)': { packageRate: 6960, freeKm: 120, extraPerKm: 22, extraHour: 580, icon: 'fa-van-shuttle', image: 'images/crysta.png', category: 'Premium MPV' },
           'Innova Crysta (7+1)': { packageRate: 6960, freeKm: 120, extraPerKm: 22, extraHour: 580, icon: 'fa-van-shuttle', image: 'images/crysta.png', category: 'Premium MPV' },
           'Traveller':           { packageRate: 6000, freeKm: 120, extraPerKm: 19, extraHour: 500, icon: 'fa-bus', image: 'images/tempo.png', category: '12/14-seater TT' }
         }
       }
     };

  /* =======================
     TERMS (unchanged)
     ======================= */
  const terms = {
    oneway: [
      "Minimum billing: 140 KM",
      "Fare calculated based on per KM rate",
      "Driver batta & luggage charges are extra",
      "Toll, parking & permits are extra",
      "Only one pickup & one drop allowed",
      "5% GST Included"
    ],

    roundtrip: [
      "5% GST Included",
      "Additional kms beyond the limit will be charged extra.",
      "Kilometers and hours start and end at pickup location.",
      "Toll, parking, state permit & entry fees are extra.",
      "Night driving allowance applies between 9:45 PM and 6:00 AM.",
      "All planned cities must be informed in advance.",
      "AC may be turned off during steep hill climbs."
    ],
    local: [
      "5% GST Included",
      "Package includes fixed KM & fixed hours.",
      "Extra KM & Extra hours are charged separately.",
      "Toll, parking, permits are extra.",
      "Night driving charges apply after 9:45 PM."
    ]
  };

  /* =======================
     GLOBAL STATE
     ======================= */
  let currentTripType = 'oneway';
  let selectedLocalPackage = '8hrs';
  let intermediateStopCount = 0;

  let selectedVehicle = null;
  let lastComputedDistance = 0;
  let lastComputedDays = 1;
  let lastBasePrice = 0;
  let lastGst = 0;

  /* ==================================
     INIT AUTOCOMPLETE
     ================================== */
  function initAutocomplete() {
    document.querySelectorAll('.location-input').forEach(input => {
      if (!input.dataset.autoinit) {
        try {
          new google.maps.places.Autocomplete(input, {
            componentRestrictions: { country: 'in' }
          });
        } catch(e){}
        input.dataset.autoinit = "1";
      }
    });
  }

  /* ==================================
     TRIP TYPE SWITCHER
     ================================== */
  document.querySelectorAll('.trip-type-btn-horizontal').forEach(btn=>{
    btn.addEventListener('click', function(){
      document.querySelectorAll('.trip-type-btn-horizontal')
        .forEach(b=>b.classList.remove('active'));

      this.classList.add('active');
      currentTripType = this.dataset.trip;

      document.getElementById('onewayForm').style.display     = currentTripType==='oneway'?'block':'none';
      document.getElementById('roundtripForm').style.display  = currentTripType==='roundtrip'?'block':'none';
      document.getElementById('localForm').style.display      = currentTripType==='local'?'block':'none';

      document.getElementById('vehicleTariffSection').style.display = 'none';
      document.getElementById('customerInfoPage').style.display     = 'none';
      document.getElementById('bookingPreviewSection').style.display= 'none';

      initAutocomplete();
    });
  });
  /* ==================================
     ADD INTERMEDIATE STOP
     ================================== */
  document.getElementById('addStopBtn').addEventListener('click', ()=>{
    intermediateStopCount++;
    const wrap = document.createElement('div');
    wrap.className = "intermediate-stop mb-2";
    wrap.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h6 class="mb-0">Stop ${intermediateStopCount}</h6>
        <button type="button" class="btn btn-sm btn-outline-danger remove-stop-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <input type="text" class="form-control location-input" placeholder="Enter location">
    `;
    document.getElementById('intermediateStops').appendChild(wrap);

    wrap.querySelector('.remove-stop-btn').onclick = ()=>wrap.remove();

    try {
      new google.maps.places.Autocomplete(
        wrap.querySelector('.location-input'),
        { componentRestrictions:{country:'in'} }
      );
    } catch(e){}
  });

  /* ==================================
     GOOGLE DISTANCE MATRIX
     ================================== */
  function calculateDistance(origins, destinations) {
    return new Promise((resolve, reject)=>{
      try {
        const svc = new google.maps.DistanceMatrixService();
        svc.getDistanceMatrix({
          origins, destinations,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC
        }, (res, status)=>{
          if (status === 'OK') resolve(res);
          else reject(status);
        });
      } catch(e){
        reject(e);
      }
    });
  }

  /* ==================================
     MAIN PRICING FLOW
     ================================== */
  async function calculateAndDisplayAllPrices(){
    const spinner = document.getElementById('loadingSpinner');
    spinner.style.display = 'block';
    document.getElementById('vehicleTariffSection').style.display = 'none';
    document.getElementById('customerInfoPage').style.display = 'none';
    document.getElementById('bookingPreviewSection').style.display = 'none';

    try {
      let totalDistance = 0;
      let days = 1;

      function isCoimbatoreLocation(text){
        if (!text) return false;
        return text.toLowerCase().includes('coimbatore');
      }

      /* -------------------------------
          ONEWAY
         ------------------------------- */
         if (currentTripType === 'oneway') {
           const from = document.getElementById('onewayPickup').value.trim();
           const to   = document.getElementById('onewayDrop').value.trim();
           const pax  = parseInt(document.getElementById('onewayPassengers').value || 0, 10);

           if (!from || !to || pax <= 0) {
             spinner.style.display = 'none';
             return;
           }

           const res = await calculateDistance([from], [to]);
           const actualDistance = (res.rows[0].elements[0].distance.value || 0) / 1000;

           // ❌ BLOCK BELOW 35 KM
           if (actualDistance < 35) {
             spinner.style.display = 'none';
             alert("Minimum 35 KM required for one-way booking");
             return;
           }

           // ✅ MINIMUM BILLING 140 KM
           totalDistance = Math.max(140, Math.round(actualDistance)) * 2;

           lastComputedDistance = totalDistance;
           lastComputedDays = 1;

           displayAllVehiclePrices(totalDistance, 1);
         }

      /* -------------------------------
          ROUNDTRIP
         ------------------------------- */
      else if (currentTripType === 'roundtrip') {
        const from = document.getElementById('roundtripPickup').value.trim();
        const to   = document.getElementById('roundtripDrop').value.trim();
        const pickupRaw = document.getElementById('roundtripPickupDateTime').value;
        const returnRaw = document.getElementById('roundtripReturnDateTime').value;
        if (!from || !to || !pickupRaw || !returnRaw) { spinner.style.display='none'; return; }

        // calculate days
        const pDate = new Date(pickupRaw);
        const rDate = new Date(returnRaw);
        const msPerDay = 1000 * 60 * 60 * 24;
        let rawDays = Math.floor((rDate - pDate) / msPerDay) + 1;
        if (!isFinite(rawDays) || rawDays < 1) rawDays = 1;
        days = rawDays;

        const locs = [from];
        document.querySelectorAll('#intermediateStops .location-input').forEach(i => {
          if (i.value && i.value.trim()) locs.push(i.value.trim());
        });
        locs.push(to);

        let forwardDistance = 0;
        for (let i = 0; i < locs.length - 1; i++) {
          try {
            const res = await calculateDistance([locs[i]], [locs[i+1]]);
            forwardDistance += ((res.rows[0].elements[0].distance.value || 0) / 1000);
          } catch(e){}
        }

        let returnDistance = 0;
        if (isCoimbatoreLocation(from)) {
          const coimbatore = "Coimbatore, Tamil Nadu";
          try {
            const resBack = await calculateDistance([to],[coimbatore]);
            returnDistance = (resBack.rows[0].elements[0].distance.value || 0) / 1000;
          } catch(e){}
        }

        // LIMIT DAYS TO MAX 10
let daysLimited = days;
if (daysLimited > 10) daysLimited = 10;

// ADD EXTRA KM (50 KM PER DAY)
let extraKM = daysLimited * 50;

// FINAL KM
totalDistance = forwardDistance + returnDistance + extraKM;

        lastComputedDistance = Math.round(totalDistance);
        lastComputedDays = days;

        displayAllVehiclePrices(totalDistance, days);
      }

      /* -------------------------------
          LOCAL PACKAGE
         ------------------------------- */
      else if (currentTripType === 'local') {
        displayLocalTariffs();
      }

    } catch(e){
      console.error(e);
      alert('Unable to calculate distance. Please check locations and try again.');
    } finally {
      spinner.style.display = 'none';
    }
  }

  /* ==================================
     VEHICLE CLICK HANDLER
     ================================== */
  function attachVehicleClickHandler(card, basePrice){
    card.addEventListener('click', ()=>{
      document.querySelectorAll('.vehicle-tariff-card').forEach(c=>c.classList.remove('selected'));
      card.classList.add('selected');

      selectedVehicle = card.querySelector('.vehicle-name-horizontal').textContent.trim();
      lastBasePrice = parseInt(basePrice, 10) || 0;

      document.getElementById('vehicleTariffSection').style.display = 'none';
      document.getElementById('onewayForm').style.display = 'none';
      document.getElementById('roundtripForm').style.display = 'none';
      document.getElementById('localForm').style.display = 'none';

      document.getElementById('customerInfoPage').style.display = 'block';
      scrollTopSafe();

      document.getElementById('bookingPreviewSection').style.display= 'none';
      scrollTopSafe();

    });
  }

  /* ==================================
     SHOW BOOKING PREVIEW (12-HOUR FORMAT UPDATED)
     ================================== */
  function showBookingPreview(){
    document.getElementById('vehicleTariffSection').style.display = 'none';
    document.getElementById('customerInfoPage').style.display = 'none';

    let summaryHTML = '';
    let breakdown = '';

    /* -------------------------------
         ONEWAY SUMMARY
       ------------------------------- */
    if (currentTripType === 'oneway') {
      const from = document.getElementById('onewayPickup').value;
      const to   = document.getElementById('onewayDrop').value;

      /* UPDATED TO 12-HOUR FORMAT */
      const dt   = formatDateTime12h(document.getElementById('onewayDateTime').value);

      const pax  = document.getElementById('onewayPassengers').value;
      const distance = lastComputedDistance || 0;

      summaryHTML =
        `<b>From:</b> ${from}<br><b>To:</b> ${to}<br><b>Date & Time:</b> ${dt}`+
        `<br><b>Passengers:</b> ${pax}`;

      breakdown = ``;
    }

    /* -------------------------------
         ROUNDTRIP SUMMARY
       ------------------------------- */
    else if (currentTripType === 'roundtrip') {
      const from = document.getElementById('roundtripPickup').value;
      const to   = document.getElementById('roundtripDrop').value;

      /* UPDATED TO 12-HOUR FORMAT */
      const pickup = formatDateTime12h(document.getElementById('roundtripPickupDateTime').value);
      const ret    = formatDateTime12h(document.getElementById('roundtripReturnDateTime').value);

      const pax    = document.getElementById('roundtripPassengers').value;
      const distance = lastComputedDistance || 0;
      const days     = lastComputedDays || 1;

      let stops = [];
      document.querySelectorAll('#intermediateStops .location-input').forEach(i => {
        if (i.value && i.value.trim()) stops.push(i.value.trim());
      });
      const stopLine = stops.length ? `<b>Intermediate Stops:</b> ${stops.join(', ')}<br>` : '';

      summaryHTML =
        `<b>From:</b> ${from}<br>${stopLine}<b>To:</b> ${to}`+
        `<br><b>Pickup:</b> ${pickup}<br><b>Return:</b> ${ret}`+
        `<br><b>Passengers:</b> ${pax}<br><b>Total Distance:</b> ${distance} km<br><b>No. of Days:</b> ${days}`;

      breakdown = ``;
    }

    /* -------------------------------
         LOCAL TRIP SUMMARY
       ------------------------------- */
    else {
      const pickupLoc = document.getElementById('localPickup').value;

      /* UPDATED TO 12-HOUR FORMAT */
      const dt  = formatDateTime12h(document.getElementById('localDateTime').value);

      const pax = document.getElementById('localPassengers').value;

      summaryHTML =
        `<b>Pickup:</b> ${pickupLoc}<br><b>Date & Time:</b> ${dt}`+
        `<br><b>Passengers:</b> ${pax}<br><b>Package:</b> ${selectedLocalPackage.toUpperCase()}`;

      const pkgCfg = vehiclePricing.local[selectedLocalPackage] || {};
      if (pkgCfg[selectedVehicle]) {
        const pkg = pkgCfg[selectedVehicle];
        lastBasePrice = parseInt(pkg.packageRate, 10) || lastBasePrice;
        breakdown = ``;
      } else {
        breakdown = 'Package details not available.';
      }
    }

    /* -------------------------------
         GST SPLIT (UNCHANGED)
       ------------------------------- */
    const totalGst = Math.round(lastBasePrice * 0.05);
    const cgst = Math.floor(totalGst / 2);
    const sgst = totalGst - cgst;
    lastGst = totalGst;

    breakdown += ``;

    document.getElementById('fareBreakdownText').textContent = breakdown;
    document.getElementById('summaryTripDetails').innerHTML = summaryHTML;
    document.getElementById('summaryVehicle').textContent = `Vehicle: ${selectedVehicle || 'Not selected'}`;
    document.getElementById('summaryBasePrice').textContent = `Base Fare: ₹${lastBasePrice}`;

    /* -------------------------------
         TERMS (unchanged)
       ------------------------------- */
    if (currentTripType === "oneway") {
      const cfg = vehiclePricing.oneway[selectedVehicle] || {};
      const perKm = cfg.perKm || 0;

    }

    const ul = document.getElementById("termsList");
    ul.innerHTML = (terms[currentTripType] || [])
      .map(t => `<li>${t}</li>`)
      .join("");

    document.getElementById('bookingPreviewSection').style.display = 'block';

    /* Add-ons recalculation logic (unchanged) */
    document.querySelectorAll('.addon-checkbox').forEach(chk => chk.checked = false);

    function updateTotalFare(){
      let addons = 0;
      document.querySelectorAll('.addon-checkbox:checked').forEach(chk => {
        addons += parseInt(chk.dataset.price || 0, 10);
      });
      const total = lastBasePrice + lastGst + addons;
      document.getElementById('totalFare').textContent = `₹${total}`;
    }

    updateTotalFare();
    document.querySelectorAll('.addon-checkbox').forEach(chk=>chk.onchange = updateTotalFare);

    document.getElementById('paymentOptionsSection').style.display = 'none';
  }
  /* ==================================
     DISPLAY VEHICLE CARDS
     ================================== */
  function displayAllVehiclePrices(distance, days) {
    const data = vehiclePricing[currentTripType] || {};
    const grid = document.getElementById('vehicleTariffGrid');
    const paxWarning = document.getElementById('paxWarning');
    grid.innerHTML = '';
    paxWarning.style.display = 'none';
    paxWarning.textContent = '';

    const paxField = document.querySelector(`#${currentTripType}Passengers`);
    const pax = parseInt(paxField ? paxField.value : 0, 10) || 0;

    /* Passenger rules */
    if (currentTripType === 'oneway' && pax > 7) {
      paxWarning.textContent = "For more than 7 passengers, please contact us for Tempo Traveller bookings.";
      paxWarning.style.display = 'block';
      document.getElementById('vehicleTariffSection').style.display = 'block';
      return;
    }

    Object.keys(data).forEach(v => {
      const p = data[v];

      // passenger-based filtering
      if (pax > 0) {
        if (pax > 4 && (v.includes('Swift Dzire') || v.includes('Toyota Etios'))) return;
        if (v.includes('Innova Crysta (6+1)') && pax > 6) return;
        if (v.includes('Innova Crysta (7+1)') && pax > 7) return;
        if ((v.includes('Innova') && !v.includes('Crysta')) && pax > 7) return;
        if ((v.includes('Xylo') || v.includes('Ertiga') || v.includes('SUV')) && pax > 7) return;
        if (v.includes('Traveller')) {
          if (currentTripType === 'oneway' || currentTripType === 'local') return;
          if (pax <= 7) return;
        }
      }

      let total = 0;

      /* ONEWAY */
      if (currentTripType === 'oneway') {
        const perKm = p.perKm || 0;



        if (currentTripType === 'oneway') {
        const perKm = p.perKm || 0;

        total = Math.round(distance * perKm);
      }
      }

      /* ROUNDTRIP */
      else {
        const dayRent = p.dayRent || 0;
        const perKm = p.perKm || 0;
        total = Math.round((dayRent * days) + (distance * perKm));
      }

      const card = document.createElement('div');
      card.className = 'vehicle-tariff-card';
      card.innerHTML = `
        <div style="min-height:56px;">
          <div class="vehicle-icon-circle-horizontal">
            <img src="${p.image}" alt="${v}" onerror="this.style.display='none'">
          </div>
          <div class="vehicle-name-horizontal">${v}</div>
          <div class="vehicle-category">${p.category||''}</div>
        </div>
        <div class="tariff-price">Rs. ${total}</div>
      `;

      grid.appendChild(card);
      attachVehicleClickHandler(card, total);
    });

    document.getElementById('vehicleTariffSection').style.display = 'block';
  }

  /* ==================================
     DISPLAY LOCAL PACKAGE VEHICLE CARDS
     ================================== */
  function displayLocalTariffs(){
    const data = vehiclePricing.local[selectedLocalPackage] || {};
    const grid = document.getElementById('vehicleTariffGrid');
    grid.innerHTML = '';
    const pax = parseInt(document.getElementById('localPassengers').value || 0, 10) || 0;

    Object.keys(data).forEach(v=>{
      if (v.toLowerCase().includes('traveller')) return;
      if (pax === 5 && (v === 'Swift Dzire' || v === 'Toyota Etios')) return;
      if (v === 'Innova Crysta (6+1)' && pax === 7) return;
      if (v === 'Innova Crysta (7+1)' && pax <= 6 && pax > 0) return;

      const p = data[v];
      const base = p.packageRate || 0;

      const card = document.createElement('div');
      card.className = 'vehicle-tariff-card';
      card.innerHTML = `
        <div style="min-height:56px;">
          <div class="vehicle-icon-circle-horizontal">
            <img src="${p.image}" alt="${v}" onerror="this.style.display='none'">
          </div>
          <div class="vehicle-name-horizontal">${v}</div>
          <div class="vehicle-category">${p.category||''}</div>
        </div>
        <div class="tariff-price">Rs. ${base}</div>
      `;

      grid.appendChild(card);
      attachVehicleClickHandler(card, base);
    });

    document.getElementById('travellerNote').style.display = 'block';
    document.getElementById('vehicleTariffSection').style.display = 'block';
  }

  /* ==================================
     AUTO RECALC WHEN PASSENGERS CHANGE
     ================================== */
  ['onewayPassengers','roundtripPassengers','localPassengers'].forEach(id=>{
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', ()=> {
      if (parseInt(el.value||0,10) > 0) calculateAndDisplayAllPrices();
    });
  });

  /* ==================================
     LOCAL PACKAGE SELECTION
     ================================== */
  document.querySelectorAll('.package-option').forEach(opt=>{
    opt.addEventListener('click', function(){
      document.querySelectorAll('.package-option').forEach(o=>o.classList.remove('active'));
      this.classList.add('active');
      selectedLocalPackage = this.dataset.package;
      if (currentTripType === 'local') displayLocalTariffs();
    });
  });

  /* ==================================
     BACK BUTTONS
     ================================== */
  document.getElementById('backToVehiclesBtn').addEventListener('click', ()=>{
    document.getElementById('customerInfoPage').style.display = 'none';
    document.getElementById('vehicleTariffSection').style.display = 'block';

    document.getElementById('onewayForm').style.display     = currentTripType==='oneway'?'block':'none';
    document.getElementById('roundtripForm').style.display  = currentTripType==='roundtrip'?'block':'none';
    document.getElementById('localForm').style.display      = currentTripType==='local'?'block':'none';
  });

  document.getElementById('backToCustomerBtn').addEventListener('click', ()=>{
    document.getElementById('bookingPreviewSection').style.display = 'none';
    document.getElementById('customerInfoPage').style.display = 'block';
  });

  /* ==================================
     CUSTOMER → SUMMARY
     ================================== */
  document.getElementById('customerNextBtn').addEventListener('click', ()=>{
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();

    if (!name || !phone) {
      alert('Please enter name and phone.');
      return;
    }
    if (phone.length !== 10 || !/^[0-9]+$/.test(phone)) {
      alert('Enter a valid 10-digit phone number.');
      return;
    }

    showBookingPreview();
  });

  /* ==================================
     STRIP HTML (unchanged)
     ================================== */
  function stripHtml(html){
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  /* ==================================
     WHATSAPP MESSAGE AFTER SUMMARY
     ================================== */
  document.getElementById('finalProceedBtn').addEventListener('click', ()=>{
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    if (!name || !phone) {
      alert('Please enter name and phone.');
      return;
    }

    /* Pickup Time Validation (1 hour before) */
    let pickupTime = null;
    if (currentTripType === 'oneway') {
      pickupTime = new Date(document.getElementById('onewayDateTime').value);
    } else if (currentTripType === 'roundtrip') {
      pickupTime = new Date(document.getElementById('roundtripPickupDateTime').value);
    } else if (currentTripType === 'local') {
      pickupTime = new Date(document.getElementById('localDateTime').value);
    }

    if (pickupTime && !isNaN(pickupTime)) {
      const now = new Date();
      const diffMinutes = (pickupTime - now) / (1000 * 60);
      if (diffMinutes < 60) {
        alert('⚠️ Please book at least 1 hour before pickup time.');
        return;
      }
    }

    const totalText = document.getElementById('totalFare').textContent.replace('₹','').trim();

    const addons = [];
    document.querySelectorAll('.addon-checkbox:checked').forEach(chk=>{
      addons.push(chk.nextElementSibling.textContent.trim());
    });
    const addonText = addons.length ? `\nAdd-ons:\n- ${addons.join('\n- ')}` : '';

    const tripDetails = stripHtml(document.getElementById('summaryTripDetails').innerHTML);
    const breakdown   = document.getElementById('fareBreakdownText').textContent;

    const msg =
  `🚗 New Booking - Prayaan Cabs

  Name: ${name}
  Phone: ${phone}
  Trip Type: ${currentTripType.toUpperCase()}
  Vehicle: ${selectedVehicle}
  Base Fare: ₹${lastBasePrice}
  GST (5%): ₹${lastGst}
  Total Fare: ₹${totalText}${addonText}

  Trip Details:
  ${tripDetails}

  Additional Charges / Notes:
  ${breakdown}

  Note: Tolls, parking & permits are extra.`;

    const waUrl = `https://wa.me/919500530043?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  });

  /* ==================================
     SEND WHATSAPP AFTER PAYMENT
     ================================== */
  function sendToWhatsappAfterPayment(paymentId, paidAmount) {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const tripDetails = stripHtml(document.getElementById('summaryTripDetails').innerHTML);
    const breakdown   = document.getElementById('fareBreakdownText').textContent;
    const totalFare = parseInt(document.getElementById('totalFare').textContent.replace('₹','').trim());

    const balance = totalFare - paidAmount;

    const msg =
  `🚗 *New Booking - Prayaan Cabs*

  Name: ${name}
  Phone: ${phone}

  *Payment Completed*
  Payment ID: ${paymentId}
  Paid Amount: ₹${paidAmount}
  Balance: ₹${balance}

  Trip Details:
  ${tripDetails}

  Fare Breakdown:
  ${breakdown}

  Note: Tolls, parking & permits extra.`;

    const waUrl = `https://wa.me/919500530043?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  }
  /* ==================================
     CHECK PRICES BUTTONS
     ================================== */
  document.getElementById('onewayCheckBtn').addEventListener('click', ()=>{
    const from = document.getElementById('onewayPickup').value.trim();
    const to   = document.getElementById('onewayDrop').value.trim();
    const pax  = parseInt(document.getElementById('onewayPassengers').value || 0);
    if (!from || !to || pax <= 0) {
      alert('Please enter From, To and Passenger details.');
      return;
    }
    calculateAndDisplayAllPrices();
  });

  document.getElementById('roundtripCheckBtn').addEventListener('click', ()=>{
    const from = document.getElementById('roundtripPickup').value.trim();
    const to   = document.getElementById('roundtripDrop').value.trim();
    const pickup = document.getElementById('roundtripPickupDateTime').value;
    const ret    = document.getElementById('roundtripReturnDateTime').value;
    const pax    = parseInt(document.getElementById('roundtripPassengers').value || 0);
    if (!from || !to || !pickup || !ret || pax <= 0) {
      alert('Please enter all details before checking prices.');
      return;
    }
    calculateAndDisplayAllPrices();
  });

  document.getElementById('localCheckBtn').addEventListener('click', ()=>{
    const pickup = document.getElementById('localPickup').value.trim();
    const dt     = document.getElementById('localDateTime').value;
    const pax    = parseInt(document.getElementById('localPassengers').value || 0);
    if (!pickup || !dt || pax <= 0) {
      alert('Please enter Pickup, Date & Passenger details.');
      return;
    }
    calculateAndDisplayAllPrices();
  });

  /* ======================================================
     HIDDEN SHEET SUBMISSION (UPDATED FOR LOCAL PACKAGE)
     ====================================================== */
  function submitToSheet(paymentType, paymentAmount, paymentId, paymentStatus) {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const totalFareText = document.getElementById('totalFare').textContent.replace('₹','').trim();

    const addons = Array.from(document.querySelectorAll('.addon-checkbox:checked'))
      .map(c => c.nextElementSibling.textContent.trim())
      .join(', ');

    let pickup = "", drop = "", pickupDateTime = "", returnDateTime = "", intermediate = "";

    if (currentTripType === "oneway") {
      pickup = document.getElementById("onewayPickup").value;
      drop   = document.getElementById("onewayDrop").value;
      pickupDateTime = formatDateTime12h(document.getElementById("onewayDateTime").value);
    }
    else if (currentTripType === "roundtrip") {
      pickup = document.getElementById("roundtripPickup").value;
      drop   = document.getElementById("roundtripDrop").value;
      pickupDateTime  = formatDateTime12h(document.getElementById("roundtripPickupDateTime").value);
      returnDateTime  = formatDateTime12h(document.getElementById("roundtripReturnDateTime").value);

      const stops = [];
      document.querySelectorAll("#intermediateStops .location-input").forEach(i=>{
        if (i.value && i.value.trim()) stops.push(i.value.trim());
      });
      intermediate = stops.join(" | ");
    }
    else if (currentTripType === "local") {
      pickup = document.getElementById("localPickup").value;
      pickupDateTime = formatDateTime12h(document.getElementById("localDateTime").value);
    }

    /* ================================
       DAYS + KM LIMIT FIXED LOGIC
       ================================ */
    let days, kmLimit;

    if (currentTripType === "oneway") {
      days = 1;
      kmLimit = lastComputedDistance; // Google KM
    }
    else if (currentTripType === "roundtrip") {
      days = lastComputedDays;
      kmLimit = lastComputedDistance; // Total KM
    }
    else if (currentTripType === "local") {
      days = 1;
      let pkg = vehiclePricing.local[selectedLocalPackage][selectedVehicle];
      kmLimit = pkg ? pkg.freeKm : 0;
    }

    /* ========================================
       Assign hidden input fields
       ======================================== */
    document.getElementById("sheet_name").value          = name;
    document.getElementById("sheet_phone").value         = phone;
    document.getElementById("sheet_tripType").value      = currentTripType;
    document.getElementById("sheet_pickup").value        = pickup;
    document.getElementById("sheet_intermediate").value  = intermediate;
    document.getElementById("sheet_drop").value          = drop;
    document.getElementById("sheet_pickupDateTime").value= pickupDateTime;
    document.getElementById("sheet_returnDateTime").value= returnDateTime;
    document.getElementById("sheet_vehicle").value       = selectedVehicle || "";
    document.getElementById("sheet_baseFare").value      = lastBasePrice;
    document.getElementById("sheet_gst").value           = lastGst;
    document.getElementById("sheet_addons").value        = addons;
    document.getElementById("sheet_totalFare").value     = totalFareText;
    document.getElementById("sheet_paymentType").value   = paymentType;
    document.getElementById("sheet_paymentAmount").value = paymentAmount;
    document.getElementById("sheet_paymentStatus").value = paymentStatus;
    document.getElementById("sheet_paymentId").value     = paymentId;

    /* NEW → Days + KM Limit */
    document.getElementById("sheet_days").value          = days;
    document.getElementById("sheet_kmLimit").value       = kmLimit;

    document.getElementById("sheetForm").submit();
  }


  /* ======================================================
     PAY ONLINE → SHOW PAYMENT OPTIONS
     ====================================================== */
  document.getElementById("payOnlineBtn").addEventListener("click", function () {
    submitToSheet("Online - Initiated", 0, "", "Pending");

    const section = document.getElementById("paymentOptionsSection");
    section.style.display = "block";

  });

  /* ======================================================
     PAY NOW → RAZORPAY
     ====================================================== */
  document.getElementById("payNowBtn").addEventListener("click", function () {
    const selected = document.querySelector("input[name='paymentOption']:checked");
    if (!selected) {
      alert("Please select a payment option (Advance or Full).");
      return;
    }

    const totalFare = parseInt(
      document.getElementById("totalFare").textContent.replace("₹","").trim()
    );

    let payable = 0;
    let type = "";

    if (selected.value === "advance") {
      payable = Math.round(totalFare * 0.10);
      type = "Online Advance";
    } else {
      payable = totalFare;
      type = "Online Full";
    }

    const options = {
      key: "rzp_live_SPXxYIyrHigBRi",
      amount: payable * 100,
      currency: "INR",
      name: "Prayaan Cabs",
      description: "Cab Booking Payment",
      handler: function (response) {
        const pid = response.razorpay_payment_id;

        submitToSheet(type, payable, pid, "Paid");
        sendToWhatsappAfterPayment(pid, payable);
      },
      theme: { color: "#0d6efd" }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  });

  /* ======================================================
     AUTO-MIN FOR DATETIME & AUTO RECALC
     ====================================================== */
  window.addEventListener('load', ()=>{
    initAutocomplete();

    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.querySelectorAll('input[type="datetime-local"]').forEach(i=>{
      i.min = now.toISOString().slice(0,16);
    });

    function reCalc() {
      if (currentTripType === 'oneway') {
        const from = document.getElementById('onewayPickup').value.trim();
        const to   = document.getElementById('onewayDrop').value.trim();
        const pax  = parseInt(document.getElementById('onewayPassengers').value || 0);
        if (from && to && pax > 0) calculateAndDisplayAllPrices();
      }
      else if (currentTripType === 'roundtrip') {
        const from = document.getElementById('roundtripPickup').value.trim();
        const to   = document.getElementById('roundtripDrop').value.trim();
        const p    = document.getElementById('roundtripPickupDateTime').value;
        const r    = document.getElementById('roundtripReturnDateTime').value;
        const pax  = parseInt(document.getElementById('roundtripPassengers').value || 0);
        if (from && to && p && r && pax > 0) calculateAndDisplayAllPrices();
      }
      else if (currentTripType === 'local') {
        const pickup = document.getElementById('localPickup').value.trim();
        const dt     = document.getElementById('localDateTime').value;
        const pax    = parseInt(document.getElementById('localPassengers').value || 0);
        if (pickup && dt && pax > 0) calculateAndDisplayAllPrices();
      }
    }

    [
      'onewayPickup','onewayDrop','onewayDateTime','onewayPassengers',
      'roundtripPickup','roundtripDrop','roundtripPickupDateTime','roundtripReturnDateTime','roundtripPassengers',
      'localPickup','localDateTime','localPassengers'
    ].forEach(id=>{
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', reCalc);
    });
  });

  function scrollTopSafe() {
      window.scrollTo({ top: 0, behavior: "smooth" });
  }
