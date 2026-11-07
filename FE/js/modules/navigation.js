/** @format */

export function showScreen(screenId) {
  const screens = document.querySelectorAll("main > section");

  screens.forEach((screen) => {
    screen.classList.add("hidden");
    screen.classList.remove("flex");
  });

  const activeScreen = document.getElementById(screenId);

  if (!activeScreen) {
    console.error(`Screen "${screenId}" not found.`);
    return;
  }

  activeScreen.classList.remove("hidden");
  activeScreen.classList.add("flex");

  document.dispatchEvent(
    new CustomEvent("screenchange", {
      detail: screenId,
    }),
  );
}
