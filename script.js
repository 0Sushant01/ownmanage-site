/**
 * OWNMANAGE Landing Page — JavaScript Engine
 * Domain: ownmanage.in
 * Focus: Lightweight, Modular, Fast, Accessible
 */

// ==========================================================================
// 1. Central Configuration
// ==========================================================================
const CONFIG = {
  /**
   * Target Launch Date.
   * Format: ISO 8601 string, e.g. "2026-12-01T00:00:00" or null.
   * If null, countdown is gracefully hidden.
   */
  launchDate: null,

  /**
   * Primary Contact & Early Access Email Address.
   * Configured here in one single place.
   */
  contactEmail: "contact@ownmanage.in",

  /**
   * Platform brand name
   */
  brandName: "OWNMANAGE",
  brandDomain: "ownmanage.in"
};

// ==========================================================================
// 2. Application Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initEmailBindings();
  initFooterYear();
  initHeaderScroll();
  initMobileNav();
  initSmoothScroll();
  initCountdown();
  initScrollReveal();
  initModals();
});

// ==========================================================================
// 3. Email & Config Bindings
// ==========================================================================
function initEmailBindings() {
  const mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');
  mailtoLinks.forEach(link => {
    // Preserve custom subjects if specified
    const url = new URL(link.href);
    const searchParams = url.search;
    link.href = `mailto:${CONFIG.contactEmail}${searchParams ? searchParams : ""}`;
  });

  const emailDisplayLinks = document.querySelectorAll(".contact-email-link, #modal-mailto-link");
  emailDisplayLinks.forEach(el => {
    el.textContent = CONFIG.contactEmail;
  });
}

// ==========================================================================
// 4. Dynamic Year in Footer
// ==========================================================================
function initFooterYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ==========================================================================
// 5. Header Scroll Effect
// ==========================================================================
function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

// ==========================================================================
// 6. Mobile Navigation Drawer
// ==========================================================================
function initMobileNav() {
  const toggleBtn = document.getElementById("mobile-toggle");
  const drawer = document.getElementById("mobile-drawer");
  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    toggleBtn.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
    drawer.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    toggleBtn.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    drawer.classList.remove("open");
    document.body.style.overflow = "";
  };

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close drawer when any mobile navigation link is clicked
  const mobileLinks = drawer.querySelectorAll("a, button");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });

  // Close on Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggleBtn.getAttribute("aria-expanded") === "true") {
      closeDrawer();
    }
  });
}

// ==========================================================================
// 7. Accessible Smooth Scrolling
// ==========================================================================
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        // Set focus for accessibility without breaking smooth scrolling
        targetEl.setAttribute("tabindex", "-1");
        targetEl.focus({ preventScroll: true });
      }
    });
  });
}

// ==========================================================================
// 8. Launch Countdown Timer (Graceful Handling)
// ==========================================================================
function initCountdown() {
  const countdownWrapper = document.getElementById("countdown-wrapper");
  if (!countdownWrapper) return;

  // If no launch date is configured, gracefully hide the countdown
  if (!CONFIG.launchDate) {
    countdownWrapper.style.display = "none";
    return;
  }

  const targetDate = new Date(CONFIG.launchDate).getTime();
  if (isNaN(targetDate)) {
    // Invalid date passed
    countdownWrapper.style.display = "none";
    return;
  }

  // Show countdown container
  countdownWrapper.style.display = "block";

  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const secondsEl = document.getElementById("cd-seconds");

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

// ==========================================================================
// 9. Scroll Reveal Animations (IntersectionObserver)
// ==========================================================================
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal-item");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    // Fallback: reveal all immediately if observer is unsupported
    items.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  items.forEach(el => observer.observe(el));
}

