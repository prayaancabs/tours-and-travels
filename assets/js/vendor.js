
    let currentStep = 1;
    let vehicleCount = 0;
    let driverCount = 0;

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwPpbt1T4NEw3ZUrfZid8AIYp6TkguTk5IdiNSSHAoDjmOuDPbKXHuPBdYDz5z3zEfc5w/exec";

    const stepEls = () => document.querySelectorAll(".form-step");
    const stepPills = () => document.querySelectorAll(".step-pill");

    function getTodayString() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    function setMinDateForAllDateInputs() {
      const today = getTodayString();
      document.querySelectorAll('input[type="date"]').forEach(input => {
        input.min = today;
      });
    }

    function enforceDigitsOnly(input) {
      input.value = input.value.replace(/\D/g, "").slice(0, 10);
    }

    function setupMobileRestrictions() {
      const mobileSelectors = [
        "#ownerMobile",
        "#alternateMobile",
        "#rtoMobile"
      ];

      mobileSelectors.forEach(selector => {
        const input = document.querySelector(selector);
        if (!input) return;
        input.addEventListener("input", () => enforceDigitsOnly(input));
      });
    }

    function setupDynamicMobileRestriction(input) {
      input.addEventListener("input", () => enforceDigitsOnly(input));
    }

    function validateMobileField(input, required = true) {
      const value = input.value.trim();

      if (!required && value === "") {
        input.setCustomValidity("");
        return true;
      }

      if (!/^\d{10}$/.test(value)) {
        input.setCustomValidity("Please enter exactly 10 digits.");
        input.reportValidity();
        return false;
      }

      input.setCustomValidity("");
      return true;
    }

    function validateAllMobileFields(stepNumber = currentStep) {
      const step = document.querySelector('.form-step[data-step="' + stepNumber + '"]');
      if (!step) return true;

      const mobileInputs = step.querySelectorAll('input[type="tel"], input[name^="driver_mobile_"]');

      for (const input of mobileInputs) {
        const isHidden = input.offsetParent === null || input.closest(".hidden");
        if (isHidden) continue;

        const isRequired = input.hasAttribute("required");
        if (!validateMobileField(input, isRequired)) return false;
      }

      return true;
    }

    function updateProgress() {
      const progressFill = document.getElementById("progressFill");
      const currentStepText = document.getElementById("currentStepText");
      const width = ((currentStep - 1) / 2) * 100;

      progressFill.style.width = width + "%";
      currentStepText.textContent = currentStep;

      stepEls().forEach(step => {
        step.classList.toggle("active", Number(step.dataset.step) === currentStep);
      });

      stepPills().forEach(pill => {
        const stepNum = Number(pill.dataset.step);
        pill.classList.toggle("active", stepNum === currentStep);
        pill.classList.toggle("done", stepNum < currentStep);
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function validateDriverSection() {
      const ownerIsDriver = document.getElementById("ownerIsDriver").checked;
      const driverCards = document.querySelectorAll("#driversContainer .repeat-card");

      if (!ownerIsDriver && driverCards.length === 0) {
        alert("Please add at least one driver in Step 3.");
        return false;
      }

      return true;
    }

    function validateStep(stepNumber) {
      const step = document.querySelector('.form-step[data-step="' + stepNumber + '"]');
      const requiredFields = step.querySelectorAll("[required]");

      for (const field of requiredFields) {
        const isHidden = field.offsetParent === null || field.closest(".hidden");
        if (isHidden) continue;

        if (field.type === "checkbox") {
          if (!field.checked) {
            field.focus();
            field.reportValidity();
            return false;
          }
        } else if (field.type === "file") {
          if (!field.files || !field.files.length) {
            field.focus();
            field.reportValidity();
            return false;
          }
        } else if (!field.value) {
          field.focus();
          field.reportValidity();
          return false;
        }
      }

      if (!validateAllMobileFields(stepNumber)) return false;

      if (stepNumber === 3 && !validateDriverSection()) return false;

      return true;
    }

    function nextStep() {
      if (!validateStep(currentStep)) return;
      if (currentStep < 3) {
        currentStep += 1;
        updateProgress();
      }
    }

    function prevStep() {
      if (currentStep > 1) {
        currentStep -= 1;
        updateProgress();
      }
    }

    function removeCard(button) {
      button.closest(".repeat-card").remove();
    }

    function toggleFitnessSection(idx) {
      const select = document.querySelector(`[name="fitness_status_${idx}"]`);
      const wrap = document.getElementById(`fitnessWrap_${idx}`);
      const expiry = document.querySelector(`[name="fitness_expiry_${idx}"]`);
      const file = document.querySelector(`[name="vehicle_fitness_${idx}"]`);

      if (!select || !wrap || !expiry || !file) return;

      const needsFitness = select.value === "available";

      if (needsFitness) {
        wrap.classList.remove("hidden");
        expiry.required = true;
        file.required = true;
      } else {
        wrap.classList.add("hidden");
        expiry.required = false;
        file.required = false;
        expiry.value = "";
        file.value = "";
      }
    }

    function addVehicleCard() {
      vehicleCount += 1;
      const idx = vehicleCount;
      const today = getTodayString();

      const container = document.getElementById("vehiclesContainer");
      const card = document.createElement("div");
      card.className = "repeat-card";
      card.dataset.index = idx;

      card.innerHTML = `
        <div class="repeat-head">
          <h3>Vehicle ${idx}</h3>
          ${idx > 1 ? `<button type="button" class="remove-link" onclick="removeCard(this)">Remove</button>` : ""}
        </div>

        <div class="form-grid two-col">
          <div class="field-group">
            <label>Vehicle Number <span>*</span></label>
            <input type="text" name="vehicle_number_${idx}" placeholder="Enter vehicle number" required />
          </div>

          <div class="field-group">
            <label>Vehicle Category <span>*</span></label>
            <select name="vehicle_category_${idx}" required>
              <option value="">Select category</option>
              <option>Sedan</option>
              <option>Ertiga</option>
              <option>Xylo</option>
              <option>Innova Crysta</option>
              <option>Hycross</option>
              <option>Fortuner</option>
              <option>Tempo Traveller (12+1)</option>
              <option>Tempo Traveller (14+1)</option>
              <option>Tempo Traveller (18+1)</option>
              <option>Urbania</option>
            </select>
          </div>

          <div class="field-group">
            <label>Insurance Expiry Date <span>*</span></label>
            <input type="date" name="insurance_expiry_${idx}" min="${today}" required />
          </div>

          <div class="field-group">
            <label>Permit Expiry Date <span>*</span></label>
            <input type="date" name="permit_expiry_${idx}" min="${today}" required />
          </div>

          <div class="field-group full-width">
            <label>Fitness Certificate Status <span>*</span></label>
            <select name="fitness_status_${idx}" onchange="toggleFitnessSection(${idx})" required>
              <option value="">Select fitness status</option>
              <option value="available">Yes, available</option>
              <option value="new_vehicle">It’s a new vehicle</option>
            </select>
            <small class="fitness-note">
              Select “It’s a new vehicle” only when fitness certificate is genuinely not required.
            </small>
          </div>
        </div>

        <div class="fitness-box hidden" id="fitnessWrap_${idx}">
          <div class="form-grid two-col">
            <div class="field-group">
              <label>Fitness Expiry Date <span>*</span></label>
              <input type="date" name="fitness_expiry_${idx}" min="${today}" />
            </div>

            <div class="field-group">
              <label>Fitness Certificate <span>*</span></label>
              <input type="file" name="vehicle_fitness_${idx}" accept=".jpg,.jpeg,.png,.pdf" />
            </div>
          </div>
        </div>

        <div class="subcard compact">
          <div class="subcard-head"><h4>Vehicle Documents</h4></div>
          <div class="form-grid three-col">
            <div class="field-group">
              <label>RC Front <span>*</span></label>
              <input type="file" name="vehicle_rc_front_${idx}" accept=".jpg,.jpeg,.png,.pdf" required />
            </div>
            <div class="field-group">
              <label>RC Back <span>*</span></label>
              <input type="file" name="vehicle_rc_back_${idx}" accept=".jpg,.jpeg,.png,.pdf" required />
            </div>
            <div class="field-group">
              <label>Insurance <span>*</span></label>
              <input type="file" name="vehicle_insurance_${idx}" accept=".jpg,.jpeg,.png,.pdf" required />
            </div>
            <div class="field-group">
              <label>Permit <span>*</span></label>
              <input type="file" name="vehicle_permit_${idx}" accept=".jpg,.jpeg,.png,.pdf" required />
            </div>
          </div>
        </div>

        <div class="subcard compact">
          <div class="subcard-head"><h4>Vehicle Photos</h4></div>
          <div class="form-grid three-col">
            <div class="field-group">
              <label>Front Photo <span>*</span></label>
              <input type="file" name="vehicle_front_${idx}" accept=".jpg,.jpeg,.png" required />
            </div>
            <div class="field-group">
              <label>Back Photo <span>*</span></label>
              <input type="file" name="vehicle_back_${idx}" accept=".jpg,.jpeg,.png" required />
            </div>
            <div class="field-group">
              <label>Side Photo 1 <span>*</span></label>
              <input type="file" name="vehicle_side1_${idx}" accept=".jpg,.jpeg,.png" required />
            </div>
            <div class="field-group">
              <label>Side Photo 2 <span>*</span></label>
              <input type="file" name="vehicle_side2_${idx}" accept=".jpg,.jpeg,.png" required />
            </div>
            <div class="field-group">
              <label>Interior Photo 1 <span>*</span></label>
              <input type="file" name="vehicle_interior1_${idx}" accept=".jpg,.jpeg,.png" required />
            </div>
            <div class="field-group">
              <label>Interior Photo 2 <span>*</span></label>
              <input type="file" name="vehicle_interior2_${idx}" accept=".jpg,.jpeg,.png" required />
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);
      toggleFitnessSection(idx);
    }

    function addDriverCard() {
      driverCount += 1;
      const idx = driverCount;
      const today = getTodayString();

      const container = document.getElementById("driversContainer");
      const card = document.createElement("div");
      card.className = "repeat-card";
      card.dataset.index = idx;

      card.innerHTML = `
        <div class="repeat-head">
          <h3>Extra Driver ${idx}</h3>
          <button type="button" class="remove-link" onclick="removeCard(this)">Remove</button>
        </div>

        <div class="form-grid two-col">
          <div class="field-group">
            <label>Driver Name <span>*</span></label>
            <input type="text" name="driver_name_${idx}" placeholder="Enter driver name" required />
          </div>

          <div class="field-group">
            <label>Driver Mobile Number <span>*</span></label>
            <input type="tel" name="driver_mobile_${idx}" placeholder="10-digit mobile number" maxlength="10" inputmode="numeric" required />
          </div>

          <div class="field-group">
            <label>License Expiry Date <span>*</span></label>
            <input type="date" name="driver_license_expiry_${idx}" min="${today}" required />
          </div>
        </div>

        <div class="subcard compact">
          <div class="subcard-head"><h4>Driver Documents</h4></div>
          <div class="form-grid three-col">
            <div class="field-group">
              <label>Driver Aadhaar Front <span>*</span></label>
              <input type="file" name="driver_aadhaar_front_${idx}" accept=".jpg,.jpeg,.png,.pdf" required />
            </div>
            <div class="field-group">
              <label>Driver Aadhaar Back <span>*</span></label>
              <input type="file" name="driver_aadhaar_back_${idx}" accept=".jpg,.jpeg,.png,.pdf" required />
            </div>
            <div class="field-group">
              <label>Driver License Front <span>*</span></label>
              <input type="file" name="driver_license_front_${idx}" accept=".jpg,.jpeg,.png,.pdf" required />
            </div>
            <div class="field-group">
              <label>Driver License Back <span>*</span></label>
              <input type="file" name="driver_license_back_${idx}" accept=".jpg,.jpeg,.png,.pdf" required />
            </div>
            <div class="field-group">
              <label>Driver Photo <span>*</span></label>
              <input type="file" name="driver_photo_${idx}" accept=".jpg,.jpeg,.png" required />
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);

      const driverMobileInput = card.querySelector(`[name="driver_mobile_${idx}"]`);
      setupDynamicMobileRestriction(driverMobileInput);
    }

    function toggleOwnerDriverMode() {
      const checked = document.getElementById("ownerIsDriver").checked;
      const ownerLicenseExpiryWrap = document.getElementById("ownerLicenseExpiryWrap");
      const ownerLicenseExpiry = document.getElementById("ownerLicenseExpiry");
      const ownerDriverNotice = document.getElementById("ownerDriverNotice");

      document.getElementById("ownerIsDriverValue").value = checked ? "yes" : "no";

      ownerDriverNotice.classList.toggle("hidden", !checked);

      if (checked) {
        ownerLicenseExpiryWrap.classList.remove("hidden");
        ownerLicenseExpiry.required = true;
      } else {
        ownerLicenseExpiryWrap.classList.add("hidden");
        ownerLicenseExpiry.required = false;
        ownerLicenseExpiry.value = "";
        ownerLicenseExpiry.setCustomValidity("");
      }
    }

    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result || "";
          const base64 = String(result).split(",")[1] || "";
          resolve({
            name: file.name,
            type: file.type || "application/octet-stream",
            size: file.size,
            data: base64
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    async function readInputFile(input) {
      if (!input || !input.files || !input.files.length) return null;
      return fileToBase64(input.files[0]);
    }

    async function buildPayload() {
      const ownerIsDriver = document.getElementById("ownerIsDriver").checked;

      const owner = {
        owner_name: document.getElementById("ownerName").value.trim(),
        owner_mobile: document.getElementById("ownerMobile").value.trim(),
        alternate_mobile: document.getElementById("alternateMobile").value.trim(),
        rto_mobile: document.getElementById("rtoMobile").value.trim(),
        owner_address: document.getElementById("ownerAddress").value.trim(),
        owner_license_expiry: document.getElementById("ownerLicenseExpiry").value,
        owner_is_driver_value: ownerIsDriver ? "yes" : "no",
        owner_aadhaar_front: await readInputFile(document.getElementById("ownerAadhaarFront")),
        owner_aadhaar_back: await readInputFile(document.getElementById("ownerAadhaarBack")),
        owner_license_front: await readInputFile(document.getElementById("ownerLicenseFront")),
        owner_license_back: await readInputFile(document.getElementById("ownerLicenseBack")),
        owner_photo: await readInputFile(document.getElementById("ownerPhoto"))
      };

      const vehicles = [];
      for (const card of document.querySelectorAll("#vehiclesContainer .repeat-card")) {
        const idx = card.dataset.index;
        const vehicleNo = card.querySelector(`[name="vehicle_number_${idx}"]`)?.value.trim();
        if (!vehicleNo) continue;

        vehicles.push({
          index: Number(idx),
          vehicle_number: vehicleNo,
          vehicle_category: card.querySelector(`[name="vehicle_category_${idx}"]`)?.value || "",
          insurance_expiry: card.querySelector(`[name="insurance_expiry_${idx}"]`)?.value || "",
          permit_expiry: card.querySelector(`[name="permit_expiry_${idx}"]`)?.value || "",
          fitness_status: card.querySelector(`[name="fitness_status_${idx}"]`)?.value || "",
          fitness_expiry: card.querySelector(`[name="fitness_expiry_${idx}"]`)?.value || "",
          files: {
            rc_front: await readInputFile(card.querySelector(`[name="vehicle_rc_front_${idx}"]`)),
            rc_back: await readInputFile(card.querySelector(`[name="vehicle_rc_back_${idx}"]`)),
            insurance: await readInputFile(card.querySelector(`[name="vehicle_insurance_${idx}"]`)),
            permit: await readInputFile(card.querySelector(`[name="vehicle_permit_${idx}"]`)),
            fitness: await readInputFile(card.querySelector(`[name="vehicle_fitness_${idx}"]`)),
            front: await readInputFile(card.querySelector(`[name="vehicle_front_${idx}"]`)),
            back: await readInputFile(card.querySelector(`[name="vehicle_back_${idx}"]`)),
            side1: await readInputFile(card.querySelector(`[name="vehicle_side1_${idx}"]`)),
            side2: await readInputFile(card.querySelector(`[name="vehicle_side2_${idx}"]`)),
            interior1: await readInputFile(card.querySelector(`[name="vehicle_interior1_${idx}"]`)),
            interior2: await readInputFile(card.querySelector(`[name="vehicle_interior2_${idx}"]`))
          }
        });
      }

      const drivers = [];
      for (const card of document.querySelectorAll("#driversContainer .repeat-card")) {
        const idx = card.dataset.index;
        const driverName = card.querySelector(`[name="driver_name_${idx}"]`)?.value.trim();
        if (!driverName) continue;

        drivers.push({
          index: Number(idx),
          driver_name: driverName,
          driver_mobile: card.querySelector(`[name="driver_mobile_${idx}"]`)?.value.trim() || "",
          driver_license_expiry: card.querySelector(`[name="driver_license_expiry_${idx}"]`)?.value || "",
          files: {
            aadhaar_front: await readInputFile(card.querySelector(`[name="driver_aadhaar_front_${idx}"]`)),
            aadhaar_back: await readInputFile(card.querySelector(`[name="driver_aadhaar_back_${idx}"]`)),
            license_front: await readInputFile(card.querySelector(`[name="driver_license_front_${idx}"]`)),
            license_back: await readInputFile(card.querySelector(`[name="driver_license_back_${idx}"]`)),
            photo: await readInputFile(card.querySelector(`[name="driver_photo_${idx}"]`))
          }
        });
      }

      return { owner, vehicles, drivers };
    }

    async function submitVendorForm(e) {
  if (e) e.preventDefault();

      if (!validateStep(3)) return;
      if (!SCRIPT_URL) {
        alert("Apps Script Web App URL is not added yet.");
        return;
      }

      const form = document.getElementById("vendorForm");
      const submitBtn = document.getElementById("submitBtn");
      const successMessage = document.getElementById("successMessage");
      const waitingMessage = document.getElementById("submitWaitingMessage");

      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
      waitingMessage.classList.remove("hidden");

      try {
        const payload = await buildPayload();

        const response = await fetch(SCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(payload)
        });

        const text = await response.text();
        let result = {};

        try {
          result = JSON.parse(text);
        } catch (err) {
          throw new Error("Invalid server response: " + text);
        }

        if (!result.success) {
          throw new Error(result.message || "Submission failed");
        }

        waitingMessage.classList.add("hidden");
        successMessage.classList.remove("hidden");
        successMessage.innerHTML = `
          <h3>Successfully submitted</h3>
          <p>Our verification team will contact you within 24 hours.</p>
        `;

        form.classList.add("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error(error);
        waitingMessage.classList.add("hidden");
        alert(error.message || "Error submitting form. Please try again.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Registration";
      }
    }

    let termsModalInstance = null;

    function openTermsModal() {
      if (!validateStep(3)) return;

      const checkbox = document.getElementById("termsAgreeCheckbox");
      const confirmBtn = document.getElementById("confirmSubmitBtn");

      checkbox.checked = false;
      confirmBtn.disabled = true;

      const modalEl = document.getElementById("termsModal");
      termsModalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
      termsModalInstance.show();
    }

    function confirmTermsAndSubmit() {
      const checkbox = document.getElementById("termsAgreeCheckbox");
      if (!checkbox.checked) {
        alert("Please accept the Terms & Conditions before submitting.");
        return;
      }

      if (termsModalInstance) {
        termsModalInstance.hide();
      }

      submitVendorForm();
    }
    document.getElementById("termsAgreeCheckbox").addEventListener("change", function () {
  document.getElementById("confirmSubmitBtn").disabled = !this.checked;
});
    document.getElementById("ownerIsDriver").addEventListener("change", toggleOwnerDriverMode);

    document.querySelectorAll(".step-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        const targetStep = Number(pill.dataset.step);
        if (targetStep < currentStep) {
          currentStep = targetStep;
          updateProgress();
        }
      });
    });

    document.getElementById("vendorForm").addEventListener("submit", submitVendorForm);

    setupMobileRestrictions();
    addVehicleCard();
    addDriverCard();
    setMinDateForAllDateInputs();
    toggleOwnerDriverMode();
    updateProgress();
  