import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character/");

    const data = await response.json();
    console.log(data.results);
    data.results.forEach((element) => {
      const li = createCharacterCard(element);
      cardContainer.append(li);
      cardContainer.innerHTML = "";
    });
  } catch {
    console.error("Something went wrong");
  }
}
//cardContainer.append(fetchCharacters());
fetchCharacters();
