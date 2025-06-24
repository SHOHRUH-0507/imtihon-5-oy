import { countries, info } from "./requests.js";


const htmlTag = document.documentElement;
const themeBtn = document.getElementById("darkMode");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  htmlTag.setAttribute("data-theme", savedTheme);
}

themeBtn.addEventListener("click", () => {
  const Theme = htmlTag.getAttribute("data-theme");
  const newTheme = Theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  htmlTag.setAttribute("data-theme", newTheme);
  
});
countries()
info()