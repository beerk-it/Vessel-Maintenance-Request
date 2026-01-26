// Google Apps Script URL for reading and updating data
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzG5w-JYNTUavBm3NRV1r0Yy-mZSWJYRxQhYzONINdk7Pial9RyajRG5yB8aYwKFPPG/exec';

// Load requests when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadRequests();
});

// Load requests from Google Sheet
async function loadRequests() {
    const tbody = document.getElementById('requestsTableBody');
    const statusFilter = document.getElementById('statusFilter').value;
    
    tbody.innerHTML = '<tr><td colspan="14" class="loading">Loading data...</td></tr>';
    
    try {
        // Get data from Google Apps Script
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getData${statusFilter ? '&status=' + statusFilter : ''}`);
        const result = await response.json();
        
        if (result.status === 'success' && result.data) {
            displayRequests(result.data);
        } else {
            tbody.innerHTML = '<tr><td colspan="14" class="empty-state">No data found</td></tr>';
        }
    } catch (error) {
        console.error('Error loading requests:', error);
        tbody.innerHTML = '<tr><td colspan="14" class="empty-state">Error loading data. Please try again.</td></tr>';
    }
}

// Display requests in table
function displayRequests(data) {
    const tbody = document.getElementById('requestsTableBody');
    
    if (!data || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="14" class="empty-state">No requests found</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    
    data.forEach((row, index) => {
        const tr = document.createElement('tr');
        const status = row[12] || 'Pending'; // Status is in column 13 (index 12)
        // Row number in sheet = index + 2 (row 1 is header, array is 0-indexed)
        const rowNumber = index + 2;
        
        tr.innerHTML = `
            <td>${formatDate(row[0])}</td>
            <td>${row[1] || ''}</td>
            <td>${row[2] || ''}</td>
            <td>${row[3] || ''}</td>
            <td>${row[4] || ''}</td>
            <td>${row[5] || ''}</td>
            <td>${row[6] || ''}</td>
            <td>${row[7] || ''}</td>
            <td>${truncateText(row[8] || '', 50)}</td>
            <td>${truncateText(row[9] || '', 50)}</td>
            <td>${row[10] || ''}</td>
            <td>${row[11] || ''}</td>
            <td><span class="status-badge status-${status.toLowerCase()}">${status}</span></td>
            <td>
                <div class="action-buttons">
                    ${status === 'Pending' ? `
                        <button class="btn-action btn-approve" onclick="updateStatus(${rowNumber}, 'Approved')" title="Approve">
                            ✅ Approve
                        </button>
                        <button class="btn-action btn-reject" onclick="updateStatus(${rowNumber}, 'Rejected')" title="Reject">
                            ❌ Reject
                        </button>
                    ` : ''}
                    ${status === 'Approved' ? `
                        <button class="btn-action btn-complete" onclick="updateStatus(${rowNumber}, 'Completed')" title="Mark as Complete">
                            ✓ Complete
                        </button>
                    ` : ''}
                </div>
            </td>
        `;
        
        // Store row data for reference
        tr.dataset.rowNumber = rowNumber;
        tr.dataset.rowData = JSON.stringify(row);
        
        tbody.appendChild(tr);
    });
}

// Update status of a request
async function updateStatus(rowNumber, newStatus) {
    if (!confirm(`Are you sure you want to ${newStatus.toLowerCase()} this request?`)) {
        return;
    }
    
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'updateStatus',
                rowIndex: rowNumber, // Row number in Google Sheet (row 1 is header)
                status: newStatus
            })
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            showMessage('success', `Request ${newStatus.toLowerCase()} successfully!`);
            loadRequests(); // Reload data
        } else {
            showMessage('error', 'Failed to update status: ' + result.message);
        }
    } catch (error) {
        console.error('Error updating status:', error);
        showMessage('error', 'Failed to update status. Please try again.');
    }
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Truncate text
function truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Show message
function showMessage(type, text) {
    const messageDiv = document.getElementById('message');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}
