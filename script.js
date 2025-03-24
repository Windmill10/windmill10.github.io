document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });
    
    // Form submission handler - improved version
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create a formatted message body
            const body = `From: ${name}\nEmail: ${email}\n\n${message}`;
            
            try {
                // First attempt: Direct mailto link
                const mailtoLink = `mailto:eason.yuchen.lee@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = mailtoLink;
                
                // Create a backup link in case the automatic opening fails
                const backupLink = document.createElement('a');
                backupLink.href = mailtoLink;
                backupLink.textContent = "Click here if your email client didn't open automatically";
                backupLink.className = "btn backup-email-btn";
                backupLink.style.marginTop = "15px";
                backupLink.target = "_blank";
                
                // Clear the form and show success message with backup link
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle" style="color: var(--success-color); font-size: 3rem; margin-bottom: 1rem;"></i>
                        <h3>Thank you for your message!</h3>
                        <p>I'll get back to you as soon as possible.</p>
                        <p>If your email client didn't open automatically, you can:</p>
                    </div>
                `;
                contactForm.appendChild(backupLink);
                
                // Add a manual email option
                const manualEmailInfo = document.createElement('p');
                manualEmailInfo.innerHTML = `<br>Or manually email me at <strong>eason.yuchen.lee@gmail.com</strong>`;
                manualEmailInfo.style.marginTop = "15px";
                contactForm.appendChild(manualEmailInfo);
                
            } catch (err) {
                console.error('Email error:', err);
                alert('There was an error opening your email client. Please email me directly at eason.yuchen.lee@gmail.com');
            }
        });
    }
    
    // Add active class to current section in navigation
    function highlightNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSectionId = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // Add active class to navigation when scrolling
    window.addEventListener('scroll', highlightNavigation);
    
    // Project card animation on scroll
    const projectCards = document.querySelectorAll('.project-card');
    
    function checkProjectCards() {
        projectCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.classList.add('show');
            }
        });
    }
    
    window.addEventListener('scroll', checkProjectCards);
    
    // Initial calls
    highlightNavigation();
    checkProjectCards();
});
