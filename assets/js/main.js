/* Skin Solutions MD Clinic — navigation, year, WhatsApp appointment form.
   No third-party code, no tracking, no animation loops. */
(function () {
  "use strict";

  var WA_NUMBER = "923278749613";
  var WA_BASE = "https://wa.me/" + WA_NUMBER;

  /* ---- Year ------------------------------------------------------------ */
  var year = new Date().getFullYear();
  var yearNodes = document.querySelectorAll("[data-year]");
  for (var i = 0; i < yearNodes.length; i++) {
    yearNodes[i].textContent = String(year);
  }

  /* ---- Menu drawer ----------------------------------------------------- */
  var toggle = document.querySelector(".menu-btn");
  var drawer = document.getElementById("drawer");
  var header = document.querySelector(".site-header");
  var body = document.body;

  // The header sits below the top bar until the page scrolls, so the drawer is
  // placed against the header's current bottom edge rather than a fixed offset.
  function placeDrawer() {
    if (!header || !drawer) return;
    drawer.style.top = Math.round(header.getBoundingClientRect().bottom) + "px";
  }

  function setMenu(open) {
    if (!toggle || !drawer) return;
    if (open) placeDrawer();
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    body.classList.toggle("no-scroll", open);

    if (open) {
      var first = drawer.querySelector("a");
      if (first) first.focus({ preventScroll: true });
    } else if (drawer.contains(document.activeElement)) {
      toggle.focus({ preventScroll: true });
    }
  }

  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });

    drawer.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    if (typeof window.matchMedia === "function") {
      var wide = window.matchMedia("(min-width: 941px)");
      var onWide = function (event) {
        if (event.matches) setMenu(false);
      };
      if (wide.addEventListener) wide.addEventListener("change", onWide);
      else if (wide.addListener) wide.addListener(onWide);
    }

    window.addEventListener("resize", function () {
      if (toggle.getAttribute("aria-expanded") === "true") placeDrawer();
    });
  }

  /* ---- Appointment form -> WhatsApp ------------------------------------ */
  var forms = document.querySelectorAll("[data-booking-form]");

  for (var f = 0; f < forms.length; f++) {
    (function (form) {
      var feedback = form.querySelector("[data-form-feedback]");

      function say(message, isError) {
        if (!feedback) return;
        feedback.textContent = message;
        feedback.classList.toggle("is-error", !!isError);
      }

      form.addEventListener("submit", function (event) {
        event.preventDefault();

        var name = form.querySelector("#name");
        var phone = form.querySelector("#phone");
        var treatment = form.querySelector("#treatment");
        var time = form.querySelector("#time");
        var notes = form.querySelector("#notes");

        var nameValue = name ? name.value.trim() : "";
        var phoneValue = phone ? phone.value.trim() : "";

        if (!nameValue || nameValue.replace(/\s+/g, "").length < 2) {
          say("Please add your name so the clinic knows who is writing.", true);
          if (name) name.focus();
          return;
        }
        if (phoneValue.replace(/\D/g, "").length < 7) {
          say("Please add a phone number the clinic can reply to.", true);
          if (phone) phone.focus();
          return;
        }

        var lines = [
          "Appointment request \u2014 Skin Solutions MD Clinic",
          "",
          "Name: " + nameValue,
          "Phone: " + phoneValue,
          "Treatment: " + (treatment && treatment.value ? treatment.value : "Not sure yet"),
          "Preferred time: " + (time && time.value ? time.value : "No preference")
        ];

        var notesValue = notes ? notes.value.trim() : "";
        if (notesValue) lines.push("Notes: " + notesValue);

        var url = WA_BASE + "?text=" + encodeURIComponent(lines.join("\n"));
        var win = window.open(url, "_blank", "noopener");

        if (win) {
          say("WhatsApp has opened in a new tab. Send the message to request the appointment.");
        } else {
          say("Your browser blocked the new tab. Open WhatsApp directly to send the request.", true);
          if (feedback) {
            var link = document.createElement("a");
            link.href = url;
            link.target = "_blank";
            link.rel = "noopener";
            link.textContent = " Open WhatsApp";
            feedback.appendChild(link);
          }
        }
      });

      form.addEventListener("input", function () {
        if (feedback && feedback.classList.contains("is-error")) say("", false);
      });
    })(forms[f]);
  }
})();
