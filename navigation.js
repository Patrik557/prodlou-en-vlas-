const menuButton = document.querySelector(".menu-toggle");
const menu = document.getElementById("main-navigation");
const backdrop = document.querySelector(".nav-backdrop");
const menuLinks = Array.from(menu.querySelectorAll("a[href]"));

function setMenuOpen(isOpen, restoreFocus = true) {
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Zavřít navigaci" : "Otevřít navigaci");
  backdrop.hidden = !isOpen;

  if (isOpen) {
    menuLinks[0].focus();
  } else if (restoreFocus) {
    menuButton.focus();
  }
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

menu.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest("a[href]")) {
    setMenuOpen(false);
  }
});

backdrop.addEventListener("click", () => setMenuOpen(false));

document.addEventListener("keydown", (event) => {
  if (menuButton.getAttribute("aria-expanded") !== "true") {
    return;
  }

  if (event.key === "Escape") {
    setMenuOpen(false);
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const firstFocusable = menuButton;
  const lastFocusable = menuLinks[menuLinks.length - 1];

  if (event.shiftKey && document.activeElement === firstFocusable) {
    event.preventDefault();
    lastFocusable.focus();
  } else if (!event.shiftKey && document.activeElement === lastFocusable) {
    event.preventDefault();
    firstFocusable.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 1051px)").matches && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false, false);
    menuLinks[0].focus();
  }
});
