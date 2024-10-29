// === Initialize Alert Box ===
const alertBox = document.querySelector(".alert-box");
let alertBoxValue = document.querySelector(".alert-box-value");

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

const goToTopBtn = document.querySelector(".go-to-top");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    
    if (entry.isIntersecting) {
      // Handle special case for 'home'
      if (id === 'home') {
        window.history.replaceState(null, null, '#home');
        goToTopBtn.classList.remove("show");
      } else {
        window.history.replaceState(null, null, `#${id}`);
        goToTopBtn.classList.add("show");
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
    "desc": "Microsoft meluncurkan Windows 95 dengan antarmuka pengguna grafis (GUI) yang revolusioner, membuat pengoperasian komputer lebih mudah bagi pengguna umum. Fitur-fitur baru seperti Start Menu dan taskbar memperkenalkan standar baru dalam navigasi antarmuka, memungkinkan pengguna untuk mengakses aplikasi dan pengaturan dengan cepat. Peluncuran Windows 95 merupakan tonggak besar dalam sejarah komputasi, mendorong peningkatan produktivitas dan popularitas komputer di rumah dan kantor."
  },
  {
    "title": "Internet Explorer (1995)",
    "desc": "Internet Explorer, browser web yang dikembangkan oleh Microsoft, menjadi salah satu alat utama yang memperkenalkan internet kepada publik luas. Dengan Internet Explorer, pengguna dapat mengakses berbagai situs web dengan lebih mudah, menjadikannya alat penting dalam penyebaran dan popularitas web. Internet Explorer juga berperan dalam 'perang browser' dan mendorong perkembangan teknologi web selama beberapa dekade, membentuk standar internet yang kita kenal hari ini."
  },
  {
    "title": "iPod (2001)",
    "desc": "Pada tahun 2001, Apple meluncurkan iPod, perangkat pemutar musik digital yang sangat inovatif, yang memungkinkan pengguna membawa ribuan lagu dalam genggaman mereka. Dengan desain yang simpel dan elegan serta integrasi dengan iTunes, iPod merevolusi cara orang menikmati musik, menghilangkan ketergantungan pada CD dan kaset. iPod juga membuka jalan bagi kebangkitan industri musik digital dan menciptakan dasar bagi produk-produk ikonik Apple lainnya seperti iPhone."
  },
  {
    "title": "BlackBerry Curve 8520 (2003)",
    "desc": "BlackBerry Curve 8520, salah satu ponsel pintar pertama yang dirancang untuk keperluan bisnis, menawarkan fitur pengelolaan email, jadwal, dan kontak yang sangat membantu profesional dalam menjaga produktivitas mereka. Dengan keyboard fisik yang nyaman dan koneksi data, BlackBerry menjadi simbol efisiensi dan kinerja bisnis pada masa itu. Ponsel ini juga membangun reputasi BlackBerry sebagai pilihan utama bagi pengguna bisnis sebelum munculnya ponsel pintar berbasis layar sentuh."
  },
  {
    "title": "YouTube (2005)",
    "desc": "YouTube diluncurkan pada tahun 2005 sebagai platform berbagi video yang memungkinkan siapa saja mengunggah, menonton, dan berbagi video secara gratis. Dengan cepat, YouTube mengubah cara orang mengonsumsi media, menjadi alternatif bagi televisi tradisional dan platform penting bagi para kreator konten. YouTube memungkinkan orang-orang dari berbagai latar belakang untuk membuat konten dan membangun audiens global, yang akhirnya membuka peluang ekonomi baru melalui iklan dan monetisasi konten."
  },
  {
    "title": "iPhone (2007)",
    "desc": "Pada tahun 2007, Apple merilis iPhone, perangkat yang menggabungkan ponsel, pemutar musik, dan internet dalam satu paket dengan layar sentuh yang inovatif. iPhone mendefinisikan ulang apa yang dimaksud dengan smartphone dan memperkenalkan App Store, yang menciptakan pasar baru bagi aplikasi mobile. Dengan iPhone, Apple menciptakan ekosistem perangkat dan aplikasi yang memungkinkan berbagai inovasi dan mengubah cara orang berinteraksi dengan teknologi dalam kehidupan sehari-hari."
  },
  {
    "title": "Android (2008)",
    "desc": "Android, sistem operasi open-source yang dikembangkan oleh Google, diluncurkan pada tahun 2008 sebagai alternatif untuk iOS Apple. Android menawarkan fleksibilitas yang memungkinkan berbagai produsen perangkat untuk mengadopsi dan menyesuaikan sistem operasi ini. Dengan Android, smartphone menjadi lebih terjangkau dan dapat diakses oleh berbagai lapisan masyarakat, sehingga mendemokratisasi teknologi mobile di seluruh dunia. Ekosistem Android kini mencakup jutaan aplikasi dan miliaran pengguna global."
  },
  {
    "title": "Virtual Reality (VR) dan Augmented Reality (AR) (2010-an)",
    "desc": "VR dan AR adalah teknologi yang mengubah cara kita berinteraksi dengan dunia digital. Virtual Reality, seperti Oculus Rift, menciptakan pengalaman digital yang imersif dengan lingkungan buatan yang bisa dilihat dan diinteraksi secara penuh. Sementara itu, Augmented Reality, seperti yang ditawarkan oleh Microsoft HoloLens, menambahkan elemen digital ke dunia nyata, memungkinkan aplikasi dalam berbagai bidang seperti pendidikan, pelatihan, dan hiburan. Teknologi VR dan AR kini diterapkan dalam industri game, desain, dan bahkan kedokteran."
  },
  {
    "title": "Blockchain dan Cryptocurrency (2009-sekarang)",
    "desc": "Blockchain, teknologi di balik cryptocurrency seperti Bitcoin, memperkenalkan konsep buku besar terdistribusi yang aman dan transparan untuk mencatat transaksi digital. Dengan adanya blockchain, transaksi dapat dilakukan tanpa perantara seperti bank, memberikan alternatif yang aman dan efisien dalam berbagai industri. Teknologi ini juga memungkinkan pengembangan aplikasi desentralisasi (dApps) dan inovasi lain di sektor keuangan, logistik, dan keamanan data."
  },
  {
    "title": "Kecerdasan Buatan (1956-sekarang)",
    "desc": "Kecerdasan Buatan (AI) adalah bidang yang berkembang sejak 1956, merujuk pada kemampuan mesin untuk belajar, memahami, dan mengambil keputusan yang menyerupai kecerdasan manusia. AI mencakup berbagai pendekatan seperti pembelajaran mesin dan pembelajaran mendalam, yang memungkinkan komputer untuk memproses data dalam jumlah besar dan mendeteksi pola yang kompleks. AI kini digunakan di berbagai bidang, mulai dari rekomendasi produk di platform online hingga diagnosa medis dan otomatisasi industri."
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

// === Prevent placeholders showing on inputs when it has value ===

const formInputs = document.querySelectorAll(".inputBox");
formInputs.forEach(input => {
  input.addEventListener("input", () => {
    if(input.value !== "") {
      input.classList.add("has-value");
    } else {
      input.classList.remove("has-value");
    }
  });
});

// === Contact Section Mechanism ===
document.addEventListener("DOMContentLoaded", function() {
  // Initialize EmailJS
  emailjs.init({
    publicKey: "DGDH0E9RjYln9Km3s"
  });

  // Form submit event listener
  const contactForm = document.querySelector(".contact-form");

  // Listen for submit
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let from_name = document.querySelector("[name='from_name']").value
        from_email = document.querySelector("[name='from_email']").value
        title = document.querySelector("[name='title']").value
        message = document.querySelector("[name='message']").value;

    emailjs.sendForm('nizam_service', 'contact_form', this, {
      from_name,
      from_email,
      title,
      message
    })
      .then(() => {
        alertBoxValue.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Pesan berhasil dikirim! Silakan tunggu maksimal 24 jam untuk balasan berikutnya.';
        alertBox.style.backgroundColor = "rgb(0, 128, 0)";
        alertBox.classList.add("show");
      }, (error) => {
        alertBoxValue.innerHTML = `<i class="bi bi-x-circle-fill me-2"></i> ${error.text}`;
        console.log(error);
        alertBox.style.backgroundColor = "rgb(212, 2, 2)";
        alertBox.classList.add("show");
      });
    setTimeout(() => {
      alertBox.classList.add("hide");
    }, 5000);
    alertBox.classList.remove("show");
    alertBox.classList.remove("hide");
  });
});