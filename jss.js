
        document.addEventListener('DOMContentLoaded', function() {
            
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const navLinkItems = document.querySelectorAll('.nav-link');

            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('open');
                navLinks.classList.toggle('active');
            });

            navLinkItems.forEach(item => {
                item.addEventListener('click', () => {
                    hamburger.classList.remove('open');
                    navLinks.classList.remove('active');
                });
            });

            
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
            });

            
            const sections = document.querySelectorAll('section');
            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (pageYOffset >= sectionTop - 300) {
                        current = section.getAttribute('id');
                    }
                });

                navLinkItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${current}`) {
                        item.classList.add('active');
                    }
                });
            });

        
            const backToTopBtn = document.querySelector('.back-to-top');
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('active');
                } else {
                    backToTopBtn.classList.remove('active');
                }
            });

        
            const testimonialDots = document.querySelectorAll('.testimonial-dot');
            const testimonials = document.querySelectorAll('.testimonial');
            let currentTestimonial = 0;
            let testimonialInterval;

            function showTestimonial(index) {
                testimonials.forEach(testimonial => testimonial.classList.remove('active'));
                testimonialDots.forEach(dot => dot.classList.remove('active'));
                
                testimonials[index].classList.add('active');
                testimonialDots[index].classList.add('active');
                currentTestimonial = index;
            }

            function startTestimonialSlider() {
                testimonialInterval = setInterval(() => {
                    let nextIndex = (currentTestimonial + 1) % testimonials.length;
                    showTestimonial(nextIndex);
                }, 5000);
            }

            testimonialDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    clearInterval(testimonialInterval);
                    showTestimonial(index);
                    startTestimonialSlider();
                });
            });

        
            showTestimonial(0);
            startTestimonialSlider();

            
            const contactForm = document.getElementById('myForm');
            if (contactForm) {
                contactForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    
                    const submitButton = this.querySelector('button[type="submit"]');
                    const originalText = submitButton.textContent;
                    
                    try {
                        submitButton.disabled = true;
                        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                        
                        const response = await fetch(this.action, {
                            method: 'POST',
                            body: new FormData(this),
                            headers: {
                                'Accept': 'application/json'
                            }
                        });
                        
                        if (response.ok) {
                            alert('Thank you for your message! I will get back to you soon.');
                            this.reset();
                        } else {
                            const errorData = await response.json();
                            if (errorData.errors) {
                                alert('Error: ' + errorData.errors.map(error => error.message).join(', '));
                            } else {
                                alert('There was a problem submitting your form. Please try again.');
                            }
                        }
                    } catch (error) {
                        alert('There was a network error. Please check your connection and try again.');
                    } finally {
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                    }
                });
            }

        
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            window.generatePDF = function() {
                const element = document.body;
                const opt = {
                    margin: 10,
                    filename: 'Maria_Tasnia_Portfolio.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };

    
                const loader = document.createElement('div');
                loader.style.position = 'fixed';
                loader.style.top = '0';
                loader.style.left = '0';
                loader.style.width = '100%';
                loader.style.height = '100%';
                loader.style.backgroundColor = 'rgba(0,0,0,0.7)';
                loader.style.display = 'flex';
                loader.style.justifyContent = 'center';
                loader.style.alignItems = 'center';
                loader.style.zIndex = '9999';
                
                const spinner = document.createElement('div');
                spinner.innerHTML = '<i class="fas fa-spinner fa-spin fa-3x" style="color:white;"></i><p style="color:white; margin-top:20px;">Generating PDF...</p>';
                loader.appendChild(spinner);
                document.body.appendChild(loader);

            
                html2pdf().from(element).set(opt).save().then(() => {
                    document.body.removeChild(loader);
                });
            };

            
            function animateOnScroll() {
                const elements = document.querySelectorAll('.skills-item, .project-card, .passion-card, .timeline-item');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.2;
                    
                    if (elementPosition < screenPosition) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                });
            }

    
            document.querySelectorAll('.skills-item, .project-card, .passion-card, .timeline-item').forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.6s ease';
            });

            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); 
        });
    