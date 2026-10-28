const usernameInput = document.getElementById('callsign-input');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('pswd');
const confirmPasswordInput = document.getElementById('pswdconfirm');
const termsCheckbox = document.querySelector('.register-form input[type="checkbox"]');

const readyCounter = document.getElementById('counter-span');

const pending1 = document.getElementById('pending-1');
const pending2 = document.getElementById('pending-2');
const pending3 = document.getElementById('pending-3');
const pending4 = document.getElementById('pending-4');
const pending5 = document.getElementById('pending-5');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#-])[A-Za-z\d@$!%*?&_#-]{8,}$/;
const callsignRegex = /^[a-zA-Z0-9_-]{3,20}$/;
const checkIconHTML = '<i class="fas fa-check" style="color: hsl(77 67% 39%);"></i>';

function setupPasswordVisibility() {
    const toggleButtons = document.querySelectorAll('.toggle-pswd');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetInput = this.previousElementSibling;
            if (targetInput && targetInput.tagName === 'INPUT') {
                const isPassword = targetInput.type === 'password';
                targetInput.type = isPassword ? 'text' : 'password';
                this.classList.toggle('is-visible', isPassword);
            }
        });
    });
}

function setFieldStatus(inputElement, value, isValid, pendingElement) {
    if (value.length === 0) {
        inputElement.classList.remove('valid', 'invalid');
        pendingElement.textContent = "Pending";
        return 0;
    }

    if (isValid) {
        inputElement.classList.add('valid');
        inputElement.classList.remove('invalid');
        pendingElement.innerHTML = checkIconHTML;
        return 1;
    } else {
        inputElement.classList.add('invalid');
        inputElement.classList.remove('valid');
        pendingElement.textContent = "Pending";
        return 0;
    }
}

function updateFormValidation() {
    let validCount = 0;

    const usernameVal = usernameInput.value;
    validCount += setFieldStatus(usernameInput, usernameVal, callsignRegex.test(usernameVal), pending1);

    const emailVal = emailInput.value;
    validCount += setFieldStatus(emailInput, emailVal, emailVal.includes('@') && emailVal.includes('.'), pending2);

    const passwordVal = passwordInput.value;
    validCount += setFieldStatus(passwordInput, passwordVal, passwordRegex.test(passwordVal), pending3);

    const confirmVal = confirmPasswordInput.value;
    const isConfirmValid = confirmVal === passwordVal && passwordRegex.test(passwordVal) && confirmVal.length > 0;
    validCount += setFieldStatus(confirmPasswordInput, confirmVal, isConfirmValid, pending4);

    if (termsCheckbox.checked) {
        pending5.innerHTML = checkIconHTML;
        validCount += 1;
    } else {
        pending5.textContent = "Pending";
    }

    if (readyCounter) {
        readyCounter.textContent = `${validCount}/5 READY`;
    }
}

usernameInput.addEventListener('input', updateFormValidation);
emailInput.addEventListener('input', updateFormValidation);
passwordInput.addEventListener('input', updateFormValidation);
confirmPasswordInput.addEventListener('input', updateFormValidation);
termsCheckbox.addEventListener('change', updateFormValidation);

setupPasswordVisibility();
updateFormValidation();