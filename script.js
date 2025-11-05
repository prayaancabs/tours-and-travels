// Booking Form Handler
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('customerName').value;
        const phone = document.getElementById('customerPhone').value;
        const pickup = document.getElementById('pickupLocation').value;
        const drop = document.getElementById('dropLocation').value;
        const pickupDate = new Date(document.getElementById('pickupDateTime').value).toLocaleString('en-IN');
        const returnDate = new Date(document.getElementById('returnDateTime').value).toLocaleString('en-IN');
        const passengers = document.getElementById('passengers').value;
        const vehicle = document.getElementById('vehicleType').value;
        const special = document.getElementById('specialRequirements').value;

        const message = `*New Booking - Prayaan Cabs*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Pickup:* ${pickup}%0A*Drop:* ${drop}%0A*Pickup Date:* ${pickupDate}%0A*Return Date:* ${returnDate}%0A*Passengers:* ${passengers}%0A*Vehicle:* ${vehicle}%0A*Requirements:* ${special || 'None'}`;

        window.open(`https://wa.me/919500530043?text=${message}`, '_blank');
        this.reset();
    });
}

// Vendor Form Handler
const vendorForm = document.getElementById('vendorForm');
if (vendorForm) {
    vendorForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('vendorName').value;
        const phone = document.getElementById('vendorPhone').value;
        const vehicleNum = document.getElementById('vehicleNumber').value;
        const license = document.getElementById('licenseNumber').value;
        const vehicleType = document.getElementById('vendorVehicleType').value;
        const notes = document.getElementById('vendorNotes').value;

        const message = `*Vendor Registration - Prayaan Cabs*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Vehicle Number:* ${vehicleNum}%0A*License Number:* ${license}%0A*Vehicle Type:* ${vehicleType}%0A*Additional Info:* ${notes || 'None'}%0A%0A_Please send required documents as mentioned in the registration form._`;

        window.open(`https://wa.me/919500530043?text=${message}`, '_blank');
        this.reset();
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Active nav link on scroll
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
