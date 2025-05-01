
// Casino Royale Renaissance - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load images.json data
    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            imagesData = data;
            initializeSite(data);
        })
        .catch(error => console.error('Error loading images data:', error));

    // ========= SITE NAME GENERATOR =========
    function generateSiteName() {
        const adjectives = ["Royal", "Imperial", "Majestic", "Opulent", "Luxe", "Golden", "Diamond", "Elite"];
        const nouns = ["Fortune", "Paradise", "Oasis", "Empire", "Mirage", "Crown", "Jackpot"];
        
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        
        const siteName = `${adjective} ${noun}`;
        
        // Update site name references
        document.getElementById('dynamic-name').textContent = siteName;
        document.getElementById('brand-name').textContent = siteName;
        document.getElementById('footer-brand-name').textContent = siteName;
        
        // Update title and Open Graph tags
        document.getElementById('site-title').textContent = `${siteName} | Luxury Casino Resorts Worldwide`;
        document.getElementById('og-title').content = `${siteName} | Luxury Casino Resorts Worldwide`;
        document.getElementById('twitter-title').content = `${siteName} | Luxury Casino Resorts Worldwide`;
        
        return siteName;
    }

    // ========= INITIALIZE SITE =========
    let imagesData = {};
    function initializeSite(images) {
        const siteName = generateSiteName();
        
        // Set spotlight section images
        if (images.spotlight) {
            document.querySelector('.casino-cuisine-img').src = images.spotlight.cuisine || '';
            document.querySelector('.high-stakes-img').src = images.spotlight.highStakes || '';
            document.querySelector('.nightlife-img').src = images.spotlight.nightlife || '';
            document.querySelector('.rooftop-img').src = images.spotlight.rooftop || '';
            document.querySelector('.vip-signup-img').src = images.spotlight.vipSignup || '';
        }
        
        // Initialize major components
        initializeHeader();
        initializeCasinos(images.casinos || []);
        initializeGallery(images.gallery || []);
        initializeEvents(images.events || []);
        initializeTestimonials(images.testimonials || []);
        initializeFeatures();
        initializeFAQ();
        initializeVIPForm();
        initializeNewsletterForm();
        initializeModals();
        
        // Update JSON-LD
        updateJsonLd(siteName, images.casinos || []);
        
        // Start countdown timer
        startCountdown();
    }

    // ========= UPDATE JSON-LD =========
    function updateJsonLd(siteName, casinos) {
        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `${siteName} | Luxury Casino Resorts Worldwide`,
            "description": "Experience world-class gaming, luxury accommodations, and exclusive events at our award-winning casino resorts worldwide.",
            "mainEntity": {
                "@type": "ItemList",
                "itemListElement": []
            }
        };
        
        // Add casinos to JSON-LD
        casinos.forEach((casino, index) => {
            jsonLd.mainEntity.itemListElement.push({
                "@type": "LodgingBusiness",
                "position": index + 1,
                "name": casino.name,
                "image": casino.image,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": casino.location.city,
                    "addressCountry": casino.location.country
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": casino.rating,
                    "bestRating": "5",
                    "ratingCount": Math.floor(Math.random() * 1000) + 500
                }
            });
        });
        
        document.getElementById('jsonld-script').textContent = JSON.stringify(jsonLd);
    }

    // ========= HEADER & NAVIGATION =========
    function initializeHeader() {
        const header = document.getElementById('header');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const backToTopBtn = document.getElementById('back-to-top');
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
            
            // Toggle icon
            const icon = mobileMenuButton.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Handle navigation link clicks (smooth scroll)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('show');
                    const icon = mobileMenuButton.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Scroll to section
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Back to top button
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========= COUNTDOWN TIMER =========
    function startCountdown() {
        // Set the date for the next VIP event (6 months from now)
        const today = new Date();
        const eventDate = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
        
        function updateCountdown() {
            const currentTime = new Date();
            const diff = eventDate - currentTime;
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('days').innerText = days.toString().padStart(2, '0');
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        }
        
        // Initial call and set interval
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ========= TOP CASINOS SECTION =========
    function initializeCasinos(casinos) {
        const casinoContainer = document.getElementById('casino-container');
        
        // Display only first 6 casinos initially
        const initialCasinos = casinos.slice(0, 6);
        renderCasinos(initialCasinos, casinoContainer);
        
        // Load more button functionality
        const loadMoreBtn = document.getElementById('load-more');
        loadMoreBtn.addEventListener('click', () => {
            const spinner = document.getElementById('load-spinner');
            spinner.classList.remove('hidden');
            
            // Simulate loading delay
            setTimeout(() => {
                spinner.classList.add('hidden');
                
                // Display all casinos
                renderCasinos(casinos, casinoContainer);
                
                // Hide load more button after showing all casinos
                loadMoreBtn.style.display = 'none';
                
                // Initialize AOS for newly added elements
                AOS.refresh();
            }, 1500);
        });
    }
    
    function renderCasinos(casinos, container) {
        container.innerHTML = '';
        
        casinos.forEach((casino, index) => {
            const card = document.createElement('div');
            card.className = 'casino-card bg-white rounded-xl overflow-hidden shadow-xl';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index % 6) * 100);
            
            const stars = '★'.repeat(casino.rating) + '☆'.repeat(5 - casino.rating);
            
            card.innerHTML = `
                <div class="relative h-56 overflow-hidden">
                    <img src="${casino.image}" alt="${casino.name}" class="w-full h-full object-cover">
                    <div class="absolute top-0 left-0 mt-4 ml-4 bg-black bg-opacity-70 px-3 py-1 rounded-full flex items-center">
                        <img src="${casino.flagIcon}" alt="${casino.location.country}" class="flag-icon">
                        <span class="text-white text-sm">${casino.location.country}</span>
                    </div>
                </div>
                <div class="p-6 text-casino-black">
                    <h3 class="text-xl font-bold mb-2">${casino.name}</h3>
                    <div class="star-rating mb-3">${stars}</div>
                    <p class="text-gray-700 mb-4 line-clamp-2">${casino.description}</p>
                    <button class="learn-more-btn px-4 py-2 bg-gold hover:bg-darkGold text-white font-medium rounded-full transition-all transform hover:scale-105 w-full" 
                            data-casino-id="${index}">
                        Learn More
                    </button>
                </div>
            `;
            
            container.appendChild(card);
            
            // Add event listener to the button
            card.querySelector('.learn-more-btn').addEventListener('click', function() {
                const casinoId = this.getAttribute('data-casino-id');
                showCasinoModal(casinos[casinoId]);
            });
        });
    }
    
    // ========= CASINO MODAL =========
    function showCasinoModal(casino) {
        const modal = document.getElementById('casino-modal');
        const modalContent = document.getElementById('casino-modal-content');
        
        modalContent.innerHTML = `
            <div class="modal-content">
                <div class="rounded-lg overflow-hidden mb-6">
                    <img src="${casino.image}" alt="${casino.name}" class="w-full h-64 object-cover">
                </div>
                
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-3xl font-serif font-bold">${casino.name}</h3>
                    <div class="flex items-center">
                        <img src="${casino.flagIcon}" alt="${casino.location.country}" class="flag-icon">
                        <span class="text-gray-600">${casino.location.city}, ${casino.location.country}</span>
                    </div>
                </div>
                
                <div class="star-rating text-xl mb-6">${'★'.repeat(casino.rating) + '☆'.repeat(5 - casino.rating)}</div>
                
                <p class="text-gray-700 mb-6">${casino.fullDescription || casino.description}</p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <h4 class="font-bold mb-2">Games</h4>
                        <p>${casino.features?.games || 'Various table games and slots'}</p>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <h4 class="font-bold mb-2">Restaurants</h4>
                        <p>${casino.features?.restaurants || 'Multiple dining options'}</p>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <h4 class="font-bold mb-2">Entertainment</h4>
                        <p>${casino.features?.entertainment || 'Shows and performances'}</p>
                    </div>
                </div>
                
                <div class="text-center">
                    <button class="px-6 py-3 bg-gold hover:bg-darkGold text-white font-bold rounded-full transition-all transform hover:scale-105">
                        Book a Stay
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
        
        // Close modal when clicking outside or on close button
        document.getElementById('casino-modal-backdrop').addEventListener('click', () => {
            modal.classList.add('hidden');
        });
        
        document.getElementById('close-casino-modal').addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    // ========= GALLERY SECTION =========
    function initializeGallery(galleryImages) {
        const galleryContainer = document.getElementById('gallery-swiper');
        
        // Populate gallery
        if (galleryContainer && galleryImages && galleryImages.length > 0) {
            galleryImages.forEach(image => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `<img src="${image.url}" alt="${image.caption || 'Casino Gallery'}" loading="lazy">`;
                galleryContainer.appendChild(slide);
                
                // Add click event for lightbox
                slide.addEventListener('click', () => {
                    openLightbox(image.url);
                });
            });
            
            // Initialize Swiper
            new Swiper('.gallery-swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                lazy: true,
                pagination: {
                    el: '.gallery-swiper .swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.gallery-swiper .swiper-button-next',
                    prevEl: '.gallery-swiper .swiper-button-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                },
            });
        }
    }
    
    // Gallery Lightbox
    function openLightbox(imageUrl) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        
        lightboxImage.src = imageUrl;
        lightbox.classList.remove('hidden');
        
        document.getElementById('lightbox-backdrop').addEventListener('click', () => {
            lightbox.classList.add('hidden');
        });
        
        document.getElementById('close-lightbox').addEventListener('click', () => {
            lightbox.classList.add('hidden');
        });
    }

    // ========= EVENTS SECTION =========
    function initializeEvents(events) {
        const eventsContainer = document.getElementById('events-container');
        
        if (eventsContainer && events && events.length > 0) {
            events.forEach(event => {
                const eventDate = new Date(event.date);
                
                // Create event card
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `
                    <div class="event-card bg-gray-800 rounded-xl overflow-hidden shadow-xl">
                        <div class="relative h-48 overflow-hidden">
                            <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover">
                        </div>
                        
                        <div class="p-6">
                            <div class="text-gold font-medium mb-2">
                                ${eventDate.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            
                            <h3 class="text-xl font-bold mb-3">${event.title}</h3>
                            <p class="text-gray-400 mb-4 line-clamp-2">${event.description}</p>
                            
                            <div class="flex justify-between items-center">
                                <div class="event-countdown text-sm">
                                    <span class="days">00</span>d
                                    <span class="hours">00</span>h
                                    <span class="minutes">00</span>m
                                </div>
                                
                                <button class="rsvp-btn px-4 py-2 bg-gold hover:bg-darkGold text-casino-black font-medium rounded-full transition-all transform hover:scale-105"
                                        data-event-id="${events.indexOf(event)}">
                                    RSVP
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                
                eventsContainer.appendChild(slide);
                
                // Add event listener to the button
                slide.querySelector('.rsvp-btn').addEventListener('click', function() {
                    const eventId = this.getAttribute('data-event-id');
                    showEventModal(events[eventId]);
                });
                
                // Initialize countdown for this event
                initEventCountdown(slide.querySelector('.event-countdown'), eventDate);
            });
            
            // Initialize Swiper
            new Swiper('.events-swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                pagination: {
                    el: '.events-swiper .swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.events-swiper .swiper-button-next',
                    prevEl: '.events-swiper .swiper-button-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                },
            });
        }
    }
    
    function initEventCountdown(countdownElement, eventDate) {
        function updateEventCountdown() {
            const currentTime = new Date();
            const diff = eventDate - currentTime;
            
            if (diff < 0) {
                countdownElement.innerHTML = '<span class="text-gold">Event Started</span>';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            
            countdownElement.querySelector('.days').textContent = days.toString().padStart(2, '0');
            countdownElement.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
            countdownElement.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
        }
        
        updateEventCountdown();
        setInterval(updateEventCountdown, 60000); // Update every minute
    }
    
    // Event RSVP Modal
    function showEventModal(event) {
        const modal = document.getElementById('event-modal');
        const modalContent = document.getElementById('event-modal-content');
        const eventDate = new Date(event.date);
        
        modalContent.innerHTML = `
            <div class="modal-content">
                <div class="rounded-lg overflow-hidden mb-6">
                    <img src="${event.image}" alt="${event.title}" class="w-full h-48 object-cover">
                </div>
                
                <h3 class="text-2xl font-serif font-bold mb-2">${event.title}</h3>
                
                <div class="text-gold font-medium mb-4">
                    ${eventDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                    ${event.time || '8:00 PM'}
                </div>
                
                <p class="text-gray-700 mb-6">${event.fullDescription || event.description}</p>
                
                <form id="rsvp-form" class="space-y-4">
                    <div>
                        <label class="block text-gray-700 mb-2" for="rsvp-name">Full Name</label>
                        <input type="text" id="rsvp-name" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold" required>
                    </div>
                    
                    <div>
                        <label class="block text-gray-700 mb-2" for="rsvp-email">Email Address</label>
                        <input type="email" id="rsvp-email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold" required>
                    </div>
                    
                    <div>
                        <label class="block text-gray-700 mb-2" for="rsvp-guests">Number of Guests</label>
                        <select id="rsvp-guests" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold" required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    
                    <div class="text-center mt-6">
                        <button type="submit" class="px-6 py-3 bg-gold hover:bg-darkGold text-white font-bold rounded-full transition-all transform hover:scale-105">
                            Confirm RSVP
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        modal.classList.remove('hidden');
        
        // Add submit handler for RSVP form
        document.getElementById('rsvp-form').addEventListener('submit', function(e) {
            e.preventDefault();
            modal.classList.add('hidden');
            
            // Show success toast
            showToast(`Thank you for your RSVP to ${event.title}. We'll be in touch soon!`);
        });
        
        // Close modal when clicking outside or on close button
        document.getElementById('event-modal-backdrop').addEventListener('click', () => {
            modal.classList.add('hidden');
        });
        
        document.getElementById('close-event-modal').addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    // ========= TESTIMONIALS SECTION =========
    function initializeTestimonials(testimonials) {
        const testimonialsContainer = document.getElementById('testimonials-container');
        
        if (testimonialsContainer && testimonials && testimonials.length > 0) {
            testimonials.forEach(testimonial => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                
                const stars = '★'.repeat(testimonial.rating || 5) + '☆'.repeat(5 - (testimonial.rating || 5));
                
                slide.innerHTML = `
                    <div class="testimonial-card bg-gray-800 rounded-xl p-6 md:p-8 shadow-xl">
                        <div class="star-rating mb-4">${stars}</div>
                        
                        <p class="text-gray-300 italic mb-6">"${testimonial.text}"</p>
                        
                        <div class="flex items-center">
                            <img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-12 h-12 rounded-full mr-4 object-cover">
                            <div>
                                <h4 class="font-bold">${testimonial.name}</h4>
                                <p class="text-gray-400 text-sm">${testimonial.location}</p>
                            </div>
                        </div>
                    </div>
                `;
                
                testimonialsContainer.appendChild(slide);
            });
            
            // Initialize Swiper
            new Swiper('.testimonials-swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 5000,
                },
                pagination: {
                    el: '.testimonials-swiper .swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                },
            });
        }
    }

    // ========= FEATURES SECTION =========
    function initializeFeatures() {
        // This section is already created in HTML
        // We can add additional behavior here if needed
    }

    // ========= FAQ SECTION =========
    function initializeFAQ() {
        const accordionButtons = document.querySelectorAll('.accordion-btn');
        
        accordionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const content = document.getElementById(this.getAttribute('aria-controls'));
                const icon = this.querySelector('.accordion-icon');
                
                // Toggle aria-expanded
                const expanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !expanded);
                
                // Toggle content visibility
                content.classList.toggle('hidden');
                
                // Toggle icon
                icon.classList.toggle('rotate');
                
                // Close other open accordions
                if (!expanded) {
                    accordionButtons.forEach(otherButton => {
                        if (otherButton !== this && otherButton.getAttribute('aria-expanded') === 'true') {
                            otherButton.setAttribute('aria-expanded', 'false');
                            const otherContent = document.getElementById(otherButton.getAttribute('aria-controls'));
                            otherContent.classList.add('hidden');
                            otherButton.querySelector('.accordion-icon').classList.remove('rotate');
                        }
                    });
                }
            });
        });
    }

    // ========= VIP SIGNUP FORM =========
    function initializeVIPForm() {
        const form = document.getElementById('vip-form');
        const formSpinner = document.getElementById('form-spinner');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const countryInput = document.getElementById('country');
            const casinoInputs = document.querySelectorAll('input[name="favorite-casino"]');
            
            let isValid = true;
            
            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(msg => msg.classList.add('hidden'));
            
            // Validate name
            if (!nameInput.value.trim()) {
                document.getElementById('name-error').textContent = 'Name is required';
                document.getElementById('name-error').classList.remove('hidden');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                document.getElementById('email-error').textContent = 'Valid email is required';
                document.getElementById('email-error').classList.remove('hidden');
                isValid = false;
            }
            
            // Validate country
            if (!countryInput.value) {
                document.getElementById('country-error').textContent = 'Please select a country';
                document.getElementById('country-error').classList.remove('hidden');
                isValid = false;
            }
            
            // Validate casino selection
            let casinoSelected = false;
            casinoInputs.forEach(input => {
                if (input.checked) casinoSelected = true;
            });
            
            if (!casinoSelected) {
                document.getElementById('casino-error').textContent = 'Please select a favorite casino';
                document.getElementById('casino-error').classList.remove('hidden');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Show spinner while processing
            formSpinner.classList.remove('hidden');
            
            // Simulate form submission
            setTimeout(() => {
                formSpinner.classList.add('hidden');
                
                // Show success modal and create confetti effect
                showSuccessModal('Thank you for joining our VIP program! You will receive an email with exclusive offers and membership details.');
                createConfetti();
            }, 1500);
        });
    }
    
    // ========= NEWSLETTER FORM =========
    function initializeNewsletterForm() {
        const form = document.getElementById('newsletter-form');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletter-email');
            const emailError = document.getElementById('newsletter-error');
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.classList.remove('hidden');
                return;
            }
            
            emailError.classList.add('hidden');
            
            // Show success toast
            showToast('Thank you for subscribing to our newsletter!');
            
            // Reset the form
            form.reset();
        });
    }
    
    // ========= MODALS =========
    function initializeModals() {
        // Success modal close button
        document.getElementById('close-success-modal').addEventListener('click', () => {
            document.getElementById('success-modal').classList.add('hidden');
        });
    }
    
    function showSuccessModal(message) {
        document.getElementById('success-message').textContent = message;
        document.getElementById('success-modal').classList.remove('hidden');
    }
    
    // ========= TOAST NOTIFICATION =========
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        toastMessage.textContent = message;
        
        toast.classList.remove('hidden');
        toast.classList.add('toast-show');
        
        setTimeout(() => {
            toast.classList.remove('toast-show');
            toast.classList.add('hidden');
        }, 5000);
    }
    
    // ========= CONFETTI EFFECT =========
    function createConfetti() {
        const colors = ['#D4AF37', '#FFFFFF', '#1A1F2C', '#BB9430'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.opacity = Math.random() + 0.5;
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
});
