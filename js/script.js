// === Sticky Navbar (Navbar Fixed on Scroll) ===

const navbar = document.querySelector("nav");
const fixedNav = navbar.offsetTop;

if (window.scrollY > fixedNav) {
  navbar.classList.add('navbar-fixed');
} else {
  navbar.classList.remove('navbar-fixed');
}

window.addEventListener("scroll", function () {
  if (window.scrollY > fixedNav) {
    navbar.classList.add('navbar-fixed');
  } else {
    navbar.classList.remove('navbar-fixed');
  }
});

// === Navbar Toggling for Small Screens ===

// Toggle the navbar branding position based on the screen width
const mediaQuery = window.matchMedia("(max-width: 991px)");

const handleMediaChange = (e) => {
  const brandElement = document.querySelector('.navbar-brand');
  brandElement.classList.toggle("me-auto", e.matches);
};

mediaQuery.addEventListener('change', handleMediaChange);
handleMediaChange(mediaQuery);

// === Navbar and Section Link Activation (Relates to "home" section) ===

// Set active class for the currently visible section in the navbar
function setActiveLink(id) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.classList.remove('active'));

  const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
  if (activeLink) activeLink.classList.add('active');
}

// Handle updating the active navbar link based on scroll position
const sections = document.querySelectorAll('section');
const observerOptions = { threshold: 0.5 }; // Trigger when 50% of the section is in view

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    
    if (entry.isIntersecting) {
      // Handle special case for 'home'
      if (id === 'home') {
        window.history.replaceState(null, null, '#home');
      } else {
        window.history.replaceState(null, null, `#${id}`);
      }
      setActiveLink(id); // Update active class based on visible section
    }
  });
}, observerOptions);

// Observe all sections including 'home'
sections.forEach(section => {
  observer.observe(section);
});

// Special handling for the home section link (when page is scrolled to the top)
function handleHomeLink() {
  if (window.scrollY === 0) {
    window.history.replaceState(null, null, '#home');
    setActiveLink('home'); // Mark the home link as active
  }
}

// Initial check when the page loads
handleHomeLink();

// Add event listener to update the active link on scroll
window.addEventListener('scroll', handleHomeLink);

// Close offcanvas on link click
const navLinks = document.querySelectorAll('.nav-link');
const offcanvasElement = document.getElementById('offcanvasNavbar');
const offcanvas = new bootstrap.Offcanvas(offcanvasElement);

navLinks.forEach(link => link.addEventListener("click", () => offcanvas.hide()));

// === Dark Mode Logic ===

// Retrieve the stored theme preference from localStorage
const getStoredTheme = () => localStorage.getItem('theme');

// Save the user's theme preference to localStorage
const setStoredTheme = (theme) => localStorage.setItem('theme', theme);

// Get the preferred theme, either from storage or system setting
const getPreferredTheme = () => getStoredTheme() || 
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the selected theme (auto/dark/light) to the document
const setTheme = (theme) => {
  const activeTheme = theme === 'auto' 
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;

  document.documentElement.setAttribute('data-bs-theme', activeTheme);
  setStoredTheme(theme);
};

// Initialize the theme on page load
setTheme(getPreferredTheme());

// Handle theme toggling via the checkbox
const darkModeToggle = document.querySelector("#dark-toggle");
darkModeToggle.checked = getPreferredTheme() === 'dark';

darkModeToggle.addEventListener("change", function () {
  setTheme(this.checked ? "dark" : "light");
});

// === Swiper Slider Functionality (Relates to "inventions" section) ===

