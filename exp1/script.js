document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");
  const bmiDisplay = document.getElementById("bmiDisplay");
  const successBox = document.getElementById("successBox");
  const successDetails = document.getElementById("successDetails");

  // Live BMI Calculation
  function calculateBMI() {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (height >= 100 && height <= 250 && weight >= 30 && weight <= 250) {
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      
      let category = "";
      let badgeClass = "";

      if (bmi < 18.5) {
        category = "Underweight";
        badgeClass = "bg-warning text-dark";
      } else if (bmi < 25) {
        category = "Optimal";
        badgeClass = "bg-success text-white";
      } else if (bmi < 30) {
        category = "Overweight";
        badgeClass = "bg-warning text-dark";
      } else {
        category = "Obese";
        badgeClass = "bg-danger text-white";
      }

      bmiDisplay.className = `bmi-badge text-center ${badgeClass}`;
      bmiDisplay.textContent = `${bmi} (${category})`;
      return bmi;
    } else {
      bmiDisplay.className = "bmi-badge bg-dark border border-secondary text-secondary text-center";
      bmiDisplay.textContent = "--.- (Enter Metrics)";
      return null;
    }
  }

  heightInput.addEventListener("input", calculateBMI);
  weightInput.addEventListener("input", calculateBMI);

  // Form Validation
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    let isValid = true;

    // Helper validation function
    const validateField = (field, condition) => {
      if (condition) {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
      } else {
        field.classList.remove("is-valid");
        field.classList.add("is-invalid");
        isValid = false;
      }
    };

    // 1. Name: At least 3 letters
    const fullName = document.getElementById("fullName");
    validateField(fullName, /^[A-Za-z\s]{3,}$/.test(fullName.value.trim()));

    // 2. Email: Standard Regex
    const email = document.getElementById("email");
    validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));

    // 3. Phone: 10 digit Indian format
    const phone = document.getElementById("phone");
    validateField(phone, /^[6-9]\d{9}$/.test(phone.value.trim()));

    // 4. Age: 16 to 90
    const age = document.getElementById("age");
    const ageVal = parseInt(age.value, 10);
    validateField(age, !isNaN(ageVal) && ageVal >= 16 && ageVal <= 90);

    // 5. Height & Weight
    const hVal = parseFloat(heightInput.value);
    const wVal = parseFloat(weightInput.value);
    validateField(heightInput, !isNaN(hVal) && hVal >= 100 && hVal <= 250);
    validateField(weightInput, !isNaN(wVal) && wVal >= 30 && wVal <= 250);

    // 6. Tier Selection
    const tier = document.getElementById("membershipTier");
    validateField(tier, tier.value !== "");

    // 7. Terms
    const terms = document.getElementById("termsCheck");
    validateField(terms, terms.checked);

    // Submission outcome
    if (isValid) {
      const computedBmi = calculateBMI();
      successBox.classList.remove("d-none");
      successDetails.textContent = `Client ${fullName.value.trim()} registered successfully under the ${tier.options[tier.selectedIndex].text} track with a baseline BMI of ${computedBmi}.`;
      form.reset();
      
      // Clear visual validation indicators
      setTimeout(() => {
        form.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
        bmiDisplay.className = "bmi-badge bg-dark border border-secondary text-secondary text-center";
        bmiDisplay.textContent = "--.- (Enter Metrics)";
      }, 4000);
    } else {
      successBox.classList.add("d-none");
    }
  });
});