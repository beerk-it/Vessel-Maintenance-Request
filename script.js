// Google Apps Script Web App URL - Replace with your own URL after deploying
const GOOGLE_SCRIPT_URL = 'https://script.google.com/a/macros/masterliveaboards.com/s/AKfycbxdNVaiOiwnAS3snUX5ya0qfnl2o-_LAztbP-gHa7hjUy-6eXGFkv33rz6YCN8r6a6J3A/exec';

// Task counter
let taskCounter = 1;

// Add new task row
function addTask() {
    const container = document.getElementById('tasksContainer');
    const taskRows = container.querySelectorAll('.task-row');
    const newIndex = taskRows.length;
    
    const newTaskRow = document.createElement('div');
    newTaskRow.className = 'task-row';
    newTaskRow.setAttribute('data-task-index', newIndex);
    newTaskRow.innerHTML = `
        <div class="task-row-header">
            <span class="task-number">Task ${newIndex + 1}</span>
            <button type="button" class="btn-remove-task" onclick="removeTask(this)">Remove</button>
        </div>
        <div class="form-group">
            <label>Task Name <span class="required">*</span></label>
            <input type="text" name="taskName[]" required placeholder="Enter task name" class="task-name-input">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Frequency Type <span class="required">*</span></label>
                <div class="button-group">
                    <input type="radio" name="frequencyType[]" id="freqTypeDays${newIndex}" value="Days" required class="frequency-type-radio">
                    <label for="freqTypeDays${newIndex}" class="button-option">Days</label>
                    <input type="radio" name="frequencyType[]" id="freqTypeHours${newIndex}" value="Hours" required class="frequency-type-radio">
                    <label for="freqTypeHours${newIndex}" class="button-option">Hours</label>
                </div>
            </div>
            <div class="form-group">
                <label>Frequency Value <span class="required">*</span></label>
                <input type="number" name="frequencyValue[]" required placeholder="Enter number" min="0" step="0.01" class="frequency-value-input">
            </div>
        </div>
    `;
    
    container.appendChild(newTaskRow);
    updateTaskNumbers();
    updateRemoveButtons();
}

// Remove task row
function removeTask(button) {
    const taskRow = button.closest('.task-row');
    const container = document.getElementById('tasksContainer');
    const taskRows = container.querySelectorAll('.task-row');
    
    if (taskRows.length > 1) {
        taskRow.remove();
        updateTaskNumbers();
        updateRemoveButtons();
    }
}

// Update task numbers
function updateTaskNumbers() {
    const taskRows = document.querySelectorAll('.task-row');
    taskRows.forEach((row, index) => {
        const taskNumber = row.querySelector('.task-number');
        taskNumber.textContent = `Task ${index + 1}`;
    });
}

// Update remove buttons visibility
function updateRemoveButtons() {
    const taskRows = document.querySelectorAll('.task-row');
    const removeButtons = document.querySelectorAll('.btn-remove-task');
    
    if (taskRows.length > 1) {
        removeButtons.forEach(btn => btn.style.display = 'block');
    } else {
        removeButtons.forEach(btn => btn.style.display = 'none');
    }
}

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
    
    // Get radio button values
    const engineType = formData.get('engineType');
    const countingBy = formData.get('countingBy');
    
    // Collect all tasks
    const taskNames = formData.getAll('taskName[]');
    const frequencyTypes = formData.getAll('frequencyType[]');
    const frequencyValues = formData.getAll('frequencyValue[]');
    
    const tasks = [];
    for (let i = 0; i < taskNames.length; i++) {
        tasks.push({
            taskName: taskNames[i],
            frequencyType: frequencyTypes[i],
            frequencyValue: frequencyValues[i]
        });
    }
    
    const data = {
        vessel: formData.get('vessel'),
        engineName: formData.get('engineName'),
        engineType: engineType,
        countingBy: countingBy,
        tasks: tasks,
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
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('error', 'Please enter a valid email address');
        return false;
    }
    
    // Validate all tasks
    const taskRows = document.querySelectorAll('.task-row');
    for (let row of taskRows) {
        const taskName = row.querySelector('.task-name-input').value.trim();
        const frequencyType = row.querySelector('.frequency-type-select').value;
        const frequencyValue = parseFloat(row.querySelector('.frequency-value-input').value);
        
        if (!taskName) {
            showMessage('error', 'Please fill in all task names');
            return false;
        }
        
        if (!frequencyType) {
            showMessage('error', 'Please select frequency type for all tasks');
            return false;
        }
        
        if (!frequencyValue || frequencyValue <= 0) {
            showMessage('error', 'Frequency value must be greater than 0 for all tasks');
            return false;
        }
    }
    
    return true;
}

// Initialize remove buttons on page load
document.addEventListener('DOMContentLoaded', function() {
    updateRemoveButtons();
});

// Add real-time validation
document.getElementById('email').addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
        this.style.borderColor = 'var(--error-color)';
        showMessage('error', 'Please enter a valid email address');
    } else {
        this.style.borderColor = '#e2e8f0';
    }
});

// Reset form button handler
document.querySelector('.btn-reset').addEventListener('click', function() {
    const messageDiv = document.getElementById('message');
    messageDiv.style.display = 'none';
});