const descriptions = [
  {
    "title": "Windows 95 (1995)",
    "desc": "Microsoft meluncurkan Windows 95 dengan antarmuka pengguna grafis (GUI) yang memudahkan pengguna untuk mengoperasikan komputer. Fitur baru seperti Start Menu dan taskbar menjadi standar dalam sistem operasi modern."
  },
  {
    "title": "Internet Explorer (1995)",
    "desc": "Browser web yang dikembangkan oleh Microsoft ini membantu memperkenalkan internet kepada pengguna umum dan memainkan peran penting dalam popularisasi web."
  },
  {
    "title": "iPod (2001)",
    "desc": "Apple meluncurkan iPod, perangkat pemutar musik digital yang merevolusi cara orang mendengarkan musik. Ini membuka jalan bagi industri musik digital."
  },
  {
    "title": "BlackBerry Curve 8520 (2003)",
    "desc": "Ponsel pintar pertama yang dirancang untuk penggunaan bisnis dengan kemampuan email dan pengaturan kalender. BlackBerry menjadi simbol produktivitas pada masa itu."
  },
  {
    "title": "YouTube (2005)",
    "desc": "Platform berbagi video yang memungkinkan pengguna mengunggah, menonton, dan berbagi video, mengubah cara konsumsi media dan memberi platform bagi konten kreator."
  },
  {
    "title": "iPhone (2007)",
    "desc": "Apple meluncurkan iPhone, menggabungkan ponsel, pemutar musik, dan internet dalam satu perangkat. Ini mendefinisikan kembali smartphone dan menciptakan pasar baru untuk aplikasi mobile."
  },
  {
    "title": "Android (2008)",
    "desc": "Sistem operasi open-source yang dikembangkan oleh Google, Android menjadi platform utama untuk smartphone di seluruh dunia dan mendemokratisasi akses ke teknologi mobile."
  },
  {
    "title": "Virtual Reality (VR) dan Augmented Reality (AR) (2010-an)",
    "desc": "Perkembangan teknologi VR dan AR, seperti Oculus Rift dan Microsoft HoloLens, mengubah cara kita berinteraksi dengan dunia digital dan fisik."
  },
  {
    "title": "Blockchain dan Cryptocurrency (2009-sekarang)",
    "desc": "Penemuan teknologi blockchain, dengan Bitcoin sebagai contoh pertama, memperkenalkan konsep desentralisasi dan keamanan dalam transaksi digital."
  },
  {
    "title": "Kecerdasan Buatan (1956-sekarang)",
    "desc": "Kecerdasan Buatan merujuk pada kemampuan mesin untuk meniru atau meniru kecerdasan manusia. Ini mencakup berbagai teknik dan metode yang memungkinkan komputer untuk memahami, belajar, dan mengambil keputusan berdasarkan data yang diberikan."
  }
];

// Update the slider to display the correct descriptions and scale the active slide
const updateSliderDescriptionAndScale = (activeIndex) => {
  const imageTitle = document.querySelector("#image-title");
  const imageDesc = document.querySelector("#image-desc");
  const allSlides = document.querySelectorAll(".swiper-slide.myCard");

  // Reset scaling on all slides
  allSlides.forEach((slide, index) => {
    slide.classList.remove("active-card");
    
    // Scale down all slides to 1
    slide.style.transform = "scale(1)";
    slide.style.border = "0";
    
    // Apply scaling only to the active slide
    if (index === activeIndex) {
      slide.classList.add("active-card");
      slide.style.transform = "scale(1.3)";
      if (getPreferredTheme() == "dark") {
        slide.style.border = "4px solid white";
      } else {
        slide.style.border = "4px solid black";
      }
    }
  });

  if (swiper) {
    swiper.params.spaceBetween = 65; // More space when a card is active
    swiper.update(); // Trigger swiper to apply changes
  }

  // Update descriptions
  if (descriptions && descriptions[activeIndex]) {
    imageTitle.textContent = descriptions[activeIndex].title;
    imageDesc.textContent = descriptions[activeIndex].desc;
  }
};

// Initialize the Swiper slider
const swiper = new Swiper(".swiper", {
  touchRatio: 2,
  touchAngle: 45,
  cssMode: false,
  spaceBetween: 30,
  centeredSlides: true,
  slidesPerView: "auto",
});

let isSwiping = false; // Flag to prevent multiple slide changes

swiper.wrapperEl.addEventListener("wheel", (e) => {
  // Prevent default scroll behavior
  e.preventDefault();

  // Adjust the sensitivity threshold
  const sensitivityThreshold = 30; // Change this value to adjust sensitivity

  // Check if the horizontal scroll delta is significant
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > sensitivityThreshold && !isSwiping) {
    isSwiping = true; // Set the flag to indicate a swipe is in progress

    // Inverted horizontal scroll direction
    if (e.deltaX > 0) {
      swiper.slideNext(); // Scroll right (next slide)
    } else {
      swiper.slidePrev(); // Scroll left (previous slide)
    }

    // Wait for the transition to finish before allowing another swipe
    swiper.once('transitionEnd', () => {
      isSwiping = false; // Reset the flag after the transition ends
    });
  }
});

updateSliderDescriptionAndScale(swiper.activeIndex);

swiper.on("slideChange", function () {
  updateSliderDescriptionAndScale(swiper.activeIndex);
});

// === Scroll Reveal Animations (Relates to "latest-tech" and "trend" sections) ===

// Show hidden elements as they scroll into view
const hiddenElements = document.querySelectorAll(".hidden");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      entry.target.classList.remove("hidden");
    }
  });
});

// Apply the reveal effect to all hidden elements
hiddenElements.forEach(element => revealObserver.observe(element));

// === Redirect Images to External Sites ===

document.querySelector(".ai-image").addEventListener("click", () => {
  window.location.href = "https://chatgpt.com";
});

document.querySelector(".foldable-image").addEventListener("click", () => {
  window.location.href = "https://www.samsung.com/id/smartphones/galaxy-z-fold6/";
});