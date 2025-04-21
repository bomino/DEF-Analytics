// Enhanced JavaScript for Facilities Analysis Website

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a, .footer-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('nav ul');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('show');
    });
  }
  
  // Image modal functionality
  const visualizationImages = document.querySelectorAll('.visualization img');
  const modal = document.querySelector('.modal');
  const modalImg = document.querySelector('.modal-content');
  const closeModal = document.querySelector('.close-modal');
  
  if (visualizationImages.length > 0 && modal) {
    visualizationImages.forEach(img => {
      img.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.src;
      });
    });
    
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
  
  // Animate elements on scroll
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  function checkScroll() {
    animateElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 50) {
        element.classList.add('animated');
      }
    });
  }
  
  // Check elements on initial load
  checkScroll();
  
  // Check elements on scroll
  window.addEventListener('scroll', checkScroll);
  
  // Sticky header
  const header = document.querySelector('header');
  const headerOffset = header.offsetTop;
  
  function stickyHeader() {
    if (window.pageYOffset > headerOffset) {
      header.classList.add('sticky');
      document.body.style.paddingTop = header.offsetHeight + 'px';
    } else {
      header.classList.remove('sticky');
      document.body.style.paddingTop = 0;
    }
  }
  
  window.addEventListener('scroll', stickyHeader);
  
  // Back to top button
  const backToTopButton = document.createElement('div');
  backToTopButton.className = 'back-to-top';
  backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTopButton);
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  function toggleBackToTopButton() {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  }
  
  window.addEventListener('scroll', toggleBackToTopButton);
  
  // Add progress bars for savings opportunities
  const savingsStrategies = [
    { name: 'Vendor Consolidation', percentage: 8 },
    { name: 'Contract Optimization', percentage: 10 },
    { name: 'Service Standardization', percentage: 5 }
  ];
  
  const opportunitiesSection = document.querySelector('#opportunities');
  if (opportunitiesSection) {
    const savingsTable = opportunitiesSection.querySelector('table tbody');
    
    if (savingsTable) {
      const rows = savingsTable.querySelectorAll('tr');
      
      rows.forEach((row, index) => {
        if (index < savingsStrategies.length) {
          const cells = row.querySelectorAll('td');
          if (cells.length >= 2) {
            const percentageCell = cells[1];
            const percentage = savingsStrategies[index].percentage;
            
            const progressContainer = document.createElement('div');
            progressContainer.className = 'progress-container';
            
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.style.width = percentage * 5 + '%'; // Scale to make bars more visible
            progressBar.textContent = percentage + '%';
            
            progressContainer.appendChild(progressBar);
            percentageCell.appendChild(document.createElement('br'));
            percentageCell.appendChild(progressContainer);
          }
        }
      });
    }
  }
  
  // Add tooltips to key terms
  const keyTerms = document.querySelectorAll('.key-term');
  
  keyTerms.forEach(term => {
    term.classList.add('tooltip');
    const tooltipText = document.createElement('span');
    tooltipText.className = 'tooltiptext';
    tooltipText.textContent = term.getAttribute('data-definition');
    term.appendChild(tooltipText);
  });
  
  // Highlight key numbers
  const highlightNumbers = document.querySelectorAll('.highlight-number');
  
  function animateNumbers() {
    highlightNumbers.forEach(number => {
      const elementPosition = number.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 50 && !number.classList.contains('animated')) {
        number.classList.add('animated');
        
        const targetValue = parseFloat(number.getAttribute('data-value'));
        const duration = 1500; // ms
        const startTime = performance.now();
        const startValue = 0;
        
        function updateNumber(currentTime) {
          const elapsedTime = currentTime - startTime;
          
          if (elapsedTime < duration) {
            const progress = elapsedTime / duration;
            const currentValue = startValue + progress * (targetValue - startValue);
            number.textContent = currentValue.toFixed(1) + '%';
            requestAnimationFrame(updateNumber);
          } else {
            number.textContent = targetValue.toFixed(1) + '%';
          }
        }
        
        requestAnimationFrame(updateNumber);
      }
    });
  }
  
  window.addEventListener('scroll', animateNumbers);
  animateNumbers(); // Check on initial load
  
  // Print functionality
  const printButton = document.createElement('button');
  printButton.className = 'btn';
  printButton.innerHTML = '<i class="fas fa-print"></i> Print Report';
  printButton.addEventListener('click', function() {
    window.print();
  });
  
  const conclusionSection = document.querySelector('#recommendations .card:last-child');
  if (conclusionSection) {
    conclusionSection.appendChild(document.createElement('br'));
    conclusionSection.appendChild(printButton);
  }
});
