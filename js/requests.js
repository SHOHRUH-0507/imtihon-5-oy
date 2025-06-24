import { loader, showDetailsByName, ui } from "./tools.js";
import { elCardsContainer, elFilterSelect } from "./html-elements.js";

export function countries() {
  loader(true);
  fetch(
    `https://restcountries.com/v3.1/all?fields=name,flags,borders,population,region,capital`
  )
    .then((res) => res.json())
    .then((countries) => {
      ui(countries);
    });
}

export function info() {
  elCardsContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const name = card.querySelector("#countryName").textContent;
    showDetailsByName(name)
  });
}



elFilterSelect.addEventListener("change", (e) => {
  const region = e.target.value;
  loader(true);
  fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then((res) => res.json())
    .then((data) => {
      ui(data);
    })
});
