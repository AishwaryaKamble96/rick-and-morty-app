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
let page = 1;
let searchQuery = "";

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
    );

    const data = await response.json();

    cardContainer.innerHTML = "";
    data.results.forEach((element) => {
      const li = createCharacterCard(element);
      cardContainer.append(li);
    });
  } catch {
    console.error("Something went wrong");
  }
}

//Search bar event Listner
searchBar.addEventListener("submit", (e) => {
  e.preventDefault();

  searchQuery = searchBar.query.value;
  fetchCharacters();
  searchBar.query.value = "";
});

fetchCharacters();
