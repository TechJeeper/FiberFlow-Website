(function () {
  "use strict";

  /**
   * Set your Google Play Store URL here when the app is published.
   * Example: "https://play.google.com/store/apps/details?id=com.fiberflow.app"
   */
  var PLAY_STORE_URL = "";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var playLink = document.getElementById("play-store-link");
  var playNote = document.getElementById("play-store-note");

  if (playLink && PLAY_STORE_URL) {
    playLink.href = PLAY_STORE_URL;
    playLink.removeAttribute("aria-disabled");
    playLink.classList.remove("play-badge--placeholder");
    playLink.removeAttribute("title");
    playLink.setAttribute("target", "_blank");
    playLink.setAttribute("rel", "noopener noreferrer");

    if (playNote) {
      playNote.textContent = "Available now on Google Play.";
      playNote.classList.add("is-live");
    }
  }

  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      siteNav.classList.toggle("is-open", !expanded);
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        siteNav.classList.remove("is-open");
      });
    });
  }

  var header = document.querySelector(".site-header");
  var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  if (header && navLinks.length) {
    var sections = Array.from(navLinks)
      .map(function (link) {
        var id = link.getAttribute("href").slice(1);
        return document.getElementById(id);
      })
      .filter(Boolean);

    function updateActiveNav() {
      var scrollY = window.scrollY + header.offsetHeight + 24;
      var current = sections[0];

      sections.forEach(function (section) {
        if (section.offsetTop <= scrollY) {
          current = section;
        }
      });

      navLinks.forEach(function (link) {
        var active = current && link.getAttribute("href") === "#" + current.id;
        link.style.color = active ? "var(--text-primary)" : "";
      });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();
  }
})();