// ==========================================================================
// 10. Interactive Accessible Modals & Clipboard Utility
// ==========================================================================
function initModals() {
  const contactModal = document.getElementById("contact-modal");
  const legalModal = document.getElementById("legal-modal");
  const modalBadge = document.getElementById("modal-badge");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body-text");
  const btnOpenClient = document.getElementById("btn-open-email-client");
  const btnCopyEmail = document.getElementById("btn-copy-email");
  const copyText = document.getElementById("copy-text");

  // Helper to open modal
  function showModal(modal) {
    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }
    document.body.style.overflow = "hidden";
  }

  // Helper to close modal
  function closeModal(modal) {
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.removeAttribute("open");
    }
    document.body.style.overflow = "";
  }

  // Early access trigger buttons
  document.querySelectorAll('[data-action="open-early-access"]').forEach(btn => {
    btn.addEventListener("click", () => {
      if (!contactModal) return;
      if (modalBadge) modalBadge.textContent = "Early Access";
      if (modalTitle) modalTitle.textContent = "Request Early Access to OWNMANAGE";
      if (modalBody) {
        modalBody.textContent = `Be among the first businesses to experience OWNMANAGE. Drop us a note with your team size and business location at ${CONFIG.contactEmail}.`;
      }
      if (btnOpenClient) {
        btnOpenClient.href = `mailto:${CONFIG.contactEmail}?subject=Early%20Access%20Request%20-%20OWNMANAGE&body=Hello%20OWNMANAGE%20Team%2C%0A%0AI%20would%20like%20to%20request%20early%20access%20for%20my%20business.%0A%0ABusiness%20Name%3A%20%0ANumber%20of%20Employees%3A%20%0ALocation%2FCity%3A%20%0A%0AThank%20you!`;
      }
      showModal(contactModal);
    });
  });

  // Contact trigger buttons
  document.querySelectorAll('[data-action="open-contact"]').forEach(btn => {
    btn.addEventListener("click", () => {
      if (!contactModal) return;
      if (modalBadge) modalBadge.textContent = "Get In Touch";
      if (modalTitle) modalTitle.textContent = "Contact the OWNMANAGE Team";
      if (modalBody) {
        modalBody.textContent = `Have a question about workforce attendance, payroll rules, or multi-branch operations? We'd love to hear from you at ${CONFIG.contactEmail}.`;
      }
      if (btnOpenClient) {
        btnOpenClient.href = `mailto:${CONFIG.contactEmail}?subject=Inquiry%20-%20OWNMANAGE`;
      }
      showModal(contactModal);
    });
  });

  // Close buttons for contact modal
  if (contactModal) {
    contactModal.querySelectorAll("[data-close-modal]").forEach(el => {
      el.addEventListener("click", () => closeModal(contactModal));
    });

    contactModal.addEventListener("cancel", () => {
      document.body.style.overflow = "";
    });
  }

  // Clipboard copy email
  if (btnCopyEmail && copyText) {
    btnCopyEmail.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(CONFIG.contactEmail);
        btnCopyEmail.classList.add("copied");
        copyText.textContent = "Copied!";
        setTimeout(() => {
          btnCopyEmail.classList.remove("copied");
          copyText.textContent = "Copy";
        }, 2200);
      } catch (err) {
        // Fallback prompt if clipboard API is restricted
        window.prompt("Copy email address:", CONFIG.contactEmail);
      }
    });
  }

  // Legal Modal: Privacy Policy & Terms
  const legalBadge = document.getElementById("legal-badge");
  const legalTitle = document.getElementById("legal-modal-title");
  const legalContent = document.getElementById("legal-content");

  const privacyText = `
    <h4>1. Information Collection</h4>
    <p>OWNMANAGE is currently in preparation for launch. Any contact information you provide during early access requests (such as email addresses and organization names) will solely be used to contact you regarding beta access, onboarding updates, and platform release announcements.</p>
    <h4>2. Data Protection</h4>
    <p>We respect your privacy and uphold strict data security practices. We never sell, rent, or trade your personal or business data to third parties.</p>
    <h4>3. Contact</h4>
    <p>For questions regarding our privacy practices or data governance, please contact us at ${CONFIG.contactEmail}.</p>
  `;

  const termsText = `
    <h4>1. Service Overview</h4>
    <p>OWNMANAGE (ownmanage.in) provides smart workforce attendance, shift tracking, and payroll calculation tools designed for small and growing business enterprises.</p>
    <h4>2. Early Access Program</h4>
    <p>Early access invitations and feature previews are provided on an informational basis prior to our general commercial release. Features and service parameters are subject to enhancements based on feedback.</p>
    <h4>3. Inquiries</h4>
    <p>Direct inquiries regarding business onboarding and commercial terms can be directed to ${CONFIG.contactEmail}.</p>
  `;

  document.querySelectorAll('[data-action="open-privacy"]').forEach(btn => {
    btn.addEventListener("click", () => {
      if (!legalModal) return;
      if (legalBadge) legalBadge.textContent = "Privacy Policy";
      if (legalTitle) legalTitle.textContent = "Privacy Policy — OWNMANAGE";
      if (legalContent) legalContent.innerHTML = privacyText;
      showModal(legalModal);
    });
  });

  document.querySelectorAll('[data-action="open-terms"]').forEach(btn => {
    btn.addEventListener("click", () => {
      if (!legalModal) return;
      if (legalBadge) legalBadge.textContent = "Terms of Service";
      if (legalTitle) legalTitle.textContent = "Terms of Service — OWNMANAGE";
      if (legalContent) legalContent.innerHTML = termsText;
      showModal(legalModal);
    });
  });

  if (legalModal) {
    legalModal.querySelectorAll("[data-close-legal-modal]").forEach(el => {
      el.addEventListener("click", () => closeModal(legalModal));
    });

    legalModal.addEventListener("cancel", () => {
      document.body.style.overflow = "";
    });
  }
}
