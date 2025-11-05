// Cine.run JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Language Toggle Functionality
    const languageToggle = document.getElementById('languageToggle');
    let currentLanguage = 'en';
    
    const translations = {
        en: {
            title: 'Cine.run - Download Movies',
            heroTitle: 'Download Latest Movies',
            heroSubtitle: 'Discover and download your favorite movies in HD quality',
            bestMovies: 'Best Movies',
            upcomingMovies: 'New Movies',
            downloadBtn: 'Download',
            notifyBtn: 'Get Notified',
            searchPlaceholder: 'Search movies...',
            categories: 'Categories',
            information: 'Information',
            followUs: 'Follow Us',
            aboutUs: 'About Us',
            contact: 'Contact',
            englishMovies: 'English Movies',
            frenchMovies: 'French Movies',
            facebook: '📘 Facebook',
            twitter: '🐦 X (Twitter)',
            instagram: '📷 Instagram',
            tiktok: '🎵 TikTok',
            youtube: '📺 YouTube',
            rights: 'All rights reserved.'
        },
        fr: {
            title: 'Cine.run - Télécharger des Films',
            heroTitle: 'Télécharger les Derniers Films',
            heroSubtitle: 'Découvrez et téléchargez vos films préférés en qualité HD',
            bestMovies: 'Meilleurs Films',
            upcomingMovies: 'Films à Venir',
            downloadBtn: 'Télécharger',
            notifyBtn: 'Être Notifié',
            searchPlaceholder: 'Rechercher des films...',
            categories: 'Catégories',
            information: 'Information',
            followUs: 'Suivez-nous',
            aboutUs: 'À Propos',
            contact: 'Contact',
            englishMovies: 'Films Anglais',
            frenchMovies: 'Films Français',
            facebook: '📘 Facebook',
            twitter: '🐦 X (Twitter)',
            instagram: '📷 Instagram',
            tiktok: '🎵 TikTok',
            youtube: '📺 YouTube',
            rights: 'Tous droits réservés.'
        }
    };
    
    languageToggle.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'en' ? 'fr' : 'en';
        updateLanguage();
        updateLanguageButton();
    });
    
    function updateLanguage() {
        const t = translations[currentLanguage];
        
        // Update page title
        document.title = t.title;
        
        // Update hero section
        document.querySelector('.hero-title').textContent = t.heroTitle;
        document.querySelector('.hero-subtitle').textContent = t.heroSubtitle;
        
        // Update section titles
        document.querySelectorAll('.section-title')[0].textContent = t.bestMovies;
        document.querySelectorAll('.section-title')[1].textContent = t.upcomingMovies;
        
        // Update navigation
        document.querySelectorAll('.nav-link')[0].textContent = t.englishMovies;
        document.querySelectorAll('.nav-link')[1].textContent = t.frenchMovies;
        
        // Update search placeholder
        document.querySelector('.search-input').placeholder = t.searchPlaceholder;
        
        // Update buttons
        document.querySelectorAll('.download-btn').forEach(btn => btn.textContent = t.downloadBtn);
        document.querySelectorAll('.notify-btn').forEach(btn => btn.textContent = t.notifyBtn);
        
        // Update footer
        document.querySelectorAll('.footer-section h4')[0].textContent = t.categories;
        document.querySelectorAll('.footer-section h4')[1].textContent = t.information;
        document.querySelectorAll('.footer-section h4')[2].textContent = t.followUs;
        
        document.querySelectorAll('.footer-section ul li a')[0].textContent = t.englishMovies;
        document.querySelectorAll('.footer-section ul li a')[1].textContent = t.frenchMovies;
        document.querySelectorAll('.footer-section ul li a')[2].textContent = t.aboutUs;
        document.querySelectorAll('.footer-section ul li a')[3].textContent = t.contact;
        
        document.querySelectorAll('.social-link')[0].textContent = t.facebook;
        document.querySelectorAll('.social-link')[1].textContent = t.twitter;
        document.querySelectorAll('.social-link')[2].textContent = t.instagram;
        document.querySelectorAll('.social-link')[3].textContent = t.tiktok;
        document.querySelectorAll('.social-link')[4].textContent = t.youtube;
        
        document.querySelector('.footer-bottom p').innerHTML = `&copy; 2024 Cine.run. ${t.rights}`;
    }
    
    function updateLanguageButton() {
        languageToggle.textContent = currentLanguage === 'en' ? '🇫🇷' : '🇬🇧';
    }
    
    // Search Functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '') return;
        
        const movieCards = document.querySelectorAll('.movie-card');
        let hasResults = false;
        
        movieCards.forEach(card => {
            const title = card.querySelector('.movie-title').textContent.toLowerCase();
            const info = card.querySelector('.movie-info').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || info.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (!hasResults) {
            showNoResultsMessage();
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Clear search when input is empty
    searchInput.addEventListener('input', function() {
        if (this.value === '') {
            document.querySelectorAll('.movie-card').forEach(card => {
                card.style.display = 'block';
            });
        }
    });
    
    function showNoResultsMessage() {
        const existingMessage = document.querySelector('.no-results');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: rgba(255,255,255,0.7);">
                <h3>No movies found</h3>
                <p>Try searching with different keywords</p>
            </div>
        `;
        
        const moviesSection = document.querySelector('.movies-section');
        moviesSection.appendChild(noResults);
        
        setTimeout(() => {
            noResults.remove();
        }, 3000);
    }
    
    // Download and Notification Buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('download-btn')) {
            e.preventDefault();
            const movieUrl = e.target.dataset.url;
            if (movieUrl) {
                window.open(movieUrl, '_blank');
            } else {
                const movieTitle = e.target.closest('.movie-card').querySelector('.movie-title').textContent;
                showDownloadMessage(movieTitle);
            }
        }
        
        if (e.target.classList.contains('notify-btn')) {
            e.preventDefault();
            const movieUrl = e.target.dataset.url;
            if (movieUrl) {
                window.open(movieUrl, '_blank');
            } else {
                const movieTitle = e.target.closest('.movie-card').querySelector('.movie-title').textContent;
                showNotificationMessage(movieTitle);
            }
        }
    });
    
    function showDownloadMessage(movieTitle) {
        const message = document.createElement('div');
        message.className = 'toast-message';
        message.innerHTML = `
            <div style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); padding: 1rem; border-radius: 10px; margin: 1rem; box-shadow: 0 10px 20px rgba(0,0,0,0.3);">
                <strong>Download Started!</strong><br>
                ${movieTitle} is being downloaded...
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateY(-20px)';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
    
    function showNotificationMessage(movieTitle) {
        const message = document.createElement('div');
        message.className = 'toast-message';
        message.innerHTML = `
            <div style="background: linear-gradient(45deg, #4ecdc4, #45b7d1); padding: 1rem; border-radius: 10px; margin: 1rem; box-shadow: 0 10px 20px rgba(0,0,0,0.3);">
                <strong>Notification Set!</strong><br>
                You'll be notified when ${movieTitle} is available.
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateY(-20px)';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .toast-message {
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .no-results {
            animation: fadeIn 0.5s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Add loading animation to movie cards
    function addLoadingAnimation() {
        const movieCards = document.querySelectorAll('.movie-card');
        movieCards.forEach((card, index) => {
            card.style.animation = `fadeIn 0.6s ease ${index * 0.1}s both`;
        });
    }
    
    // Initialize animations
    addLoadingAnimation();
    
    // Update language button on load
    updateLanguageButton();
    
    console.log('🎬 Cine.run website loaded successfully!');
});