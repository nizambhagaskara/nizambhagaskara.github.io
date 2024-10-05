// Caching the fetched descriptions data
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
    "title": "BlackBerry (2003)",
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

// Dark Mode check (same as before)
const getStoredTheme = () => localStorage.getItem('theme');
const setStoredTheme = theme => localStorage.setItem('theme', theme);

const getPreferredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setTheme = theme => {
  if (theme === 'auto') {
    document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme);
    setStoredTheme(theme);
  }
};

setTheme(getPreferredTheme());

const darkModeToggle = document.querySelector("#dark-toggle");

if (getPreferredTheme() == "dark") {
  darkModeToggle.checked = true;
}

darkModeToggle.addEventListener("change", function () {
  if (this.checked) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
});

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

updateSliderDescriptionAndScale(swiper.activeIndex);

swiper.on("slideChange", function () {
  updateSliderDescriptionAndScale(swiper.activeIndex);
});

const navbar = document.querySelector("nav");
const fixedNav = navbar.offsetTop;

if (window.scrollY > fixedNav) {
  navbar.classList.add('navbar-fixed');
} else {
  navbar.classList.remove('navbar-fixed');
}

window.onscroll = function () {
  if (window.scrollY > fixedNav) {
    navbar.classList.add('navbar-fixed');
  } else {
    navbar.classList.remove('navbar-fixed');
  }
};



document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section'); // Select all sections
  const navLinks = document.querySelectorAll('.nav-link'); // Select all nav links

  const observerOptions = {
    root: null, // Use the viewport as the root
    threshold: 0.5, // 50% of the section needs to be in view
  };

  // Function to update active link
  function setActiveLink(id) {
    navLinks.forEach(link => link.classList.remove('active')); // Remove active from all links
    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`); // Target only .nav-link
    if (activeLink) activeLink.classList.add('active'); // Add active to the current section link
  }

  // Intersection Observer callback
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.isIntersecting && id !== 'home') { // Avoid updating when it's #home
        window.history.replaceState(null, null, `#${id}`);
        setActiveLink(id); // Set the active link based on the section in view
      }
    });
  }, observerOptions);

  // Observe each section except #home
  sections.forEach(section => {
    if (section.getAttribute('id') !== 'home') {
      observer.observe(section);
    }
  });

  // Special handling for home section (when page is at the top)
  function handleHomeLink() {
    if (window.scrollY === 0) {
      window.history.replaceState(null, null, '#home');
      setActiveLink('home'); // Set home link as active when at top
    }
  }

  // Initial check when the page loads
  handleHomeLink();

  // Handle scrolling back to top
  window.addEventListener('scroll', function () {
    handleHomeLink();
  });
});


const mediaQuery = window.matchMedia("(max-width: 767px)");

function handleMediaChange(e) {
  const element = document.querySelector('.navbar-brand');
  if (e.matches) {
    element.classList.add("me-auto");
  } else {
    element.classList.remove("me-auto");
  }
}

handleMediaChange(mediaQuery);
mediaQuery.addEventListener('change', handleMediaChange);

// Show hidden elements on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      entry.target.classList.remove("hidden");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((element) => observer.observe(element));