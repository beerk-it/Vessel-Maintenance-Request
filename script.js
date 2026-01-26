// Google Apps Script Web App URL - Replace with your own URL after deploying
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';

// Form submission handler
document.getElementById('maintenanceForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const messageDiv = document.getElementById('message');
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    messageDiv.style.display = 'none';
    
    // Get form data
    const formData = new FormData(this);
    const data = {
        vessel: formData.get('vessel'),
        engineName: formData.get('engineName'),
        engineType: formData.get('engineType'),
        countingBy: formData.get('countingBy'),
        taskName: formData.get('taskName'),
        frequencyType: formData.get('frequencyType'),
        frequencyValue: formData.get('frequencyValue'),
        description: formData.get('description'),
        reason: formData.get('reason'),
        requestBy: formData.get('requestBy'),
        email: formData.get('email'),
        timestamp: new Date().toISOString()
    };
    
    try {
        // Check if Google Script URL is configured
        if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
            throw new Error('Please configure the Google Script URL in script.js');
        }
        
        // Submit to Google Sheets via Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const result = await response.json();
            if (result.status === 'success') {
                showMessage('success', 'Form submitted successfully! Your request has been recorded.');
                this.reset();
            } else {
                throw new Error(result.message || 'Unknown error occurred');
            }
        } else {
            throw new Error('Server error: ' + response.status);
        }
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showMessage('error', 'Failed to submit form. Please check your connection and try again. Error: ' + error.message);
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
    }
});

// Alternative method using form submission (more reliable)
function submitToGoogleSheets(data) {
    // Create a form element and submit it
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_SCRIPT_URL;
    form.target = '_blank';
    
    // Add all form fields as hidden inputs
    Object.keys(data).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
    });
    
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

// Show success/error messages
function showMessage(type, text) {
    const messageDiv = document.getElementById('message');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messageDiv.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Form validation
function validateForm() {
    const form = document.getElementById('maintenanceForm');
    const email = form.email.value;
    const frequencyValue = form.frequencyValue.value;
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('error', 'Please enter a valid email address');
        return false;
    }
    
    // Frequency value validation
    if (frequencyValue <= 0) {
        showMessage('error', 'Frequency value must be greater than 0');
        return false;
    }
    
    return true;
}

// Add real-time validation
document.getElementById('email').addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
        this.style.borderColor = 'var(--error-color)';
        showMessage('error', 'Please enter a valid email address');
    } else {
        this.style.borderColor = 'var(--border-color)';
    }
});

// Reset form button handler
document.querySelector('.btn-reset').addEventListener('click', function() {
    const messageDiv = document.getElementById('message');
    messageDiv.style.display = 'none';
});
