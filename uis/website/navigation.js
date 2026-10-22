const navigationToggle = document.getElementById("navigation-toggle");
const primaryNavigation = document.getElementById("primary-navigation");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");
const desktopViewport = window.matchMedia("(min-width: 768px)");

function setNavigationOpen(open, restoreFocus = false) {
  const expanded = open && !desktopViewport.matches;
  primaryNavigation.hidden = !desktopViewport.matches && !expanded;
  navigationToggle.setAttribute("aria-expanded", String(expanded));
  const label = expanded ? "Cerrar menú de navegación" : "Abrir menú de navegación";
  navigationToggle.setAttribute("aria-label", label);
  navigationToggle.title = label;
  menuIcon.hidden = expanded;
  closeIcon.hidden = !expanded;
  if (restoreFocus) navigationToggle.focus();
}

function syncNavigationViewport() {
  const focusedElement = document.activeElement;
  navigationToggle.hidden = desktopViewport.matches;
  setNavigationOpen(false);
  if (!desktopViewport.matches && primaryNavigation.contains(focusedElement)) {
    navigationToggle.focus();
  } else if (desktopViewport.matches && focusedElement === navigationToggle) {
    primaryNavigation.querySelector("a").focus();
  }
}

navigationToggle.addEventListener("click", () => {
  setNavigationOpen(navigationToggle.getAttribute("aria-expanded") !== "true");
});

primaryNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setNavigationOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigationToggle.getAttribute("aria-expanded") === "true") {
    setNavigationOpen(false, true);
  }
});

document.addEventListener("click", (event) => {
  if (!primaryNavigation.contains(event.target) && !navigationToggle.contains(event.target)) {
    setNavigationOpen(false);
  }
});

desktopViewport.addEventListener("change", syncNavigationViewport);
syncNavigationViewport();