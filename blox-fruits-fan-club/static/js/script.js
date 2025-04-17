document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    // Handle search functionality
    const searchInput = document.getElementById('searchInput');
    const contactsList = document.getElementById('contactsList');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const allContacts = document.getElementById('allContacts');
    
    if (searchInput) {
        let debounceTimer;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            
            debounceTimer = setTimeout(() => {
                const query = searchInput.value.trim();
                
                if (query.length > 0) {
                    fetch(`/search?query=${encodeURIComponent(query)}`)
                        .then(response => response.json())
                        .then(data => {
                            displaySearchResults(data);
                        })
                        .catch(error => {
                            console.error('Error searching contacts:', error);
                        });
                } else {
                    // If search is empty, show all contacts
                    if (allContacts) allContacts.style.display = 'block';
                    if (contactsList) contactsList.style.display = 'none';
                    if (noResultsMessage) noResultsMessage.style.display = 'none';
                }
            }, 300); // Debounce for 300ms
        });
    }
    
    function displaySearchResults(contacts) {
        if (allContacts) allContacts.style.display = 'none';
        
        if (contacts.length === 0) {
            if (contactsList) contactsList.style.display = 'none';
            if (noResultsMessage) noResultsMessage.style.display = 'block';
            return;
        }
        
        if (noResultsMessage) noResultsMessage.style.display = 'none';
        if (contactsList) {
            contactsList.style.display = 'block';
            contactsList.innerHTML = '';
            
            contacts.forEach(contact => {
                const contactCard = document.createElement('div');
                contactCard.className = 'card mb-3';
                contactCard.innerHTML = `
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title mb-0">${escapeHtml(contact.name)}</h5>
                            <div>
                                <a href="/edit/${contact.id}" class="btn btn-sm btn-outline-primary me-1" data-bs-toggle="tooltip" title="Edit">
                                    <i class="bi bi-pencil"></i>
                                </a>
                                <button onclick="deleteContact(${contact.id}, '${escapeHtml(contact.name)}')" class="btn btn-sm btn-outline-danger" data-bs-toggle="tooltip" title="Delete">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                        <p class="card-text mb-1"><i class="bi bi-telephone me-2"></i>${escapeHtml(contact.phone)}</p>
                        ${contact.email ? `<p class="card-text mb-1"><i class="bi bi-envelope me-2"></i>${escapeHtml(contact.email)}</p>` : ''}
                        ${contact.address ? `<p class="card-text"><i class="bi bi-geo-alt me-2"></i>${escapeHtml(contact.address)}</p>` : ''}
                    </div>
                `;
                contactsList.appendChild(contactCard);
            });
            
            // Reinitialize tooltips for the new elements
            const newTooltipTriggers = contactsList.querySelectorAll('[data-bs-toggle="tooltip"]');
            [...newTooltipTriggers].map(el => new bootstrap.Tooltip(el));
        }
    }
    
    // Confirm contact deletion
    window.deleteContact = function(id, name) {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `/delete/${id}`;
            document.body.appendChild(form);
            form.submit();
        }
    };
    
    // Helper function to prevent XSS
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});
