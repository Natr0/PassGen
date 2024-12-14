const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
}

function getStrengthColor(strength) {
    const colors = ['#ff4444', '#ffbb33', '#00C851', '#33b5e5', '#2BBBAD'];
    return colors[strength];
}

export function initPasswordGenerator() {
    const passwordOutput = document.getElementById('password-output');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const uppercaseCheck = document.getElementById('uppercase');
    const lowercaseCheck = document.getElementById('lowercase');
    const numbersCheck = document.getElementById('numbers');
    const symbolsCheck = document.getElementById('symbols');
    const generateBtn = document.getElementById('generate');
    const copyBtn = document.getElementById('copy-button');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    function updateStrengthMeter(password) {
        const strength = calculatePasswordStrength(password);
        const strengthPercentage = (strength / 4) * 100;
        
        strengthBar.style.width = `${strengthPercentage}%`;
        strengthBar.style.backgroundColor = getStrengthColor(strength);
        
        const strengthLabels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
        strengthText.textContent = `Password Strength: ${strengthLabels[strength]}`;
    }

    function generatePassword() {
        let charset = '';
        if (uppercaseCheck.checked) charset += characters.uppercase;
        if (lowercaseCheck.checked) charset += characters.lowercase;
        if (numbersCheck.checked) charset += characters.numbers;
        if (symbolsCheck.checked) charset += characters.symbols;

        // Ensure at least lowercase is selected if nothing is selected
        if (!charset) {
            charset = characters.lowercase;
            lowercaseCheck.checked = true;
        }

        let password = '';
        const length = parseInt(lengthSlider.value);

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        passwordOutput.value = password;
        updateStrengthMeter(password);
    }

    // Update length display without generating password
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });

    // Generate password only when the button is clicked
    generateBtn.addEventListener('click', generatePassword);

    copyBtn.addEventListener('click', () => {
        if (!passwordOutput.value) return; // Don't copy if no password is generated
        
        navigator.clipboard.writeText(passwordOutput.value).then(() => {
            copyBtn.innerHTML = '<i class="bi bi-check-lg"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="bi bi-clipboard"></i>';
            }, 2000);
        });
    });

    // Clear initial password output and strength meter
    passwordOutput.value = '';
    strengthBar.style.width = '0';
    strengthText.textContent = 'Password Strength';
}