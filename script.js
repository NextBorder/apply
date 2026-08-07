document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Dark / Light Mode Toggle ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const icon = themeToggleBtn.querySelector('i');
  
  // Check persisted preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  }

  // --- 2. Satisfaction Counter Animation ---
  const counter = document.querySelector('.counter');
  let animated = false;

  const startCounter = () => {
    if (!counter) return;
    const target = +counter.getAttribute('data-target');
    const duration = 1500;
    const increment = target / (duration / 16);

    let current = 0;
    const updateCount = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target + '%';
      }
    };
    updateCount();
  };

  // Intersection Observer to trigger counter on scroll
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        startCounter();
        animated = true;
      }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

});