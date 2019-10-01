import { contentEl, navigationEl } from "./config";

export function setBackButton(label, handler) {
  navigationEl.innerHTML = "";
  const backButton = document.createElement("a");
  backButton.className = "back-button";
  backButton.textContent = label;
  backButton.addEventListener("click", handler);

  navigationEl.appendChild(backButton);
}

export function showLoading() {
  // TODO: show loading
  // contentEl.innerHTML = `Loading...`;
}
