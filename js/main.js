/* ==========================================================================
   KRISHNA VILLA — shared site scripts
   Mobile menu · scroll reveal · lightbox · FAQ · contact form
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      toggle.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.querySelector(".lightbox");
  var lbImg = lightbox ? lightbox.querySelector("img") : null;
  var lbCap = lightbox ? lightbox.querySelector(".lb-caption") : null;
  var items = [];
  var current = 0;

  // Opens the viewer on `el`, navigating only the visible photos that share its
  // data-lb group (e.g. one room's photos). Items without data-lb form one set.
  function openLightbox(el) {
    if (!lightbox) return;
    var group = el.getAttribute("data-lb");
    items = Array.prototype.slice.call(document.querySelectorAll(".g-item[data-full]")).filter(function (it) {
      return it.getAttribute("data-lb") === group && it.offsetParent !== null;
    });
    current = Math.max(0, items.indexOf(el));
    updateLightbox();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  function updateLightbox() {
    var el = items[current];
    var src = el.getAttribute("data-full") || el.getAttribute("src");
    var cap = el.getAttribute("data-cap") || "";
    lbImg.setAttribute("src", src);
    lbCap.textContent = cap;
  }

  if (lightbox) {
    var closeBtn = lightbox.querySelector(".lb-close");
    var prevBtn = lightbox.querySelector(".lb-prev");
    var nextBtn = lightbox.querySelector(".lb-next");

    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", function () {
      current = (current - 1 + items.length) % items.length;
      updateLightbox();
    });
    nextBtn.addEventListener("click", function () {
      current = (current + 1) % items.length;
      updateLightbox();
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") { current = (current - 1 + items.length) % items.length; updateLightbox(); }
      if (e.key === "ArrowRight") { current = (current + 1) % items.length; updateLightbox(); }
    });
  }

  document.querySelectorAll(".g-item[data-full]").forEach(function (el) {
    el.addEventListener("click", function () { openLightbox(el); });
  });

  /* ---------- Gallery filters (#standard, #deluxe, #villa deep links) ---------- */
  var filterBtns = document.querySelectorAll(".gallery-filters [data-filter]");
  function applyFilter(name) {
    var valid = false;
    filterBtns.forEach(function (b) {
      var on = b.getAttribute("data-filter") === name;
      if (on) valid = true;
      b.classList.toggle("active", on);
    });
    if (!valid) name = "all";
    document.querySelectorAll(".gallery-grid .g-item").forEach(function (el) {
      el.style.display = (name === "all" || el.getAttribute("data-group") === name) ? "" : "none";
    });
    if (!valid) filterBtns.forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-filter") === "all"); });
  }
  if (filterBtns.length) {
    filterBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.getAttribute("data-filter");
        applyFilter(f);
        if (history.replaceState) history.replaceState(null, "", f === "all" ? location.pathname : "#" + f);
      });
    });
    applyFilter(location.hash.replace("#", "") || "all");
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.parentElement;
      var answer = item.querySelector(".faq-a");
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (open) {
        open.classList.remove("open");
        var a = open.querySelector(".faq-a");
        if (a) a.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* ---------- Prefill room select from URL (?room=...) ---------- */
  (function () {
    var params = new URLSearchParams(window.location.search);
    var room = params.get("room");
    var select = document.getElementById("room");
    if (room && select) {
      var matched = false;
      select.querySelectorAll("option").forEach(function (opt) {
        if (opt.value === room) { opt.selected = true; matched = true; }
      });
      if (!matched) {
        var newOpt = document.createElement("option");
        newOpt.value = room;
        newOpt.textContent = room;
        newOpt.selected = true;
        select.appendChild(newOpt);
      }
    }
  })();

  /* ---------- Contact form (WhatsApp + mailto fallback) ---------- */
  var form = document.getElementById("bookForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var lines = [];
      var labels = {
        name: "Name", phone: "Phone", email: "Email",
        checkin: "Check-in", checkout: "Check-out",
        room: "Room preference", guests: "Guests", message: "Message"
      };
      Object.keys(labels).forEach(function (key) {
        var val = (data.get(key) || "").trim();
        if (val) lines.push(labels[key] + ": " + val);
      });
      var text = encodeURIComponent("New booking enquiry — Krishna Villa%0A" + lines.join("%0A"));
      var phone = form.getAttribute("data-whatsapp") || "918890952523";
      window.open("https://wa.me/" + phone + "?text=" + text, "_blank");
      var success = document.querySelector(".form-success");
      if (success) success.style.display = "block";
      form.reset();
    });
  }

  /* ---------- Sticky topbar awareness (scroll-shadow on header) ---------- */
  var header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.style.boxShadow = window.scrollY > 10 ? "0 6px 20px rgba(67,16,26,0.10)" : "none";
    });
  }

  /* ---------- Year in footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
