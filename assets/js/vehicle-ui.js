/* Prayaan Cabs V8 — vehicle results UX helper.
   Does not calculate fares or change booking data. It only scrolls to the
   existing vehicle results after the passenger field triggers them. */
(function(){
  'use strict';

  const section = document.getElementById('vehicleTariffSection');
  const grid = document.getElementById('vehicleTariffGrid');
  if (!section || !grid) return;

  const passengerIds = ['onewayPassengers','roundtripPassengers','localPassengers'];
  let waitingForVehicleResults = false;
  let scrollQueued = false;

  function isVisible(el){
    return !!(el && el.getClientRects().length && getComputedStyle(el).display !== 'none');
  }

  function queueVehicleScroll(){
    if (!waitingForVehicleResults || scrollQueued || !isVisible(section)) return;
    if (!grid.children.length && !isVisible(document.getElementById('paxWarning'))) return;

    scrollQueued = true;
    waitingForVehicleResults = false;
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        section.scrollIntoView({ behavior:'smooth', block:'start' });
        window.setTimeout(function(){ scrollQueued = false; }, 700);
      });
    });
  }

  passengerIds.forEach(function(id){
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener('change', function(){
      const pax = parseInt(field.value || '0', 10) || 0;
      if (pax > 0) {
        waitingForVehicleResults = true;
        window.setTimeout(queueVehicleScroll, 80);
      }
    });
  });

  const observer = new MutationObserver(queueVehicleScroll);
  observer.observe(grid, { childList:true });
  observer.observe(section, { attributes:true, attributeFilter:['style','class'] });
})();
