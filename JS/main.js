document.getElementById('year').textContent = new Date().getFullYear();










document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const charRemaining = document.getElementById('char-remaining');
  const successMessage = document.getElementById('form-success');

  // Character counter for message
  messageInput.addEventListener('input', function() {
    const remaining = 500 - this.value.length;
    charRemaining.textContent = remaining;
    
    if (remaining < 50) {
      charRemaining.style.color = 'var(--secondary-color)';
    } else {
      charRemaining.style.color = '#666';
    }
  });

  // Form validation
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
    });

    // Validate name
    if (nameInput.value.trim() === '') {
      document.getElementById('name-error').textContent = 'Name is required';
      isValid = false;
    }

    // Validate email
    if (emailInput.value.trim() === '') {
      document.getElementById('email-error').textContent = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      document.getElementById('email-error').textContent = 'Please enter a valid email';
      isValid = false;
    }

    // Validate subject
    if (subjectInput.value === '') {
      document.getElementById('subject-error').textContent = 'Subject is required';
      isValid = false;
    }

    // Validate message
    if (messageInput.value.trim() === '') {
      document.getElementById('message-error').textContent = 'Message is required';
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      document.getElementById('message-error').textContent = 'Message should be at least 10 characters';
      isValid = false;
    }

    // If form is valid, submit it
    if (isValid) {
      // Here you would typically send the form data to the server
      // For demonstration, we'll just show a success message
      contactForm.reset();
      successMessage.style.display = 'block';
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
    }
  });

  // Helper function to validate email
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

});

