// Main JavaScript File

// Initialize localStorage if empty
if (!localStorage.getItem('limonach_points')) {
    localStorage.setItem('limonach_points', '0');
}

// Language Management
function changeLanguage() {
    const select = document.getElementById('languageSelect');
    const lang = select.value;
    localStorage.setItem('limonach_language', lang);
    
    // Update direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Translate page
    translatePage();
}

function translatePage() {
    const currentLang = localStorage.getItem('limonach_language') || 'ar';
    
    // Update language selector
    const select = document.getElementById('languageSelect');
    if (select) {
        select.value = currentLang;
    }
    
    // Translate all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            // Don't override value, just placeholder
        } else {
            element.textContent = translation;
        }
    });
    
    // Translate placeholders
    const placeholders = document.querySelectorAll('[data-translate-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const translation = getTranslation(key);
        element.placeholder = translation;
    });
}

// Toast Notifications
function showToast(message, type = 'info') {
    // Remove existing toast if any
    const existing = document.querySelector('.toast');
    if (existing) {
        existing.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set language and direction
    const currentLang = localStorage.getItem('limonach_language') || 'ar';
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    document.body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // Translate page
    translatePage();
});
