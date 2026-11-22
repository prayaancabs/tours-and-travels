# Prayaan Cabs Website

Premium UI refresh with the existing booking/payment functionality preserved.

## Shared layout
- `assets/js/header.js` — single shared site header and mobile navigation
- `assets/js/footer.js` — single shared footer and quick-contact bar
- `assets/css/premium.css` — premium business-class visual layer and responsive animations

## Protected functionality
The existing booking, automatic fare calculation, Razorpay flow, Google Maps flow, Google Sheet submission, package data and enquiry logic remain in their original functional files.

## Vendor registration
Vendor registration page, script and stylesheet were removed completely.

## Maintenance
Edit common navigation in `header.js` and common footer/contact details in `footer.js`; no need to edit each HTML page.

## Booking-first sharp UI revision
- Booking form moved to the first screen immediately below the shared header.
- Rounded container styling removed in favor of a sharp executive/business-class layout.
- Home booking background upgraded with fleet imagery, animated grid, light beams and subtle square-particle motion.
- Existing booking, fare calculation, Razorpay, Google Sheet, package and tracking JavaScript remains unchanged.


V8 vehicle card adjustment: vehicle name is now at the top; vehicle image is bottom-left and live fare is bottom-right. Fare calculation and booking logic remain unchanged.


## Pollachi section
- `/pollachi/` is an independent Prayaan Cabs Pollachi section.
- It uses the shared root `header.js` and `footer.js`, shared images/styles, and its own package/enquiry JavaScript.
- Pollachi enquiry is WhatsApp-only and does not use Razorpay or Google Sheets.


## Tiruppur section
- `/tiruppur/` is an independent Prayaan Cabs Tiruppur section.
- It uses the single shared root `header.js` and `footer.js`, shared images/styles, and its own package/enquiry JavaScript.
- Tiruppur enquiry is WhatsApp-only and does not use Razorpay or Google Sheets.
- The top enquiry form follows the latest simplified Pollachi field/placeholder layout supplied by the site owner.


Palakkad section added under /palakkad/ with 60 tour packages, including 15 additional Kerala-focused routes.

## Our Fleets update
- Added `our-fleets.html` for Coimbatore, Mettupalayam, Pollachi, Tiruppur and Palakkad.
- Added Our Fleets to the shared desktop/mobile header and footer Company links.
- Added shared `assets/css/fleets.css` for the fleet pages.
