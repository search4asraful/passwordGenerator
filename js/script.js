const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const copyNotification = document.getElementById("copyNotification");
const lengthInput = document.getElementById("length");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const passwordHistorySection = document.querySelector(".history-section");
const passwordList = document.getElementById("passwordList");
const clearHistoryBtn = document.getElementById("clearHistory");
const strengthMeter = document.getElementById("strengthMeter");
const strengthText = document.getElementById("strengthText");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

// Character sets
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numbersChars = "0123456789";
const symbolsChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";


// Initialize
let passwordHistory = JSON.parse(localStorage.getItem("passwordHistory")) || [];
updatePasswordHistory();
passwordHistorySection.style.display = passwordHistory.length < 1 ? "none" : "block";

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "retro") {
  body.classList.add("retro-theme");
  themeIcon.className = "fas fa-sun";
}

// Event Listeners
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
clearHistoryBtn.addEventListener("click", clearHistory);
themeToggle.addEventListener("click", toggleTheme);

lengthInput.addEventListener("input", () => {
  lengthSlider.value = lengthInput.value;
  lengthValue.textContent = lengthInput.value;
});

lengthSlider.addEventListener("input", () => {
  lengthInput.value = lengthSlider.value;
  lengthValue.textContent = lengthSlider.value;
});

// Add click event to all option items to toggle checkbox
document.querySelectorAll('.option-item').forEach(item => {
    item.addEventListener('click', function() {
        const checkbox = this.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
    });
});

// Theme toggle function
function toggleTheme() {
  body.classList.toggle("retro-theme");

  if (body.classList.contains("retro-theme")) {
    themeIcon.className = "fas fa-sun";
    localStorage.setItem("theme", "retro");
  } else {
    themeIcon.className = "fas fa-moon";
    localStorage.setItem("theme", "modern");
  }
}

// Generate password function
function generatePassword() {
  let length = parseInt(lengthInput.value);
  let charset = "";

  if (uppercaseCheck.checked) charset += uppercaseChars;
  if (lowercaseCheck.checked) charset += lowercaseChars;
  if (numbersCheck.checked) charset += numbersChars;
  if (symbolsCheck.checked) charset += symbolsChars;

  if (charset === "") {
    alert("Please select at least one character type!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  passwordInput.value = password;
  updatePasswordHistory(password);
  checkPasswordStrength(password);
}

// Copy password function
function copyPassword() {
  if (!passwordInput.value) {
    generatePassword();
  }

  passwordInput.select();
  document.execCommand("copy");

  copyNotification.classList.add("show");
  setTimeout(() => {
    copyNotification.classList.remove("show");
  }, 2000);
}

// Update password history
function updatePasswordHistory(newPassword = null) {
  if (newPassword) {
    passwordHistory.unshift(newPassword);
    if (passwordHistory.length > 5) {
      passwordHistory.pop();
    } else if (passwordHistory.length > 1) {
      passwordHistorySection.style.display = "block";
    }
    localStorage.setItem("passwordHistory", JSON.stringify(passwordHistory));
  }

  passwordList.innerHTML = "";
  passwordHistory.forEach((password) => {
    const passwordItem = document.createElement("div");
    passwordItem.classList.add("password-item");
    passwordItem.textContent = password;
    passwordItem.addEventListener("click", () => {
      navigator.clipboard.writeText(password);
      passwordItem.classList.add("copied");
      setTimeout(() => {
        passwordItem.classList.remove("copied");
      }, 1500);
    });
    passwordList.appendChild(passwordItem);
  });
}

// Clear history
function clearHistory() {
  passwordHistory = [];
  localStorage.removeItem("passwordHistory");
  passwordHistorySection.style.display = "none";
  updatePasswordHistory();
}

// Check password strength
function checkPasswordStrength(password) {
  let strength = 0;

  // Length contributes to strength
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;

  // Character variety contributes to strength
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  // Update strength meter
  strengthMeter.className = "strength-meter-fill";

  if (strength <= 2) {
    strengthMeter.classList.add("strength-weak");
    strengthText.textContent = "Weak";
    strengthText.style.color = "#ef4444";
  } else if (strength <= 3) {
    strengthMeter.classList.add("strength-fair");
    strengthText.textContent = "Fair";
    strengthText.style.color = "#f59e0b";
  } else if (strength <= 4) {
    strengthMeter.classList.add("strength-good");
    strengthText.textContent = "Good";
    strengthText.style.color = "#3b82f6";
  } else {
    strengthMeter.classList.add("strength-strong");
    strengthText.textContent = "Strong";
    strengthText.style.color = "#10b981";
  }
}

// Generate initial password
generatePassword();
