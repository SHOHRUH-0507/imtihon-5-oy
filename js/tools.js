import {
    elCardsContainer,
    elCardTemplate,
    elSkeleton,
    elFilterSelect,
} from "./html-elements.js";

    // loader 
export function loader(bool) {
  elCardsContainer.innerHTML = null;

  if (bool) {
    for (let i = 1; i <= 24; i++) {
      const elSkeletonClone = elSkeleton.content.cloneNode(true);
      elCardsContainer.appendChild(elSkeletonClone);
    }
  }
}

export function ui(data) {
  loader(false);

  data.forEach((country) => {
    const elCountries = elCardTemplate.content.cloneNode(true);

     const elName = elCountries.querySelector("#countryName");
    const elFlag = elCountries.querySelector("#flag");
    const elPopulation = elCountries.querySelector("#population");
    const elRegion = elCountries.querySelector("#region");
    const elCapital = elCountries.querySelector("#capital");

    elFlag.src = country.flags.png;
    elName.textContent = country.name.common;
    elPopulation.textContent = `Population: ${country.population.toLocaleString()}`;
    elRegion.textContent = `Region: ${country.region}`;
    elCapital.textContent = `Capital: ${country.capital?.[0] || "No capital"}`;
    elCardsContainer.appendChild(elCountries);
  });
}

const elInfo = document.getElementById("infoTemplate");
const elDetailsPage = document.getElementById("details-page");

export function showDetailsByName(countryName) {
  elDetailsPage.innerHTML = "";
  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
      const clone = elInfo.content.cloneNode(true);

      const flag = clone.getElementById("infoFlag");
      const name = clone.getElementById("infoCountry");
      const domain = clone.getElementById("infoDomain");
      const population = clone.getElementById("infoPopulation");
      const currency = clone.getElementById("infoCurrencies");
      const lang = clone.getElementById("infoLang");
      const region = clone.getElementById("infoRegion");
      const subregion = clone.getElementById("InfoSubRegion");
      const native = clone.getElementById("infoNative");
      const capital = clone.getElementById("infoCapital");


      flag.src = country.flags.png;
      name.textContent = country.name.common;
      native.textContent = Object.values(country.name.nativeName)[0].common;
      population.textContent = country.population.toLocaleString();
      region.textContent = country.region;
      subregion.textContent = country.subregion;
      capital.textContent = country.capital ? country.capital[0] : "No capital";
      domain.textContent = country.tld[0];
      currency.textContent = Object.values(country.currencies)
        .map((x) => x.name)
        .join(",");
      lang.textContent = Object.values(country.languages).join(", ");

    //   border

      const elBorderButtons = clone.getElementById("border-buttons");

      const borders = country.borders;

      if (borders?.length) {
        elBorderButtons.innerHTML = borders.join(",");
      } else {
        elBorderButtons.innerHTML = `<span class="text-sm">No border countries</span>`;
      }

      clone.getElementById("backBtn").addEventListener("click", () => {
        elCardsContainer.classList.remove("hidden");
        elDetailsPage.classList.add("hidden");
        elFilterSelect.classList.remove("hidden");
      });

      elDetailsPage.classList.remove("hidden");
      elCardsContainer.classList.add("hidden");
      elFilterSelect.classList.add("hidden");
      elDetailsPage.appendChild(clone);
    });
}