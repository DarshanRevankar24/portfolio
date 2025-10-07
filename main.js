  var typed = new Typed(".text", {
    strings: [
      "Student at RVCE 🎓",
      "Aspiring AI/ML Engineer 🤖",
      "Passionate Programmer 💻",
      "Exploring NLP & Computer Vision 🔍",
      "Future Innovator 🚀"
    ],
    typeSpeed: 90,
    backSpeed: 40,
    backDelay: 1000,
    loop: true
  });

    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('.submit-btn');
        const originalText = button.innerHTML;
        
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.disabled = true;

        // Create FormData object to get all form values
        const formData = new FormData(this);
        
        // Add FormSubmit parameters
        formData.append('_subject', 'New Message from Portfolio - Darshan J');
        formData.append('_captcha', 'false');
        formData.append('_template', 'table');
        
        // Convert FormData to URL encoded string
        const urlEncodedData = new URLSearchParams(formData).toString();

        // Send to FormSubmit using fetch API with proper format
        fetch('https://formsubmit.co/ajax/darshanjbdvt24@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: urlEncodedData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success === "true") {
                // Show success notification
                showNotification('✅ Message sent successfully! I will get back to you soon.', 'success');
                document.getElementById('contactForm').reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            // Show error notification
            showNotification('❌ Failed to send message. Please try again or email me directly.', 'error');
            console.error('Error:', error);
        })
        .finally(() => {
            // Reset button state
            button.innerHTML = originalText;
            button.disabled = false;
        });
    });

    // Notification function
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        notification.style.background = type === 'success' 
            ? 'linear-gradient(45deg, #4ecdc4, #6c63ff)'
            : 'linear-gradient(45deg, #ff6584, #ffb800)';
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Add input validation feedback
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#6c63ff';
            this.style.boxShadow = '0 0 0 2px rgba(108, 99, 255, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });

    // Social links hover effect
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Contact cards hover effect
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });



// Reset and trigger animations for a section
function triggerSectionAnimations(section) {
    // Get all elements that should have animations
    const animatedElements = section.querySelectorAll(`
        .project-card, .contact-card, .skill-category,
        .section-title, .contact-subtitle, .form-group,
        .social-links, .contact-info, .contact-container
    `);
    
    animatedElements.forEach(element => {
        // First, remove any animation classes
        element.classList.remove(
            'animate__animated', 'animate__fadeIn', 'animate__fadeInUp',
            'animate__fadeInLeft', 'animate__fadeInRight', 'animate__zoomIn',
            'animate__slideInUp', 'animate__slideInLeft'
        );
        
        // Force reflow to reset animation
        void element.offsetWidth;
        
        // Add base animation class
        element.classList.add('animate__animated');
        
        // Add specific animation based on element type
        if (element.classList.contains('project-card')) {
            element.classList.add('animate__fadeInUp');
        } else if (element.classList.contains('contact-card')) {
            element.classList.add('animate__zoomIn');
        } else if (element.classList.contains('section-title')) {
            element.classList.add('animate__fadeInDown');
        } else if (element.classList.contains('form-group')) {
            element.classList.add('animate__fadeInRight');
        } else {
            element.classList.add('animate__fadeIn'); // default
        }
    });
}

// Smooth scrolling with animation trigger
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Wait for scroll to complete, then trigger animations
            setTimeout(() => {
                triggerSectionAnimations(targetSection);
            }, 800); // Increased timeout to ensure scroll completes
        }
    });
});

// Also trigger animations when section comes into view during scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Small delay to make animations more noticeable
            setTimeout(() => {
                triggerSectionAnimations(entry.target);
            }, 100);
        }
    });
}, { 
    threshold: 0.2,
    rootMargin: '-50px 0px -100px 0px'
});

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Active link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});
