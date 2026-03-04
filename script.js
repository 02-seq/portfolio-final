const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

function showSection(sectionId) {
  // Remove active-section class from all sections
  sections.forEach(section => {
    section.classList.remove('active-section');
  });

  // Remove active class from all nav links
  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  // Show the target section
  const targetSection = document.querySelector(sectionId);
  if (targetSection) {
    targetSection.classList.add('active-section');
    // Scroll to top when switching
    window.scrollTo(0, 0);
  }

  // Set the clicked link as active
  const activeLink = document.querySelector(`.nav-links a[href="${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

// Add click listeners to nav links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    showSection(targetId);

    // Update URL hash without jumping
    history.pushState(null, null, targetId);
  });
});

// Handle initial load (default to #home or the current hash)
window.addEventListener('DOMContentLoaded', () => {
  const currentHash = window.location.hash || '#home';
  showSection(currentHash);
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
  const currentHash = window.location.hash || '#home';
  showSection(currentHash);
});

// --- Project Carousel Logic ---
const projectSlides = document.querySelectorAll('.project-slide');
const nextBtn = document.getElementById('next-project');
const prevBtn = document.getElementById('prev-project');
let currentProjectIndex = 0;

function updateCarousel() {
  projectSlides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index === currentProjectIndex) {
      slide.classList.add('active');
    }
  });

  // Update button text logic
  if (currentProjectIndex === projectSlides.length - 1) {
    nextBtn.textContent = 'Back to First Project';
  } else {
    nextBtn.textContent = 'Next Project';
  }

  if (currentProjectIndex === 0) {
    prevBtn.textContent = 'Go to Last Project';
  } else {
    prevBtn.textContent = 'Previous Project';
  }
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentProjectIndex++;
    if (currentProjectIndex >= projectSlides.length) {
      currentProjectIndex = 0;
    }
    updateCarousel();
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentProjectIndex--;
    if (currentProjectIndex < 0) {
      currentProjectIndex = projectSlides.length - 1;
    }
    updateCarousel();
  });
}

// --- About Carousel Logic ---
const aboutCards = document.querySelectorAll('.about-card');
const nextAboutBtn = document.getElementById('next-about');
let currentAboutIndex = 0;

function updateAboutCarousel() {
  aboutCards.forEach((card, index) => {
    card.classList.remove('active');
    if (index === currentAboutIndex) {
      card.classList.add('active');
    }
  });

  // Update button text on last slide
  if (currentAboutIndex === aboutCards.length - 1) {
    nextAboutBtn.textContent = 'Go back to first';
  } else {
    nextAboutBtn.textContent = 'Next';
  }
}

if (nextAboutBtn) {
  nextAboutBtn.addEventListener('click', () => {
    currentAboutIndex++;
    if (currentAboutIndex >= aboutCards.length) {
      currentAboutIndex = 0;
    }
    updateAboutCarousel();
  });
}
