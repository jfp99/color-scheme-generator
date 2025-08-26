document.addEventListener('DOMContentLoaded', function() {
    const colorPicker = document.getElementById('color-picker');
    const colorValue = document.getElementById('color-value');
    const modeSelect = document.getElementById('mode');
    const getSchemeBtn = document.getElementById('get-scheme');
    const colorScheme = document.getElementById('color-scheme');
    const notification = document.getElementById('notification');

    // Update color value display when color picker changes
    colorPicker.addEventListener('input', function() {
        colorValue.textContent = colorPicker.value;
    });

    // Fetch color scheme when button is clicked
    getSchemeBtn.addEventListener('click', function() {
        const selectedColor = colorPicker.value.substring(1); // Remove # from color value
        const selectedMode = modeSelect.value;
        
        // Show loading state
        colorScheme.innerHTML = '<div class="loading">Generating your color scheme...</div>';
        
        fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedMode}&count=8`)
            .then(res => res.json())
            .then(data => {
                renderColors(data);
            })
            .catch(error => {
                colorScheme.innerHTML = '<div class="loading">Error fetching color scheme. Please try again.</div>';
                console.error('Error:', error);
            });
    });

// Render color scheme
function renderColors(data) {
    colorScheme.innerHTML = '';
    
    data.colors.forEach(color => {
        const hexValue = color.hex.value;
        
        const colorElement = document.createElement('div');
        colorElement.className = 'color';
        colorElement.style.backgroundColor = hexValue;
        colorElement.innerHTML = `
            <div class="color-value-display">${hexValue}</div>
        `;
        
        // Add click event to copy color value
        colorElement.addEventListener('click', function() {
            copyToClipboard(hexValue);
            showNotification();
        });
        
        colorScheme.appendChild(colorElement);
    });
}

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

// Show notification
function showNotification() {
    notification.classList.add('show');
    
    setTimeout(function() {
        notification.classList.remove('show');
    }, 2000);
}

// Generate initial scheme on page load
getSchemeBtn.click();
});